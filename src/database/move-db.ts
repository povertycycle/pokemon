import { cacheIsAllowed } from "@/common/components/home/cache/utils";
import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { BASE_API_URL_MOVES } from "@/common/constants/urls";
import { PokeAPIMachineData, PokeAPIMoveData } from "@/common/interfaces/_externals/move";
import { MoveData } from "@/common/interfaces/move";
import { errorCheck } from "@/common/utils/errorCheck";
import { trimUrl } from "@/common/utils/string";

type PokeAPIResponse = {
    count: number,
    next: string,
    previous: string,
    results: { name: string, url: string }[]
}

export async function updateMoveDatabase(moves: PokeAPIResponse): Promise<number> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const insertTx = request.result.transaction(Stores.Moves, 'readwrite');
            const insert = insertTx.objectStore(Stores.Moves);
            moves.results.forEach(move => {
                insert.put({ name: move.name }, trimUrl(move.url))
            })

            insertTx.oncomplete = () => {
                result(moves.count);
            }
        }
    })
}

export async function getMoveData(id: string): Promise<MoveData | null> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const db = request.result;
            const moveTx = db.transaction(Stores.Moves, 'readonly').objectStore(Stores.Moves).get(id);
            moveTx.onsuccess = () => {
                const fullData = moveTx.result;
                if (!!fullData?.data) {
                    resolve({ name: fullData.name, data: fullData.data });
                } else {
                    fetchMoveData(id).then(res => {
                        if (!res) {
                            reject("Unable to fetch data from API. Please contact developer");
                        } else {
                            if (cacheIsAllowed()) {
                                const insertTx = db.transaction(Stores.Moves, 'readwrite').objectStore(Stores.Moves).put(res, id);
                                insertTx.onsuccess = () => {
                                    resolve(res);
                                };
                            } else {
                                resolve(res);
                            }
                        }
                    }).catch(err => {
                        reject(String(err));
                    })
                }
            }

            moveTx.onerror = () => {
                resolve(null);
            }
        }
    })
}

async function fetchMoveData(id: string): Promise<MoveData | null> {
    let dat: MoveData;
    return fetch(`${BASE_API_URL_MOVES}/${id}`)
        .then(res => errorCheck(res))
        .then((res: PokeAPIMoveData) => {
            dat = {
                name: res.name,
                data: {
                    accuracy: res.accuracy,
                    pp: res.pp,
                    power: res.power,
                    category: res.damage_class.name,
                    type: res.type.name,
                    machines: {},
                }
            }
            return Promise.all(res.machines.map(machine => fetch(machine.machine.url).then(res => errorCheck(res))));
        })
        .then((res: PokeAPIMachineData[]) => {
            res.forEach(machine => {
                dat.data.machines[machine.version_group.name] = machine.item.name;
            })
            return dat;
        })
        .catch(err => {
            return null;
        })
}


export async function getMoveName(id: string): Promise<string | null> {
    return new Promise(resolve => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const moveTx = request.result.transaction(Stores.Moves, 'readonly').objectStore(Stores.Moves).get(id);
            moveTx.onsuccess = () => {
                const data = moveTx.result as MoveData;
                resolve(data.name);
            }
            moveTx.onerror = () => {
                resolve(null);
            }
        }
    })
}

