
export const POKEMON_DB = "pokemon-game-local-db";

export enum Stores {
    Pokemon = "pokemon",
    Ability = "ability",
    Sprites = "sprites",
    Moves = "moves",
    Validator = "validator",
}

export const initDB = (): Promise<boolean> => {
    const version = 1;

    return new Promise(res => {
        const request = indexedDB.open(POKEMON_DB, version);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (db.objectStoreNames.contains(Stores.Pokemon)) {
                db.deleteObjectStore(Stores.Pokemon);
            }

            if (db.objectStoreNames.contains(Stores.Ability)) {
                db.deleteObjectStore(Stores.Ability);
            }

            if (db.objectStoreNames.contains(Stores.Validator)) {
                db.deleteObjectStore(Stores.Validator);
            }

            if (db.objectStoreNames.contains(Stores.Sprites)) {
                db.deleteObjectStore(Stores.Sprites);
            }

            if (db.objectStoreNames.contains(Stores.Moves)) {
                db.deleteObjectStore(Stores.Moves);
            }
            db.createObjectStore(Stores.Pokemon);
            db.createObjectStore(Stores.Ability);
            db.createObjectStore(Stores.Sprites);
            db.createObjectStore(Stores.Moves);
            db.createObjectStore(Stores.Validator);
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
            const validatorCount = validator.result;
            if (count === validatorCount) {
                res(true);
            } else {
                res(false);
            }
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