import { trimUrl } from "@/common/utils/trimUrl";
import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_ITEM } from "../constants";
import { POKEMON_DB, Stores } from "./db";
import { ItemData } from "../contents/items/constants";
import { errorCheck } from "@/common/utils/errorCheck";
import { doBatchProcess } from "./_utils";
import { capitalize } from "@/common/utils/capitalize";

export const ITEMS_VALIDATOR_KEY = "Xk7dcBfI2GObBbxjApy5US3feJkwWN6V";
function generateItemData(data: any) {
    let n=data.names.map((n: any) => ({name: n.name, language: n.language.name}));
    let m=data?.machines?.map((m: any) => ({machine:trimUrl(m.url), version: m.version_group.name}));
    let e=data?.effect_entries.map((eE: any) => (eE.language?.name === "en" ? eE?.effect : undefined)).filter(Boolean)[0] ?? null
    let a=data.attributes.map((a: any) => (a?.name));
    let f=data?.flavor_text_entries?.filter((fTE:any)=>(fTE.language.name==="en"))?.at(-1)?.text;
    let g=data?.flavor_text_entries?.reduce((acc:string[],fTE:any)=>{let v=fTE?.version_group?.name;if(!acc.includes(v))acc.push(v);return acc;},[])
    return {
        category: data?.category?.name ?? "uncategorized",
        name: data.name,
        ...(a.length>0&&{attributes:a}),
        ...(data.baby_trigger_for?.url&&{baby_trigger_for:trimUrl(data.baby_trigger_for?.url)}),
        ...(data.cost&&{cost:data.cost}),
        ...(f&&{flavor_text:f}),
        ...(e&&{effect:e}),
        ...(data?.fling_effect?.name&&{fling_effect:data.fling_effect?.name}),
        ...(data?.fling_power&&{fling_power:data.fling_power}),
        ...(m.length>0&&{machines:m}),
        ...(n.length>0&&{names:n}),
        ...(data?.sprites?.default&&{sprites:data?.sprites?.default}),
        ...(g.length>0&&{games:g})
    }
}
async function validateDatabase(db: IDBDatabase, count: number): Promise<boolean> {
    return new Promise((res, rej) => {
        const validator = db.transaction(Stores.Validator, 'readonly').objectStore(Stores.Validator).get(ITEMS_VALIDATOR_KEY);
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
            const validatorTx = db.transaction(Stores.Validator, 'readwrite').objectStore(Stores.Validator).put(validated, ITEMS_VALIDATOR_KEY);
                validatorTx.onsuccess = () => { res(validated); }
            validatorTx.onerror = () => { res(null); }
        }
    })
}
export async function getAllItems(): Promise<any[] | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const itemTx =  db.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items);
            const itemList = itemTx.getAll();

            function processData(data: any) {
                const insert = request.result.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items);
                let itemData = generateItemData(data);
                insert.put(itemData, String(data.id));
            }

            itemList.onsuccess = () => {
                const dbCount = itemList.result.length;
                let newCount: number;
                validateDatabase(db, dbCount).then(valid => {
                    if (valid) {
                        result(itemList.result)
                    } else {
                        fetch(`${BASE_API_URL_ITEM}`).then(res => {
                            return errorCheck(res);
                        }).then(async res => {
                            newCount = res.count;
                            return fetch(`${BASE_API_URL_ITEM}?offset=0&limit=${res.count}`).then(res=>{return errorCheck(res);});
                        }).then(async res => {
                            let exists = db.transaction(Stores.Items, 'readonly').objectStore(Stores.Items).getAllKeys();
                            exists.onsuccess = () => {
                                let k = exists.result; 
                                doBatchProcess(res.results.map((r: any)=>(r.url)).filter((u:any)=>!k.includes(trimUrl(u))), processData).then(res => {
                                    if (res) updateValidator(newCount).then(updateRes=>{
                                        if (updateRes) {
                                            let items = db.transaction(Stores.Items, 'readonly').objectStore(Stores.Items).getAll();
                                            items.onsuccess = () => { result(items.result) }
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

function fetchItemData(id: string): Promise<ItemData | null> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_ITEM}/${id}`).then(res => errorCheck(res)).then(res => {
            let itemData = generateItemData(res);
            result(itemData);
        }).catch(err => {
            result(null)
        })
    })    
}

export async function getItemSprite(id: string): Promise<{name: string, url: string} | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const itemsTx = db.transaction(Stores.Items, 'readonly');

            if (cacheIsAllowed()) {
                const itemData = itemsTx.objectStore(Stores.Items).get(id);
                
                itemData.onsuccess = () => {
                    if ((itemData.result?.names?.length ?? 0) > 0) {
                        result({name: itemData.result.names.find((n: any) => (n.language === "en"))?.name ?? itemData.result.names[0].name, url: itemData.result.sprites });
                    } else {
                        fetchItemData(id).then(res => {
                            db.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items).put(res, id);
                            let name = res?.names?.find(n=>n.language==="en")?.name??capitalize(res?.name);
                            let url = res?.sprites;
                            if (name && url) {
                                result({name,url})
                            } else {
                                result(null);
                            }
                        })
                    }
                }

            } else {
                fetchItemData(id).then(res => {
                    let name = res?.names?.find(n=>n.language==="en")?.name??capitalize(res?.name);
                    let url = res?.sprites;
                    if (name && url) {
                        result({name,url})
                    } else {
                        result(null);
                    }
                });
            }
        }
    })
}