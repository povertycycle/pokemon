import { errorCheck } from "@/common/utils/errorCheck";
import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_MOVES } from "../../../constants/urls";
import { MoveData, PokeMove } from "../contents/pokemon/interfaces/moves";
import { trimUrl } from "@/common/utils/string";
import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";

function generateMoveData(data: any): Promise<any | null> {
    return new Promise(result => {
        let e = data.effect_entries.find((e: any) => e.language.name === "en")?.effect;
        let f = (data?.flavor_text_entries?.filter((fTE: any) => (fTE.language.name === "en"))?.at(-1)?.flavor_text ?? "- - -");
        let g = Object.keys((data?.flavor_text_entries?.reduce((acc: any, c: any) => { acc[c.version_group.name] = 0; return acc; }, {})));
        Promise.all((data?.machines?.map((m: any) => fetch(m.machine.url).then(res => errorCheck(res))))).then(res => (res.map(r => ({ machine: r.item.name, version: r.version_group.name })))).then(res => {
            result({
                id: String(data?.id ?? "-1"),
                name: data?.name ?? "-",
                data: {
                    ...(data.accuracy && { accuracy: data.accuracy }),
                    ...(e && { effect: e }),
                    ...(data.power && { power: data.power }),
                    ...((res && res.length > 0) && { machines: res }),
                    ...(g.length > 1 && { games: g }),
                    damage_class: data?.damage_class.name,
                    flavor_text: f,
                    type: data?.type.name,
                    target: data?.target.name,
                    pp: data.pp,
                    priority: data.priority,
                },
                pokemons: data.learned_by_pokemon.map((lbp: any) => (trimUrl(lbp.url))),
            })
        }).catch(err => { result(null) });
    })
}

function fetchMoveData(id: string): Promise<PokeMove | null> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_MOVES}/${id}`).then(res => {
            return errorCheck(res);
        }).then(res => {
            generateMoveData(res).then(res => {
                result(res);
            });
        }).catch(err => {
            result(null);
        })
    })
}

export function getMoveData(id: string): Promise<PokeMove | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const moveTx = db.transaction(Stores.Moves, 'readonly');

            if (cacheIsAllowed()) {
                const moveData = moveTx.objectStore(Stores.Moves).get(id);

                moveData.onsuccess = () => {
                    if (moveData.result?.data) {
                        result({ name: moveData.result.name, data: moveData.result.data, pokemons: Object.keys(moveData.result.pokemons) });
                    } else {
                        fetchMoveData(id).then(res => {
                            if (res) {
                                db.transaction(Stores.Moves, 'readwrite').objectStore(Stores.Moves).put({
                                    ...moveData.result,
                                    data: res.data
                                }, id);
                            }
                            result(res);
                        })
                    }
                }
            } else {
                fetchMoveData(id).then(res => {
                    result(res);
                });
            }
        }
    })
}

export function getMovesData(): Promise<(PokeMove | null)[]> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const moveTx = db.transaction(Stores.Moves, 'readonly');
            const keys = moveTx.objectStore(Stores.Moves).getAllKeys();

            function processData(data: any) {
                generateMoveData(data).then(res => {
                    if (res) {
                        const tx = db.transaction(Stores.Moves, 'readwrite');
                        let exDat = tx.objectStore(Stores.Moves).get(res.id);
                        exDat.onsuccess = () => {
                            const insert = tx.objectStore(Stores.Moves);
                            insert.put({
                                ...exDat.result,
                                data: res.data
                            }, String(data.id));
                        }
                    }
                });
            }

            keys.onsuccess = () => {
                let kList = keys.result;
                let existingData: PokeMove[] = [];
                Promise.all(kList.map(k => new Promise(mRes => {
                    let mData = moveTx.objectStore(Stores.Moves).get(k);
                    mData.onsuccess = () => {
                        if (!!!mData.result.data) {
                            mRes(`${BASE_API_URL_MOVES}/${k}`);
                        } else {
                            existingData.push({ name: mData.result.name, data: mData.result.data, pokemons: Object.keys(mData.result.pokemons) })
                            mRes(undefined);
                        }
                    }
                }))).then(res => {
                    let urls = (res as any[]).filter(Boolean);
                    if (urls.length === 0) {
                        result(existingData);
                    } else {
                        let acc: Promise<any | null>[] = [];
                        let processor = (data: any) => {
                            acc.push(generateMoveData(data));
                        }
                        if (cacheIsAllowed()) {
                            processor = processData;
                        }
                        // doBatchProcess(urls, processor).then(res => {
                        //     if (cacheIsAllowed()) {
                        //         let moves = db.transaction(Stores.Moves, 'readonly').objectStore(Stores.Moves).getAll();
                        //         moves.onsuccess = () => {
                        //             result(moves.result.map(r => ({ name: r.name, data: r.data, pokemons: Object.keys(r.pokemons) })))
                        //         }
                        //     } else {
                        //         Promise.all(acc).then(res => {
                        //             result(res)
                        //         })
                        //     }
                        // })
                    }
                });
            }
        }
    })
}

export function getMoveName(id: string): Promise<string | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const moveData = db.transaction(Stores.Moves, 'readonly').objectStore(Stores.Moves).get(id);

            moveData.onsuccess = () => {
                result(moveData.result.name);
            }
        }
    })
}
