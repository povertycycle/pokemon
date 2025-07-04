import { Stores } from "@/constants/game/enums";
import { POKEMON_DB } from "@/constants/game/main";
import { BASE_API_URL_MOVES } from "@/constants/game/urls";
import {
    IMove,
    MoveBase,
} from "@/features/game-database/moves/interfaces/moves";
import { getService } from "./fetch";
import { PokeAPIMachineData, PokeAPIMoveData } from "@/interfaces/poke-api";
import { parseUrlAsId } from "@/utils/strings";

/**
 * Get pokemon move data
 * @param id Move id
 */
export async function getMoveData(id: number): Promise<MoveBase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const db = request.result;
            const moveTx = db
                .transaction(Stores.Moves, "readonly")
                .objectStore(Stores.Moves)
                .get(id);

            moveTx.onsuccess = () => {
                const result = moveTx.result;

                if (!!result?.data) {
                    resolve(result);
                } else {
                    fetchMoveData(id)
                        .then((res) => {
                            const newData = {
                                id,
                                name: result.name,
                                data: res,
                            };

                            const insertTx = db
                                .transaction(Stores.Moves, "readwrite")
                                .objectStore(Stores.Moves)
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
                }
            };

            moveTx.onerror = (e?: any) => {
                reject(e?.message);
            };
        };
    });
}

/**
 * Helper to get move id data from PokeAPI
 */
async function fetchMoveData(id: number): Promise<IMove> {
    let data: IMove;
    let machines: Record<string, string> = {};

    return getService(`${BASE_API_URL_MOVES}/${id}`)
        .then((res: PokeAPIMoveData) => {
            const effectEntry =
                res.effect_entries?.find(
                    (effect) => effect.language.name === "en"
                )?.effect ?? null;
            const flavorText =
                res.flavor_text_entries
                    ?.filter((flavor) => flavor.language.name === "en")
                    ?.at(-1)?.flavor_text ?? null;
            const versions = res.flavor_text_entries.reduce(
                (acc, { version_group }) => {
                    if (!acc.includes(version_group.name)) {
                        acc.push(version_group.name);
                    }
                    return acc;
                },
                [] as string[]
            );

            data = {
                accuracy: res.accuracy,
                category: res.damage_class.name,
                pokemons: res.learned_by_pokemon.map((pokemon) =>
                    parseUrlAsId(pokemon.url)
                ),
                machines,
                power: res.power,
                pp: res.pp,
                type: res.type.name,
                effectEntry,
                flavorText,
                versions,
            };
            return Promise.all(
                res.machines.map((machine) => getService(machine.machine.url))
            );
        })
        .then((res: PokeAPIMachineData[]) => {
            if (!data) {
                throw new Error("Error intializing");
            } else {
                res.forEach((machine) => {
                    machines[machine.version_group.name] = machine.item.name;
                });
                data.machines = machines;
                return data;
            }
        });
}
