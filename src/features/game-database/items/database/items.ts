import { POKEMON_DB } from "@/constants/game/main";
import { ItemBase, ItemData } from "../interfaces/items";
import { Stores } from "@/constants/game/enums";
import { BASE_API_URL_ITEM } from "@/constants/game/urls";
import { getService } from "@/requests/fetch";
import { PokeAPIItemData } from "@/interfaces/poke-api";

/**
 * Get item data
 * @param id Item number
 */
export async function getItemDetails(id: number): Promise<ItemBase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const itemRequest = db
                .transaction(Stores.Items, "readonly")
                .objectStore(Stores.Items)
                .get(id);

            itemRequest.onsuccess = () => {
                const itemData = itemRequest.result;

                if (!itemData.data) {
                    fetchItemData(id)
                        .then((data) => {
                            const newData = {
                                ...itemData,
                                data,
                            };

                            const insertTx = db
                                .transaction(Stores.Items, "readwrite")
                                .objectStore(Stores.Items)
                                .put(newData, id);
                            insertTx.onsuccess = () => {
                                resolve(newData);
                            };
                            insertTx.onerror = (err?: any) => {
                                reject(err?.message);
                            };
                        })
                        .catch((err) => {
                            reject(err?.message);
                        });
                } else {
                    resolve(itemData);
                }
            };

            itemRequest.onerror = (e: any) => {
                reject(e);
            };
        };
    });
}

/**
 * Fetch item data from PokeAPI
 */
async function fetchItemData(id: number): Promise<ItemData> {
    return getService(`${BASE_API_URL_ITEM}/${id}`).then(
        (res: PokeAPIItemData) => {
            const { flavorText, games } = res.flavor_text_entries.reduce(
                (acc, flavor) => {
                    if (flavor.language.name === "en") {
                        acc.flavorText = flavor.text;
                    }
                    if (!acc.games.includes(flavor.version_group.name)) {
                        acc.games.push(flavor.version_group.name);
                    }
                    return acc;
                },
                { flavorText: "", games: [] as string[] }
            );

            return {
                attributes: res.attributes.map((attribute) => attribute.name),
                category: res.category?.name ?? null,
                cost: res.cost,
                descriptions: {
                    effect:
                        res.effect_entries
                            .filter((effect) => effect.language.name === "en")
                            .at(-1)?.effect ?? "",
                    flavorText,
                },
                fling: {
                    effect: res.fling_effect?.name ?? null,
                    power: res.fling_power,
                },
                names: res.names.map((name) => ({
                    name: name.name,
                    language: name.language.name,
                })),
                games,
                sprite: res.sprites.default,
            };
        }
    );
}
