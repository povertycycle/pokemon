import { Stores } from "@/constants/game/enums";
import { POKEMON_DB } from "@/constants/game/main";

/**
 * Get move name from indexed db
 * @param id Move id
 */
export async function getMoveName(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const moveTx = request.result
                .transaction(Stores.Moves, "readonly")
                .objectStore(Stores.Moves)
                .get(id);
            moveTx.onsuccess = () => {
                const data = moveTx.result as { name: string };
                if (data.name) {
                    resolve(data.name);
                } else {
                    reject(null);
                }
            };
            moveTx.onerror = (err?: any) => {
                reject(err?.message);
            };
        };
    });
}
