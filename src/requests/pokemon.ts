import { Stores } from "@/constants/game/enums";
import { POKEMON_DB } from "@/constants/game/main";

/**
 * Get pokemon name by id
 * @param id Pokemon Id
 */
export async function getPokemonNameById(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const db = request.result;
            const pokeTx = db
                .transaction(Stores.Pokemon, "readonly")
                .objectStore(Stores.Pokemon)
                .get(id);

            pokeTx.onsuccess = () => {
                const result = pokeTx.result;
                if (result.name) {
                    resolve(result.name);
                } else {
                    reject("[Error]: PN-24");
                }
            };

            pokeTx.onerror = (e?: any) => {
                reject(e?.message);
            };
        };
    });
}
