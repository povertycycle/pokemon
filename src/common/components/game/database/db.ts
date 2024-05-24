
export const POKEMON_DB = "pokemon-game-local-db";

export enum Stores {
    Pokemon = "pokemon",
    Sprites = "sprites",
    Species = "species",
    Evolution = "evolution",

    Ability = "ability",
    Moves = "moves",
    Validator = "validator",
}

export const initDB = (): Promise<boolean> => {
    const version = 2;

    return new Promise(res => {
        const request = indexedDB.open(POKEMON_DB, version);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (db.objectStoreNames.length > 0) {
                Object.values(Stores).forEach(key => {
                    if (db.objectStoreNames.contains(key)) {
                        db.deleteObjectStore(key);
                    }
                })
            };

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

export const VALIDATOR_KEY = "PkOq3NuqNXXxgpZZofHHlOc6JcDNKLne";
export async function validateDatabase(db: IDBDatabase, count: number): Promise<boolean> {
    return new Promise((res, rej) => {
        const validator = db.transaction(Stores.Validator, 'readonly').objectStore(Stores.Validator).get(VALIDATOR_KEY);

        validator.onsuccess = () => {
            res(count === validator.result);
        }

        validator.onerror = () => {
            rej("Failed to validate database...")
        }
    })
}

export async function updateValidator(newCount: number): Promise<{count: number} | null> {
    return new Promise(res => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const validatorTx = db.transaction(Stores.Validator, 'readwrite').objectStore(Stores.Validator).put(newCount, VALIDATOR_KEY);
    
            validatorTx.onsuccess = () => {
                res({count: newCount});
            }

            validatorTx.onerror = () => {
                res(null);
            }
        }
    })
}