import { trimUrl } from "@/common/utils/trimUrl";
import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_MACHINES, BASE_API_URL_MOVES } from "../constants";
import { MoveData } from "../contents/pokemon/interfaces/moves";
import { POKEMON_DB, Stores } from "./db";

function fetchMoveData(id: string): Promise<{ name: string, data: MoveData | null }> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_MOVES}/${id}`).then(res => {
            if (!res.ok) throw new Error("Failed to fetch data from API");
    
            return res.json();
        }).then(res => {
            let eE = res.effect_entries.find((e: any) => e.language.name === "en");            
            let moveName = res.name;
            let moveData = {
                ...(res.accuracy && { accuracy: res.accuracy }),
                ...(res.effect_chance && { effect_chance: res.effect_chance }),
                pp: res.pp,
                priority: res.priority,
                ...(res.power && { power: res.power }), 
                damage_class: res?.damage_class.name,
                ...(eE && { effect: eE?.effect, short_effect: eE?.short_effect }),
                flavor_text_entries: res.flavor_text_entries?.reduce((acc: any, fTE: any) => {
                    if (fTE.language.name === "en") {
                        acc.push({
                            flavor_text: fTE.flavor_text,
                            version: fTE.version_group.name
                        })
                    }
                    return acc;
                }, []),
                ...(res.meta && {
                    meta: Object.entries(res.meta).reduce((acc: any, [tag, value]: any) => {
                        if (typeof value === "object") {
                            if (value?.name) {
                                acc[tag] = value.name
                            }
                        } else {
                            if (value) {
                                acc[tag] = value
                            }
                        }

                        return acc;
                    }, {})
                }),
                target: res?.target.name,
                type: res?.type.name
            }
            
            Promise.all(res?.machines?.map((m: any) => fetch(m.machine.url).then(res => { if (res.ok) return res.json(); else throw new Error("Failed to get TM data.") }))).then(res => {
                moveData.machines = res?.map(moveResponse => ({
                    id: moveResponse?.id,
                    item: { name: moveResponse?.item?.name, id: trimUrl(moveResponse?.item?.url) },
                    version: moveResponse?.version_group?.name
                }))
                result({ name: moveName, data: moveData });
            }).catch(err => {
                throw new Error(err);
            })
        }).catch(err => {
            result({ name: "", data: null });
        })
    })
}

export function getMoveData(id: string): Promise<{ name: string, data: MoveData | null }> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const moveTx = db.transaction(Stores.Moves, 'readonly');

            if (cacheIsAllowed()) {
                const moveData = moveTx.objectStore(Stores.Moves).get(id);
                
                moveData.onsuccess = () => {
                    if (moveData.result?.data) {
                        result({ name: moveData.result.name ,data: moveData.result?.data });
                    } else {
                        fetchMoveData(id).then(res => {
                            db.transaction(Stores.Moves, 'readwrite').objectStore(Stores.Moves).put({
                                ...moveData.result,
                                data: res.data
                            }, id);
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
