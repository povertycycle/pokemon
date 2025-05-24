import { Stores } from "@/constants/game/enums";
import { POKEMON_DB } from "@/constants/game/main";

/**
 * Make a request to fetch item name from indexed db
 *
 * @param id Item id
 * @returns Item name
 */
export async function getItemName(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const itemTx = request.result
                .transaction(Stores.Items, "readonly")
                .objectStore(Stores.Items)
                .get(id);
            itemTx.onsuccess = () => {
                const data = itemTx.result as { name: string };
                resolve(data.name);
            };
            itemTx.onerror = () => {
                reject(null);
            };
        };

        request.onerror = () => {
            reject(null);
        };
    });
}
