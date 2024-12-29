import { cacheIsAllowed } from "@/common/components/home/cache/utils";
import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { BASE_API_URL_POKEMON } from "@/common/constants/urls";
import { PokeAPIEncounters } from "@/common/interfaces/_externals/encounter";
import { EncounterData } from "@/common/interfaces/encounter";
import { PokemonDetails } from "@/common/interfaces/pokemon";
import { errorCheck } from "@/common/utils/errorCheck";

export function getEncounterData(id: string): Promise<EncounterData | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            fetchEncounterData(id).then(res => {
                if (cacheIsAllowed()) {
                    let db: IDBDatabase = request.result;
                    const pokeTx = db.transaction(Stores.PokeDetails, 'readwrite').objectStore(Stores.PokeDetails);
                    const details = pokeTx.get(id);
                    details.onsuccess = () => {
                        const _data = details.result as PokemonDetails;
                        _data.encounters.data = res;
                        const add = pokeTx.put(_data, id);
                        add.onsuccess = () => {
                            result(res);
                        }
                        add.onerror = () => {
                            result(res);
                        }
                    }
                } else {
                    result(res);
                }
            }).catch(err => {
                result(null);
            })
        }
    })
}

async function fetchEncounterData(id: string): Promise<EncounterData> {
    return fetch(`${BASE_API_URL_POKEMON}/${id}/encounters`).then(res => {
        return errorCheck(res);
    }).then((res: PokeAPIEncounters) => {
        return res.reduce((acc, encounter) => {
            const area = encounter.location_area.name;
            encounter.version_details.forEach(encounterData => {
                const version = encounterData.version.name;
                const compiled = Object.entries(Object.groupBy(encounterData.encounter_details, ({ method }) => method.name)).map(
                    ([method, data]) => {
                        let min = 101, max = -1, totalChance = 0, conditions = [] as string[];
                        data?.forEach(({ chance, condition_values, max_level, min_level }) => {
                            totalChance += chance;
                            conditions = conditions.concat(condition_values.map(value => value.name));
                            if (!!!min || min > min_level) {
                                min = min_level;
                            }
                            if (!!!max || max < max_level) {
                                max = max_level;
                            }
                        })
                        return {
                            method,
                            levelRange: min === max ? String(min) : `${min}-${max}`,
                            totalChance,
                            ...(conditions.length > 0 && { conditions }),
                        }
                    }
                )
                if (acc[version]) {
                    if (acc[version][area]) {
                        acc[version][area].concat(compiled);
                    } else {
                        acc[version][area] = compiled;
                    }
                } else {
                    acc[version] = {
                        [area]: compiled
                    }
                }
            })
            return acc;
        }, {} as EncounterData);
    }).then(res => {
        let final = {} as EncounterData;
        Object.entries(res).forEach(([_version, _gameData]) => {
            const exist = Object.entries(final).find(([location, gameData]) => (
                JSON.stringify(Object.entries(gameData).sort()) === JSON.stringify(Object.entries(_gameData).sort())
            ))
            if (!!exist) {
                final[exist[0] + ";" + _version] = _gameData;
                delete final[exist[0]];
                return;
            } else {
                final[_version] = _gameData;
            }
        })
        return final;
    })
}