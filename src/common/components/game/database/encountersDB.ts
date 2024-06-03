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
            result(
                (res as any[])?.reduce((acc: EncounterData, enc: any) => {
                    let locId = trimUrl(enc?.location_area?.url);
                    enc?.version_details?.forEach((gameData: any) => {
                        let version = gameData?.version?.name;
                        let encounters = gameData?.encounter_details?.reduce((encAcc:any,ed:any)=> {
                            let hasSame = false;
                            let condition = ed?.condition_values.length>0?ed?.condition_values?.map((cv:any)=>cv.name):undefined;
                            let newEnc = {
                                chance: ed.chance,
                                level_range: ed.min_level===ed.max_level?String(ed.min_level):`${ed.min_level}-${ed.max_level}`,
                                method: ed.method.name,
                                ...(condition && {condition:condition}),
                            }
                            encAcc?.forEach((e:any)=> {
                                if (e.method===newEnc.method && e?.condition?.sort()?.toString()===condition?.sort()?.toString()) {
                                    let ranges = `${e.level_range}-${newEnc.level_range}`.split("-").sort((a:string,b:string)=>((parseInt(a)??0) - (parseInt(b)??0)));;
                                    e.chance += newEnc.chance;
                                    e.level_range = ranges.at(0)===ranges.at(-1)?ranges[0]:`${ranges.at(0)}-${ranges.at(-1)}`;
                                    hasSame=true;
                                    return;
                                }
                            })
                            if (!hasSame) {encAcc.push(newEnc);}
                            return encAcc;
                        }, []);
                        if (acc[version]) {
                            if (acc[version][locId]) {acc[version][locId].concat(...encounters)}
                            else {acc[version][locId]=encounters;}
                        } else {
                            acc[version]={[locId]:encounters}
                        }
                    })
                    return acc;
                }, {})
            );
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