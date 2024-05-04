import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_MOVES, BASE_API_URL_POKEMON } from "../constants";
import { LevelMethodVersion, MoveDetailsType, MoveData } from "../contents/pokemon/interface";
import { POKEMON_DB, Stores } from "./db";

function fetchMoveData(move: string): Promise<MoveData> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_MOVES}/${move}`).then(res => {
            if (!res.ok) throw new Error("Failed to fetch data from API");
    
            return res.json();
        }).then(res => {
            const eE = res.effect_entries.find((eE: any) => (eE?.language?.name === "en"));
            const fE = res.flavor_text_entries.reduce((acc: any, fte: any) => {
                if (fte.language.name === "en") {
                    acc.push({
                        flavor_text: fte.flavor_text,
                        version: fte.version_group.name
                    })
                }
                return acc;
            }, [])
            console.log(res.meta)
            const moveData = {
                accuracy: res.accuracy,
                damage_class: res.damage_class.name,
                effect_chance: res.effect_chance,
                effect_entries: eE ? {
                    effect: eE.effect,
                    short_effect: eE.short_effect,
                } : null,
                flavor_text_entries: fE,
                generation: res.generation.name,
                id: res.id,
                meta: res.meta ? {
                    ailment: res.meta.ailment.name,
                    ailment_chance: res.meta.ailment_chance,
                    category: res.meta.category.name,
                    crit_rate: res.meta.crit_rate,
                    drain: res.meta.drain,
                    flinch_chance: res.meta.flinch_chance,
                    healing: res.meta.healing,
                    max_hits: res.meta.max_hits,
                    max_turns: res.meta.max_turns,
                    min_hits: res.meta.min_hits,
                    min_turns: res.meta.min_turns,
                    stat_chance: res.meta.stat_chance
                } : null,
                power: res.power,
                pp: res.pp,
                priority: res.priority,
                target: res.target.name,
                type: res.type.name
            }
            result(moveData);
        })
    })
}

export async function processMoveDataByName(move: string): Promise<MoveData | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const moveTx = db.transaction(Stores.Moves, 'readonly');

            if (cacheIsAllowed()) {
                const moveData = moveTx.objectStore(Stores.Moves).get(move);
                
                moveData.onsuccess = () => {
                    if (moveData.result.data) {
                        result(moveData.result.data);
                    } else {
                        fetchMoveData(move).then(res => {
                            const insertTx = db.transaction(Stores.Moves, 'readwrite').objectStore(Stores.Moves).put({
                                ...moveData.result,
                                data: res
                            }, move);
                            result(res);
                        })
                    }
                }

            } else {
                fetchMoveData(move).then(res => {
                    result(res);
                });
            }

        //     const data = moveData.result.data;
        //     if (!data) {
                
        //     } else {
        //         res(data);
        //     }
        // }
        }
    })
}

function dataIncomplete(details: MoveDetailsType) {
    return Object.values(details).some(value => (value.length <= 0))
}

function fetchPokemonMoveDetails(pokemon: string): Promise<MoveDetailsType> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_POKEMON}/${pokemon}`).then(res => {
            if (!res.ok) throw new Error("Failed to fetch data from API");
    
            return res.json();
        }).then(res => {
            const moveDetails = res.moves.reduce((acc: MoveDetailsType, move: any) => {
                acc[move.move.name] = move.version_group_details.map((vgp: any) => ({
                    levelLearned: vgp.level_learned_at,
                    method: vgp.move_learn_method.name,
                    version: vgp.version_group.name
                }));
                return acc;
            }, {});
            result(moveDetails);
        })
    })    
}

export async function processMoveDetailsByPokemon(pokemon: string, moves: string[]): Promise<MoveDetailsType> {
    return new Promise (result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const moveTx = db.transaction(Stores.Moves, 'readonly');

            if (cacheIsAllowed()) {
                const moveDetails: MoveDetailsType = {}
                const store = moveTx.objectStore(Stores.Moves);
                moves.forEach(moveName => {
                    const s = store.get(moveName);
                    s.onsuccess = () => {
                        moveDetails[moveName] = s.result.pokemons[pokemon];
                    };
                })
                
                moveTx.oncomplete = () => {
                    if (!dataIncomplete(moveDetails)) {
                        result(moveDetails);
                    } else {
                        fetchPokemonMoveDetails(pokemon).then(res => {
                            const insertTx = db.transaction(Stores.Moves, 'readwrite');
                            const store = insertTx.objectStore(Stores.Moves);
                            Object.entries(res).forEach((entry: [string, LevelMethodVersion[]]) => {
                                const prev = store.get(entry[0]);
                                prev.onsuccess = () => {
                                    const result = prev.result;
                                    result.pokemons[pokemon] = entry[1];
                                    store.put(result, entry[0]);                                    
                                }
                            })

                            insertTx.oncomplete = () => {
                                result(res);
                            }
                        })
                    }
                }   
            } else {
                fetchPokemonMoveDetails(pokemon).then(res => {
                    result(res)
                });
            }
        }
    })
}
