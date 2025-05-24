import { Stores } from "@/constants/game/enums";
import { POKEMON_DB } from "@/constants/game/main";
import { BASE_API_URL_BERRIES } from "@/constants/game/urls";
import { PokeAPIBerry } from "@/interfaces/poke-api";
import { getService } from "@/requests/fetch";
import { parseUrlAsId } from "@/utils/strings";
import { BerryBase, BerryData, BerryRequest } from "../interfaces/berries";

/**
 * Get all berry list
 */
export async function getAllBerries(): Promise<BerryRequest[]> {
    return new Promise((res, rej) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const berryList = db
                .transaction(Stores.Berries, "readonly")
                .objectStore(Stores.Berries)
                .getAll();

            berryList.onsuccess = () => {
                res(berryList.result ?? null);
            };

            berryList.onerror = (err?: any) => {
                rej(err?.message);
            };
        };
    });
}

/**
 * Get berry data
 * @param id Berry number
 */
export async function getBerryDetails(id: number): Promise<BerryBase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const berryRequest = db
                .transaction(Stores.Berries, "readonly")
                .objectStore(Stores.Berries)
                .get(id);
            berryRequest.onsuccess = () => {
                const berryData = berryRequest.result;

                if (!berryData.data) {
                    fetchBerryData(id)
                        .then((data) => {
                            const newData = {
                                ...berryData,
                                data,
                            };

                            const insertTx = db
                                .transaction(Stores.Berries, "readwrite")
                                .objectStore(Stores.Berries)
                                .put(newData, id);
                            insertTx.onsuccess = () => {
                                resolve(newData);
                            };
                        })
                        .catch((err) => {
                            reject(err?.message);
                        });
                } else {
                    resolve(berryData);
                }
            };

            berryRequest.onerror = (e: any) => {
                reject(e);
            };
        };
    });
}

/**
 * Helper to fetch berry from PokeAPI
 */
async function fetchBerryData(id: number): Promise<BerryData> {
    return getService(`${BASE_API_URL_BERRIES}/${id}`).then(
        (res: PokeAPIBerry) => {
            return {
                itemId: parseUrlAsId(res.item.url),
                firmness: res.firmness.name,
                flavors: res.flavors.map((flavor) => ({
                    flavor: flavor.flavor.name,
                    potency: flavor.potency,
                })),
                growthTime: res.growth_time,
                maxHarvest: res.max_harvest,
                naturalGift: {
                    power: res.natural_gift_power,
                    type: res.natural_gift_type.name,
                },
                size: res.size,
                smoothness: res.smoothness,
                soilDryness: res.soil_dryness,
            };
        }
    );
}
