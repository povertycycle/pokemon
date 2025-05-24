import { STORE_KEYS, Stores } from "@/constants/game/enums";
import { POKEMON_DB } from "@/constants/game/main";
import {
    BASE_API_URL_BERRIES,
    BASE_API_URL_ITEM,
    BASE_API_URL_MOVES,
    BASE_API_URL_POKEMON,
} from "@/constants/game/urls";
import { ErrorString } from "@/interfaces/generic";
import { PokeAPIResponse } from "@/interfaces/poke-api";
import { parseUrlAsId } from "@/utils/strings";
import { getService } from "./fetch";

/**
 * Initialize indexedDB by checking if all the store exists,
 * and update if they don't
 *
 * @returns Success status boolean
 */
export const initCacheRegistry = (): Promise<boolean> => {
    const version = 9;

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(POKEMON_DB, version);

        request.onupgradeneeded = () => {
            const db = request.result;

            Object.values(Stores).forEach((key) => {
                if (db.objectStoreNames.contains(key)) {
                    db.deleteObjectStore(key);
                }
            });

            Object.values(Stores).forEach((key) => {
                db.createObjectStore(key);
            });
        };

        request.onsuccess = () => {
            resolve(true);
        };

        request.onerror = () => {
            reject("Error setting up IndexedDB. Please contact developer");
        };
    });
};

/**
 * Do a validation on the game's databases as listed in the stores
 *
 * @returns Error string on failure
 */
export async function validateGameDatabase(): Promise<ErrorString> {
    return Promise.all(
        [
            { store: Stores.Pokemon, url: BASE_API_URL_POKEMON },
            { store: Stores.Items, url: BASE_API_URL_ITEM },
            { store: Stores.Moves, url: BASE_API_URL_MOVES },
            { store: Stores.Berries, url: BASE_API_URL_BERRIES },
        ].map((data) => validateStore(data.store, data.url))
    ).then((res) => {
        return res.find((r) => !!r) ?? null;
    });
}

/**
 * Internal functions
 */

/**
 * Validate a store given its initial value set when user opens the app
 *
 * @param store Target store object
 * @param url URL to fetch new data upon revalidation request
 * @param updater Updater function to update new store data
 * @returns Error string on failure
 */
function validateStore(store: Stores, url: string): Promise<ErrorString> {
    return new Promise((res, rej) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const db: IDBDatabase = request.result;
            const validation = db
                .transaction(Stores.Validator, "readonly")
                .objectStore(Stores.Validator)
                .get(STORE_KEYS[store]);

            validation.onsuccess = () => {
                const data = db
                    .transaction(store, "readonly")
                    .objectStore(store)
                    .getAllKeys();
                data.onsuccess = () => {
                    if (data.result.length !== validation.result?.count) {
                        res(validateDatabase(url, store));
                    } else {
                        res(null);
                    }
                };
                data.onerror = () => {
                    rej(data.error?.message);
                };
            };
            validation.onerror = () => {
                rej(validation.error?.message);
            };
        };
        request.onerror = () => {
            rej(request.error?.message);
        };
    });
}

/**
 * Revalidation database function checking via total count
 *
 * @param url URL designation
 * @param updater Updater function to update new data
 * @param store Target store
 * @returns Error string on failure
 */
async function validateDatabase(
    url: string,
    store: Stores
): Promise<ErrorString> {
    const LIMIT = 9999;
    const validationError = new Error("Error fetching data from API");

    return getService(`${url}?offset=0&limit=${LIMIT}`)
        .then((res: PokeAPIResponse) => {
            if (res.count > LIMIT) {
                return getService(`${url}?offset=0&limit=${res.count}`);
            } else {
                return res;
            }
        })
        .then((finalRes: PokeAPIResponse) => {
            return updateStoreDatabase(store, finalRes);
        })
        .then((countRes: number) => {
            if (countRes <= 0) throw validationError;
            return updateValidator(countRes, store);
        });
}

/**
 * Updater for new validation count to target store
 * - If failed to update, should delete all data in the store
 *
 * @param newCount New total count
 * @param target Target store
 * @returns Error string on failure
 */
async function updateValidator(
    newCount: number,
    target: Stores
): Promise<ErrorString> {
    return new Promise((res, rej) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            let validated = { count: newCount, lastFetched: new Date() };
            const validatorTx = db
                .transaction(Stores.Validator, "readwrite")
                .objectStore(Stores.Validator)
                .put(validated, STORE_KEYS[target]);

            validatorTx.onsuccess = () => {
                res(null);
            };

            validatorTx.onerror = () => {
                db.transaction(target, "readwrite").objectStore(target).clear();

                rej(validatorTx.error?.message);
            };
        };
    });
}

/**
 * Store updaters and individual store data processors
 *
 * @param store Target store
 * @param response Response data from PokeAPI
 * @returns Promise of total data count
 */
async function updateStoreDatabase(
    store: Stores,
    response: PokeAPIResponse
): Promise<number> {
    return new Promise((result) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const insertTx = db.transaction(store, "readwrite");
            const insert = insertTx.objectStore(store);

            let unparsed = -1;
            response.results.forEach((item) => {
                const id: number = parseUrlAsId(item.url);
                let parsedId: number;
                if (!Number.isNaN(id)) {
                    parsedId = id;
                } else {
                    parsedId = unparsed;
                    unparsed -= 1;
                }
                const data = { id: parsedId, name: item.name };

                insert.put(data, id);
            });

            insertTx.oncomplete = () => {
                result(response.count);
            };
        };
    });
}
