import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { BASE_API_URL_BERRIES } from "@/common/constants/urls";
import { PokeAPIBerry } from "@/common/interfaces/_externals/berry";
import { BerryData, BerryDetails } from "@/common/interfaces/berry";
import { errorCheck } from "@/common/utils/errorCheck";
import { PokeAPIResponse } from "./_utils";
import { cacheIsAllowed } from "@/common/components/home/cache/utils";
import { getItemData } from "./items-db";
import { trimUrl } from "@/common/utils/string";

export async function updateBerryDatabase(berries: PokeAPIResponse): Promise<number> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const insertTx = request.result.transaction(Stores.Berries, 'readwrite');
            const insert = insertTx.objectStore(Stores.Berries);
            berries.results.forEach(berry => {
                insert.put({ name: `${berry.name}-berry` }, berry.name)
            })

            insertTx.oncomplete = () => {
                result(berries.count);
            }
        }
    })
}

export async function getAllBerries(): Promise<BerryData[] | null> {
    return new Promise(res => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const berryList = db.transaction(Stores.Berries, 'readonly').objectStore(Stores.Berries).getAll();

            berryList.onsuccess = () => {
                res(berryList.result ?? null);
            }

            berryList.onerror = () => {
                res(null);
            }
        }
    })
}

export async function getBerryDetails(berry: string): Promise<BerryDetails | null> {
    return new Promise(resolve => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            fetchBerryDetails(berry).then(res => {
                if (!!res && cacheIsAllowed()) {
                    const insert = db.transaction(Stores.Berries, 'readwrite').objectStore(Stores.Berries).put(
                        {
                            name: `${berry}-berry`,
                            details: res,
                        },
                        berry
                    )
                    insert.onsuccess = () => {
                        resolve(res);
                    }
                    insert.onerror = () => {
                        resolve(res);
                    }
                } else {
                    resolve(res);
                }
            }).catch(err => {
                resolve(null);
            })
        }
    })
}

async function fetchBerryDetails(berry: string): Promise<BerryDetails | null> {
    return fetch(`${BASE_API_URL_BERRIES}/${berry}`).then(res => {
        return errorCheck(res);
    }).then((res: PokeAPIBerry) => {
        return {
            itemId: parseInt(trimUrl(res.item.url)),
            firmness: res.firmness.name,
            flavors: res.flavors.map(flavor => ({
                flavor: flavor.flavor.name,
                potency: flavor.potency
            })),
            growthTime: res.growth_time,
            maxHarvest: res.max_harvest,
            naturalGift: {
                power: res.natural_gift_power,
                type: res.natural_gift_type.name,
            },
            size: res.size,
            smoothness: res.smoothness,
            soilDryness: res.soil_dryness
        }
    })
}