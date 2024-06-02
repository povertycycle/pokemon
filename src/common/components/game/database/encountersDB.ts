import { trimUrl } from "@/common/utils/trimUrl";
import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_POKEMON } from "../constants";
import { POKEMON_DB, Stores } from "./db";
import { EncounterData } from "../contents/pokemon/interfaces/encounters";
import { errorCheck } from "@/common/utils/errorCheck";


function fetchEncounterData(id: string): Promise<EncounterData | null> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_POKEMON}/${id}/encounters`).then(res => {
            return errorCheck(res);
        }).then(res => {
            const encounters = (res as any[]).reduce((acc: EncounterData, curr: any) => {
                let loc_id = trimUrl(curr?.location_area?.url);
                
                curr?.version_details?.forEach((enc: any) => {
                    let version = enc?.version?.name;
                    let encounter = enc?.encounter_details?.map((ed: any) => ({
                        chance: ed.chance,
                        ...((ed.condition_values?.length ?? 0) > 0 && { condition: ed.condition_values.map((cv: any) => cv.name) }),
                        level_range: ed.min_level === ed.max_level ? String(ed.min_level) : `${ed.min_level};${ed.max_level}`,
                        method: ed.method.name
                    }))

                    if (acc[version]) {
                        let encs = acc[version][loc_id];
                        if (encs) {
                            enc.push(encounter)
                        } else {
                            acc[version][loc_id] = encounter
                        }
                    } else {
                        acc[version] = { [loc_id]: encounter }
                    }
                })
                return acc;
            }, {})
            result(encounters);
        }).catch(err => {
            result(null);
        })
    })
}

export function getEncounterData(id: string): Promise<EncounterData | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const encTx = db.transaction(Stores.Encounters, 'readonly');

            if (cacheIsAllowed()) {
                const encData = encTx.objectStore(Stores.Encounters).get(id);
                
                encData.onsuccess = () => {
                    if (encData.result) {
                        result(encData.result);
                    } else {
                        fetchEncounterData(id).then(res => {
                            db.transaction(Stores.Encounters, 'readwrite').objectStore(Stores.Encounters).put(res, id);
                            result(res);
                        })
                    }
                }
            } else {
                fetchEncounterData(id).then(res => {
                    result(res);
                });
            }
        }
    })
}