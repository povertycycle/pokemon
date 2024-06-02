import { trimUrl } from "@/common/utils/trimUrl";
import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_ITEM } from "../constants";
import { POKEMON_DB, Stores } from "./db";
import { ItemData } from "../contents/items/constants";
import { errorCheck } from "@/common/utils/errorCheck";
import { doBatchProcess } from "./_utils";

export const ITEMS_VALIDATOR_KEY = "Xk7dcBfI2GObBbxjApy5US3feJkwWN6V";
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
            const itemList = db.transaction(Stores.Items, 'readonly').objectStore(Stores.Items).getAll();

            function processData(data: any) {
                const insert = request.result.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items);
                let names = data.names.map((n: any) => ({name: n.name, language: n.language.name}));
                // const itemData = {
                //     attributes: data.attributes.map((a: any) => (a?.name)),
                //     category: data.category?.name,
                //     ...(data.baby_trigger_for?.url && {baby_trigger_for: trimUrl(data.baby_trigger_for?.url)}),
                //     ...(data.cost && {cost: data.cost}),
                //     effect_entries: data.effect_entries.map((eE: any) => (eE.language?.name === "en" ? {effect:eE?.effect,short_effect:eE?.short_effect} : undefined)).filter(Boolean)[0] ?? null,
                //     flavor_text_entries: data.flavor_text_entries.reduce((acc: any, fTE: any) => {
                //         if (fTE.language?.name === "en") {
                //             acc.push({ text: fTE.text, version: fTE.version_group.name })
                //         }
                //         return acc
                //     }, []),
                //     ...(data.fling_effect?.name && {fling_effect: data.fling_effect?.name}),
                //     ...(data.fling_power && {fling_power: data.fling_power}),
                //     machines: data.machines?.map((m: any) => ({machine:trimUrl(m.url), version: m.version_group.name})),
                //     name: data.name,
                //     names: names.length > 1 ? names : [{name: data.name, language: "en" }],
                //     ...(data.sprites?.default && { sprites: data.sprites?.default })
                // }
            }

            itemList.onsuccess = () => {
                const dbCount = itemList.result.length;
                validateDatabase(db, dbCount).then(valid => {
                    if (valid) {
                        result(itemList.result)
                    } else {
                        fetch(`${BASE_API_URL_ITEM}`).then(res => {
                            return errorCheck(res);
                        }).then(async res => {
                            return fetch(`${BASE_API_URL_ITEM}?offset=0&limit=${res.count}`).then(res=>{return errorCheck(res);});
                        }).then(async res => {
                            // doBatchProcess(res.results.map((r: any)=>(r.url)), processData).then(res => {
                                
                            // })
            
            
                            
            
            
            
                            // Promise.all(res.results.slice(0, 1000).map((item: any) => {
                            //     return fetch(item.url).then(res => {
                            //         return errorCheck(res);
                            //     })
                            // })).then(res => {
            
                                
                                
                            
                        })



                        // fetchAllItems().then(res => {
                            // let itemTx = db.transaction(Stores.Items, 'readwrite');
                            // if (res) {
                            //     console.log(res);
                            //     res.forEach(([id, item]) => {
                            //         let itemData = itemTx.objectStore(Stores.Items).get(id);
                            //         itemData.onsuccess = () => {
                            //             if (!itemData.result) {
                            //                 itemTx.objectStore(Stores.Items).put(item, id);
                            //             }
                            //         }
                            //     });
                            //     itemTx.oncomplete = () => {
                            //         updateValidator(Object.keys(res).length)
                            //     }
                            // }
                            // result(res);
                        // })
                    }
                });
            }
        }
    })
}

function fetchItemData(id: string): Promise<ItemData | null> {
    return new Promise(result => {
        fetch(`${BASE_API_URL_ITEM}/${id}`).then(res => {
            if (!res.ok) throw new Error("Failed to fetch data from API");
    
            return res.json();
        }).then(res => {
            let names = res.names.map((n: any) => ({name: n.name, language: n.language.name}));
            const itemData = {
                attributes: res.attributes.map((a: any) => (a?.name)),
                ...(res.baby_trigger_for?.url && {baby_trigger_for: trimUrl(res.baby_trigger_for?.url)}),
                category: res.category?.name,
                ...(res.cost && {cost: res.cost}),
                effect_entries: res.effect_entries.map((eE: any) => (eE.language?.name === "en" ? {effect:eE?.effect,short_effect:eE?.short_effect} : undefined)).filter(Boolean)[0] ?? null,
                flavor_text_entries: res.flavor_text_entries.reduce((acc: any, fTE: any) => {
                    if (fTE.language?.name === "en") {
                        acc.push({ text: fTE.text, version: fTE.version_group.name })
                    }
                    return acc
                }, []),
                ...(res.fling_effect?.name && {fling_effect: res.fling_effect?.name}),
                ...(res.fling_power && {fling_power: res.fling_power}),
                machines: res.machines?.map((m: any) => ({machine:trimUrl(m.url), version: m.version_group.name})),
                name: res.name,
                names: names.length > 1 ? names : [{name: res.name, language: "en" }],
                ...(res.sprites?.default && { sprites: res.sprites?.default })
            }
            result(itemData);
        }).catch(err => {
            result(null)
        })
    })    
}

export async function getItemSprite(id: string): Promise<{name: string, url: string}> {
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
                            if (res) {
                                result({name: res.names.find(n => (n.language === "en"))?.name ?? res.names[0].name, url: res.sprites ?? "" });
                            } else {
                                result({name: "", url: ""})
                            }
                        })
                    }
                }

            } else {
                fetchItemData(id).then(res => {
                    if (res) {
                        result({name: res.names.find(n => (n.language === "en"))?.name ?? res.names[0].name, url: res.sprites ?? "" });
                    } else {
                        result({name: "", url: ""})
                    }
                });
            }
        }
    })
}