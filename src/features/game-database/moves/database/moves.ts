import { POKEMON_DB } from "@/constants/game/main";
import { MoveRequest } from "../interfaces/moves";
import { Stores } from "@/constants/game/enums";

/**
 * Get all moves data from database
 *
 * @returns List of moves data or null
 */
export async function getAllMoves(): Promise<MoveRequest[]> {
    return new Promise((res, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const db: IDBDatabase = request.result;
            const moveList = db
                .transaction(Stores.Moves, "readonly")
                .objectStore(Stores.Moves)
                .getAll();

            moveList.onsuccess = () => {
                res(moveList.result);
            };

            moveList.onerror = (e: any) => {
                reject(e?.message);
            };
        };
    });
}
