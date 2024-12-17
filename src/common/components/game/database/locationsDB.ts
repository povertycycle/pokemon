import { capitalize, trimUrl } from "@/common/utils/string";
import { errorCheck } from "@/common/utils/errorCheck";
import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_LOCATIONS } from "../../../constants/urls";
import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";

type LocationData = {
    location: string,
    name: string,
    pokemon_encounters: string[]
}


function fetchLocationData(id: string): Promise<LocationData | null> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_LOCATIONS}/${id}`).then(res => {
            return errorCheck(res);
        }).then(res => {
            const locationData: LocationData = {
                location: res?.location?.name,
                name: res?.names?.find((n: any) => n.language.name === "en")?.name ?? capitalize(res.name),
                pokemon_encounters: res?.pokemon_encounters?.map((pe: any) => trimUrl(pe.pokemon.url)),
            }
            result(locationData);
        }).catch(err => {
            result(null);
        })
    })
}

export function getLocationData(id: string): Promise<string | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const locTx = db.transaction(Stores.Locations, 'readonly');

            if (cacheIsAllowed()) {
                const locData = locTx.objectStore(Stores.Locations).get(id);

                locData.onsuccess = () => {
                    if (locData.result) {
                        result(locData.result.name);
                    } else {
                        fetchLocationData(id).then(res => {
                            if (res) {
                                db.transaction(Stores.Locations, 'readwrite').objectStore(Stores.Locations).put(res, id)
                                result(res.name);
                            } else {
                                result(null);
                            }
                        })
                    }
                }
            } else {
                fetchLocationData(id).then(res => {
                    result(res?.name ?? null);
                });
            }
        }
    })
}

export function processAllLocations(ids: string[]): Promise<{ [id: string]: string } | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            Promise.all(ids.map(id => getLocationData(id))).then(res => {
                let processed = res.filter(Boolean) as string[];
                if (processed.length !== ids.length) {
                    result(null);
                } else {
                    result(ids.reduce((acc: any, id: string, i: number) => {
                        acc[id] = processed[i];
                        return acc;
                    }, {}));
                }
            })
        }
    })
}