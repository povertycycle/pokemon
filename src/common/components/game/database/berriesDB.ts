import { errorCheck } from "@/common/utils/errorCheck";
import { BASE_API_URL_BERRIES } from "../../../../constants/urls";
import { POKEMON_DB, Stores } from "../../../../database/main-db";
import { doBatchProcess } from "../../../../database/_utils";
import { trimUrl } from "@/common/utils/trimUrl";

export const BERRIES_VALIDATOR_KEY = "ckFdN0Zi8q6ju12pL84bQZ9NWTceoRQE";
function generateBerryData(data: any) {
    return {
        firmness: data.firmness.name,
        flavors: data.flavors.map((f: any) => ({flavor:f.flavor.name,potency:f.potency})),
        growth_time: data.growth_time,
        item: trimUrl(data?.item.url)??"-1",
        max_harvest: data.max_harvest,
        natural_gift: {
            power: data.natural_gift_power,
            type: data.natural_gift_type.name
        },
        size: data.size,
        smoothness: data.smoothness,
        soil_dryness: data.soil_dryness
    }
}
async function validateDatabase(db: IDBDatabase, count: number): Promise<boolean> {
    return new Promise((res, rej) => {
        const validator = db.transaction(Stores.Validator, 'readonly').objectStore(Stores.Validator).get(BERRIES_VALIDATOR_KEY);
        validator.onsuccess = () => { res(validator?.result?.count !== undefined && count === validator.result.count); }
        validator.onerror = () => { rej("Failed to validate database...") }
    })
}
async function updateValidator(newCount: number): Promise<{count: number} | null> {
    return new Promise(res => {
        const request = indexedDB.open(POKEMON_DB);
        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            let validated = {count: newCount, fetchedAt: new Date()}
            const validatorTx = db.transaction(Stores.Validator, 'readwrite').objectStore(Stores.Validator).put(validated, BERRIES_VALIDATOR_KEY);
                validatorTx.onsuccess = () => { res(validated); }
            validatorTx.onerror = () => { res(null); }
        }
    })
}
export async function getAllBerries(): Promise<any[] | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const berriesTx =  db.transaction(Stores.Berries, 'readwrite').objectStore(Stores.Berries);
            const berryList = berriesTx.getAll();

            function processData(data: any) {
                const insert = request.result.transaction(Stores.Berries, 'readwrite').objectStore(Stores.Berries);
                let berryData = generateBerryData(data);
                insert.put(berryData, String(data.id));
            }

            berryList.onsuccess = () => {
                const dbCount = berryList.result.length;
                let newCount: number;
                validateDatabase(db, dbCount).then(valid => {
                    if (valid) {
                        result(berryList.result)
                    } else {
                        fetch(`${BASE_API_URL_BERRIES}`).then(res => {
                            return errorCheck(res);
                        }).then(async res => {
                            newCount = res.count;
                            return fetch(`${BASE_API_URL_BERRIES}?offset=0&limit=${res.count}`).then(res=>{return errorCheck(res);});
                        }).then(async res => {
                            let exists = db.transaction(Stores.Berries, 'readonly').objectStore(Stores.Berries).getAllKeys();
                            exists.onsuccess = () => {
                                let k = exists.result; 
                                doBatchProcess(res.results.map((r: any)=>(r.url)).filter((u:any)=>!k.includes(trimUrl(u))), processData).then(res => {
                                    if (res) updateValidator(newCount).then(updateRes=>{
                                        if (updateRes) {
                                            let berries = db.transaction(Stores.Berries, 'readonly').objectStore(Stores.Berries).getAll();
                                            berries.onsuccess = () => { result(berries.result) }
                                        }
                                    })
                                })
                            }
                        })
                    }
                });
            }
        }
    })
}