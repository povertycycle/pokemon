import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { ItemData } from "@/common/interfaces/item";
import { trimUrl } from "@/common/utils/string";
import { PokeAPIResponse } from "./_utils";
import { cacheIsAllowed } from "@/common/components/home/cache/utils";
import { BASE_API_URL_ITEM } from "@/common/constants/urls";
import { errorCheck } from "@/common/utils/errorCheck";
import { PokeAPIItemData } from "@/common/interfaces/_externals/item";

export async function updateItemDatabase(items: PokeAPIResponse): Promise<number> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const insertTx = request.result.transaction(Stores.Items, 'readwrite');
            const insert = insertTx.objectStore(Stores.Items);
            items.results.forEach(item => {
                insert.put({ name: item.name }, trimUrl(item.url))
            })

            insertTx.oncomplete = () => {
                result(items.count);
            }
        }
    })
}

export async function getItemName(id: string): Promise<string | null> {
    return new Promise(resolve => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const itemTx = request.result.transaction(Stores.Items, 'readonly').objectStore(Stores.Items).get(id);
            itemTx.onsuccess = () => {
                const data = itemTx.result as ItemData;
                resolve(data.name);
            }
            itemTx.onerror = () => {
                resolve(null);
            }
        }
    })
}

export async function getItemData(id: string): Promise<ItemData | null> {
    return new Promise(resolve => {
        const request = indexedDB.open(POKEMON_DB);
        request.onsuccess = () => {
            const db = request.result;
            const itemTx = db.transaction(Stores.Items, 'readonly').objectStore(Stores.Items).get(id);
            itemTx.onsuccess = () => {
                const data = itemTx.result as ItemData;
                if (!!data.data) {
                    resolve(data);
                } else {
                    fetchItemData(id).then(res => {
                        if (cacheIsAllowed() && !!res) {
                            const insert = db.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items).put(
                                res,
                                id,
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
            }
            itemTx.onerror = () => {
                resolve(null);
            }
        }
    })
}

async function fetchItemData(name: string): Promise<ItemData | null> {
    return fetch(`${BASE_API_URL_ITEM}/${name}`).then(res => errorCheck(res)).then((res: PokeAPIItemData) => {
        const { flavorText, games } = res.flavor_text_entries.reduce((acc, flavor) => {
            if (flavor.language.name === "en") {
                acc.flavorText = flavor.text;
            }
            if (!acc.games.includes(flavor.version_group.name)) {
                acc.games.push(flavor.version_group.name);
            }
            return acc;
        }, { flavorText: "", games: [] as string[] })

        return {
            name: res.name,
            data: {
                attributes: res.attributes.map(attribute => attribute.name),
                category: res.category?.name ?? null,
                cost: res.cost,
                descriptions: {
                    effect: res.effect_entries.filter(effect => effect.language.name === "en").at(-1)?.effect ?? "",
                    flavorText
                },
                fling: {
                    effect: res.fling_effect?.name ?? null,
                    power: res.fling_power
                },
                names: res.names.map(name => ({
                    name: name.name,
                    language: name.language.name,
                })),
                games
            }
        }
    }).catch(err => {
        console.error(err);
        return null
    });
}