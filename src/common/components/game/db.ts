const POKEMON_DB = "pokemon-game-local-db";

let request: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export enum Stores {
    Pokemon = 'pokemon',
}

export const initDB = (): Promise<boolean> => {
    return new Promise(res => {
        request = indexedDB.open(POKEMON_DB);

        request.onupgradeneeded = () => {
            db = request.result;

            if (!db.objectStoreNames.contains(Stores.Pokemon)) {
                db.createObjectStore(Stores.Pokemon)
            }
        }

        request.onsuccess = () => {
            db = request.result;
            version = db.version;
            res(true);
        }

        request.onerror = () => {
            res(false);
        }
    })
};

export const addData = <T>(storeName: string, key: string, data: T): Promise<T|string|null> => {
    return new Promise(res => {
        request = indexedDB.open(POKEMON_DB, version);

        request.onsuccess = () => {
            db = request.result;
            db.transaction(storeName, 'readwrite').objectStore(storeName).add(data, key);
            res(data);
        }

        request.onerror = () => {
            const error = request.error?.message;
            if (error) {
                res(error);
            } else {
                res("Unknown Error.")
            }
        }
    })
};
  
export const getStoreSingleData = <T>(storeName: Stores, key: string): Promise<T[]> => {
    return new Promise(res => {
        request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            db = request.result;
            const pokemon = db.transaction(storeName, 'readonly').objectStore(storeName).get(key);
            
            pokemon.onsuccess = () => {
                res(pokemon.result);
            }
        }
    })
}

export const getStoreAllData = <T>(storeName: Stores): Promise<T[]> => {
    return new Promise(res => {
        request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            db = request.result;
            const pokemons = db.transaction(storeName, 'readonly').objectStore(storeName).getAll();
            pokemons.onsuccess = () => {
                res(pokemons.result);
            }

        }
    })
};