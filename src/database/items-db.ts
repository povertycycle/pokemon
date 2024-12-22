import { Stores } from "@/common/constants/enums";
import { POKEMON_DB } from "@/common/constants/main";
import { ItemData, ItemDataMini } from "@/common/interfaces/item";
import { trimUrl } from "@/common/utils/string";
import { PokeAPIResponse } from "./_utils";

export async function updateItemDatabase(items: PokeAPIResponse): Promise<number> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const insertTx = request.result.transaction(Stores.Items, 'readwrite');
            const insert = insertTx.objectStore(Stores.Items);
            items.results.forEach(item => {
                insert.put({ name: item.name }, trimUrl(item.url))
            })

            insertTx.oncomplete = () => {
                result(items.count);
            }
        }
    })
}

export async function getItemSprite(id: string): Promise<ItemDataMini | null> {
    return new Promise(resolve => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            const itemTx = request.result.transaction(Stores.Items, 'readonly').objectStore(Stores.Items).get(id);
            itemTx.onsuccess = () => {
                const data = itemTx.result as ItemData;
                resolve({ name: data.name });
            }
            itemTx.onerror = () => {
                resolve(null);
            }
        }
    })
}

// function generateItemData(data: any) {
//     let n = data.names.map((n: any) => ({ name: n.name, language: n.language.name }));
//     let e = data?.effect_entries.map((eE: any) => (eE.language?.name === "en" ? eE?.effect : undefined)).filter(Boolean)[0] ?? null
//     let a = data.attributes.map((a: any) => (a?.name));
//     let f = data?.flavor_text_entries?.filter((fTE: any) => (fTE.language.name === "en"))?.at(-1)?.text;
//     let g = data?.flavor_text_entries?.reduce((acc: string[], fTE: any) => { let v = fTE?.version_group?.name; if (!acc.includes(v)) acc.push(v); return acc; }, []);
//     (data?.machines?.map((m: any) => (m.version_group.name))).forEach((v: any) => { if (!g.includes(v)) g.push(v); })

//     return {
//         category: data?.category?.name ?? "uncategorized",
//         name: data.name,
//         ...(a.length > 0 && { attributes: a }),
//         ...(data.baby_trigger_for?.url && { baby_trigger_for: trimUrl(data.baby_trigger_for?.url) }),
//         ...(data.cost && { cost: data.cost }),
//         ...(f && { flavor_text: f }),
//         ...(e && { effect: e }),
//         ...(data?.fling_effect?.name && { fling_effect: data.fling_effect?.name }),
//         ...(data?.fling_power && { fling_power: data.fling_power }),
//         ...(n.length > 0 && { names: n }),
//         ...(data?.sprites?.default && { sprites: data?.sprites?.default }),
//         ...(g.length > 0 && { games: g })
//     }
// }
// async function validateDatabase(db: IDBDatabase, count: number): Promise<boolean> {
//     return new Promise((res, rej) => {
//         const validator = db.transaction(Stores.Validator, 'readonly').objectStore(Stores.Validator).get(ITEMS_VALIDATOR_KEY);
//         validator.onsuccess = () => { res(validator?.result?.count !== undefined && count === validator.result.count); }
//         validator.onerror = () => { rej("Failed to validate database...") }
//     })
// }
// export async function getAllItems(): Promise<any[] | null> {
//     return new Promise(result => {
//         const request = indexedDB.open(POKEMON_DB);

//         request.onsuccess = () => {
//             let db: IDBDatabase = request.result;
//             const itemTx = db.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items);
//             const itemList = itemTx.getAll();

//             function processData(data: any) {
//                 const insert = request.result.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items);
//                 let itemData = generateItemData(data);
//                 insert.put(itemData, String(data.id));
//             }

//             itemList.onsuccess = () => {
//                 const dbCount = itemList.result.length;
//                 let newCount: number;
//                 validateDatabase(db, dbCount).then(valid => {
//                     if (valid) {
//                         result(itemList.result)
//                     } else {
//                         fetch(`${BASE_API_URL_ITEM}`).then(res => {
//                             return errorCheck(res);
//                         }).then(async res => {
//                             newCount = res.count;
//                             return fetch(`${BASE_API_URL_ITEM}?offset=0&limit=${res.count}`).then(res => { return errorCheck(res); });
//                         }).then(async res => {
//                             let exists = db.transaction(Stores.Items, 'readonly').objectStore(Stores.Items).getAllKeys();
//                             exists.onsuccess = () => {
//                                 let k = exists.result;
//                                 doBatchProcess(res.results.map((r: any) => (r.url)).filter((u: any) => !k.includes(trimUrl(u))), processData).then(res => {
//                                     if (res) updateValidator(newCount).then(updateRes => {
//                                         if (updateRes) {
//                                             let items = db.transaction(Stores.Items, 'readonly').objectStore(Stores.Items).getAll();
//                                             items.onsuccess = () => { result(items.result) }
//                                         }
//                                     })
//                                 })
//                             }
//                         })
//                     }
//                 });
//             }
//         }
//     })
// }

// function fetchItemData(id: string): Promise<ItemData | null> {
//     return new Promise(result => {
//         fetch(`${BASE_API_URL_ITEM}/${id}`).then(res => errorCheck(res)).then(res => {
//             let itemData = generateItemData(res);
//             result(itemData);
//         }).catch(err => {
//             result(null)
//         })
//     })
// }

// export async function getItemSprite(id: string): Promise<{ name: string, url: string } | null> {
//     return new Promise(result => {
//         const request = indexedDB.open(POKEMON_DB);

//         request.onsuccess = () => {
//             let db: IDBDatabase = request.result;
//             const itemsTx = db.transaction(Stores.Items, 'readonly');

//             if (cacheIsAllowed()) {
//                 const itemData = itemsTx.objectStore(Stores.Items).get(id);

//                 itemData.onsuccess = () => {
//                     if ((itemData.result?.names?.length ?? 0) > 0) {
//                         result({ name: itemData.result.names.find((n: any) => (n.language === "en"))?.name ?? itemData.result.names[0].name, url: itemData.result.sprites });
//                     } else {
//                         fetchItemData(id).then(res => {
//                             let name = res?.names?.find(n => n.language === "en")?.name ?? capitalize(res?.name);
//                             let url = res?.sprites;
//                             if (res) {
//                                 db.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items).put(res, id);

//                             }
//                             if (name && url) {
//                                 result({ name, url })
//                             } else {
//                                 result(null);
//                             }
//                         })
//                     }
//                 }

//             } else {
//                 fetchItemData(id).then(res => {
//                     let name = res?.names?.find(n => n.language === "en")?.name ?? capitalize(res?.name);
//                     let url = res?.sprites;
//                     if (name && url) {
//                         result({ name, url })
//                     } else {
//                         result(null);
//                     }
//                 });
//             }
//         }
//     })
// }


// export async function getItemData(id: string): Promise<ItemData | null> {
//     return new Promise(result => {
//         const request = indexedDB.open(POKEMON_DB);

//         request.onsuccess = () => {
//             let db: IDBDatabase = request.result;
//             const itemsTx = db.transaction(Stores.Items, 'readonly');

//             if (cacheIsAllowed()) {
//                 const itemData = itemsTx.objectStore(Stores.Items).get(id);

//                 itemData.onsuccess = () => {
//                     if (itemData.result) {
//                         result(itemData.result);
//                     } else {
//                         fetchItemData(id).then(res => {
//                             if (res) {
//                                 db.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items).put(res, id);
//                                 result(res)
//                             } else {
//                                 result(null);
//                             }
//                         })
//                     }
//                 }

//             } else {
//                 fetchItemData(id).then(res => {
//                     result(res);
//                 });
//             }
//         }
//     })
// }