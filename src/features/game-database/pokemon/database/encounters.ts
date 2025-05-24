import { Stores } from "@/constants/game/enums";
import { POKEMON_DB } from "@/constants/game/main";
import { BASE_API_URL_POKEMON } from "@/constants/game/urls";
import { PokeAPIEncounters } from "@/interfaces/poke-api";
import { getService } from "@/requests/fetch";
import {
    EncounterData,
    IEncounters,
    PokemonDetails,
} from "../interfaces/pokemon";

/**
 * Fetch missing encounter data
 * @param id Pokemon id
 */
export function getEncounterData(id: number): Promise<EncounterData> {
    return new Promise((result, reject) => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            fetchEncounterData(id)
                .then((res) => {
                    let db: IDBDatabase = request.result;
                    const pokeTx = db
                        .transaction(Stores.PokeDetails, "readwrite")
                        .objectStore(Stores.PokeDetails);
                    const details = pokeTx.get(id);

                    details.onsuccess = () => {
                        const _data = details.result as PokemonDetails;
                        _data.encounters.data = res;

                        const add = pokeTx.put(_data, id);
                        add.onsuccess = () => {
                            result(res);
                        };
                        add.onerror = (err?: any) => {
                            reject(err?.message);
                        };
                    };
                })
                .catch((err) => {
                    reject(err?.message);
                });
        };
    });
}

/**
 * Fetch data from PokeAPI
 * @param id Pokemon id
 */
async function fetchEncounterData(id: number): Promise<EncounterData> {
    return getService(`${BASE_API_URL_POKEMON}/${id}/encounters`).then(
        (res: PokeAPIEncounters[]) => {
            const parsed: EncounterData = {};
            res.forEach((encounter) => {
                const area = encounter.location_area.name;

                encounter.version_details.forEach((encounterData) => {
                    const version = encounterData.version.name;
                    const compiled: IEncounters = {};

                    Object.entries(
                        Object.groupBy(
                            encounterData.encounter_details,
                            ({ method }) => method.name
                        )
                    ).forEach(([method, data]) => {
                        let min = 101,
                            max = -1,
                            totalChance = 0,
                            conditions = [] as string[];
                        data?.forEach(
                            ({
                                chance,
                                condition_values,
                                max_level,
                                min_level,
                            }) => {
                                totalChance += chance;
                                conditions = conditions.concat(
                                    condition_values.map((value) => value.name)
                                );
                                if (!!!min || min > min_level) {
                                    min = min_level;
                                }
                                if (!!!max || max < max_level) {
                                    max = max_level;
                                }
                            }
                        );
                        compiled[method] = {
                            level: min === max ? String(min) : `${min}-${max}`,
                            chance: totalChance,
                            ...(conditions.length > 0 && { conditions }),
                        };
                    });

                    if (parsed[version]) {
                        if (parsed[version][area]) {
                            const data = parsed[version][area];
                            parsed[version][area] = {
                                ...data,
                                ...compiled,
                            };
                        } else {
                            parsed[version][area] = compiled;
                        }
                    } else {
                        parsed[version] = {
                            [area]: compiled,
                        };
                    }
                });
            });

            let final = {} as EncounterData;
            Object.entries(parsed).forEach(([_version, _gameData]) => {
                const exist = Object.entries(final).find(
                    ([location, gameData]) =>
                        JSON.stringify(Object.entries(gameData).sort()) ===
                        JSON.stringify(Object.entries(_gameData).sort())
                );
                if (!!exist) {
                    final[exist[0] + ";" + _version] = _gameData;
                    delete final[exist[0]];
                    return;
                } else {
                    final[_version] = _gameData;
                }
            });

            return final;
        }
    );
}
