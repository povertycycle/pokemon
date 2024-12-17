import { STORE_KEYS, Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { validatePokemonDatabase } from "./pokemon-db";
import { validateItemDatabase } from "./items-db";


export const initDB = (): Promise<boolean> => {
    const version = 7;

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

function validateStore(store: Stores): Promise<string | null> {
    const STORE_VALIDATORS: Record<string, () => Promise<string | null>> = {
        [Stores.Pokemon]: validatePokemonDatabase,
        [Stores.Items]: validateItemDatabase,
    }
    return new Promise((res, rej) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const db: IDBDatabase = request.result;
            const valdiation = db.transaction(Stores.Validator, 'readonly').objectStore(Stores.Validator).get(STORE_KEYS[store]);

            valdiation.onsuccess = () => {
                const data = db.transaction(store, 'readonly').objectStore(store).getAllKeys();
                data.onsuccess = () => {
                    if (data.result.length !== valdiation.result?.count) {
                        res(STORE_VALIDATORS[store] ? STORE_VALIDATORS[store]() : "Invalid Store");
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
            Stores.Pokemon,
            Stores.Items,
        ].map(store => validateStore(store))
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

