import { STORE_KEYS, Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { BASE_API_URL_BERRIES, BASE_API_URL_ITEM, BASE_API_URL_MOVES, BASE_API_URL_POKEMON } from "@/common/constants/urls";
import { PokeAPIResponse } from "./_utils";
import { updateItemDatabase } from "./items-db";
import { updateMoveDatabase } from "./move-db";
import { updatePokemonDatabase } from "./pokemon-db";
import { updateBerryDatabase } from "./berries-db";

export const initDB = (): Promise<boolean> => {
    const version = 8;

    return new Promise(res => {
        const request = indexedDB.open(POKEMON_DB, version);

        request.onupgradeneeded = () => {
            const db = request.result;

            Object.values(Stores).forEach(key => {
                if (db.objectStoreNames.contains(key)) {
                    db.deleteObjectStore(key);
                }
            })

            Object.values(Stores).forEach(key => {
                db.createObjectStore(key);
            });
        }

        request.onsuccess = () => {
            res(true);
        }

        request.onerror = () => {
            res(false);
        }
    })
};

async function validateDatabase(url: string, updater: (res: PokeAPIResponse) => Promise<number>, store: Stores): Promise<string | null> {
    return fetch(url).then(res => {
        if (!res.ok) throw new Error("Error fetching data from API");
        return res.json();
    }).then(res => {
        if (res) {
            return fetch(`${url}?offset=0&limit=${res.count}`);
        } else {
            throw new Error("Failed to update local database");
        }
    }).then(res => {
        if (!res.ok) throw new Error("Error fetching data from API");
        return res.json();
    }).then(res => {
        return updater(res);
    }).then(res => {
        if (res <= 0) throw new Error("API data format error");
        return updateValidator(res, store);
    })
}

function validateStore(store: Stores, url: string, updater: (res: PokeAPIResponse) => Promise<number>): Promise<string | null> {
    return new Promise((res, rej) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const db: IDBDatabase = request.result;
            const valdiation = db.transaction(Stores.Validator, 'readonly').objectStore(Stores.Validator).get(STORE_KEYS[store]);

            valdiation.onsuccess = () => {
                const data = db.transaction(store, 'readonly').objectStore(store).getAllKeys();
                data.onsuccess = () => {
                    if (data.result.length !== valdiation.result?.count) {
                        res(validateDatabase(url, updater, store));
                    } else {
                        res(null);
                    }
                }
                data.onerror = () => {
                    rej(data.error?.message);
                }
            }
            valdiation.onerror = () => {
                rej(valdiation.error?.message);
            }
        }
        request.onerror = () => {
            rej(request.error?.message);
        }
    })
}

export async function validateGameDatabase(): Promise<string | null> {
    return Promise.all(
        [
            { store: Stores.Pokemon, url: BASE_API_URL_POKEMON, updater: updatePokemonDatabase },
            { store: Stores.Items, url: BASE_API_URL_ITEM, updater: updateItemDatabase },
            { store: Stores.Moves, url: BASE_API_URL_MOVES, updater: updateMoveDatabase },
            { store: Stores.Berries, url: BASE_API_URL_BERRIES, updater: updateBerryDatabase }
        ].map(data => validateStore(data.store, data.url, data.updater))
    ).then(res => {
        return res.find(r => !!r) ?? null;
    })
}

export async function updateValidator(newCount: number, target: Stores): Promise<string | null> {
    return new Promise((res, rej) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            let validated = { count: newCount, lastFetched: new Date() }
            const validatorTx = db.transaction(Stores.Validator, 'readwrite').objectStore(Stores.Validator).put(
                validated,
                STORE_KEYS[target]
            );

            validatorTx.onsuccess = () => {
                res(null);
            }

            validatorTx.onerror = () => {
                rej(validatorTx.error?.message);
            }
        }
    })
}

