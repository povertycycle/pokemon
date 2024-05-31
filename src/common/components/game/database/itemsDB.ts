import { trimUrl } from "@/common/utils/trimUrl";
import { cacheIsAllowed } from "../../home/cache/utils";
import { BASE_API_URL_ITEM } from "../constants";
import { POKEMON_DB, Stores } from "./db";

type ItemData = {
    attributes: string[]
    baby_trigger_for?: string,
    category: string,
    cost?: number,
    effect_entries: { effect: string, short_effect: string },
    flavor_text_entries: { text: string, version: string }[],
    fling_effect?: string,
    fling_power?: number,
    machines: {machine: string, version: string}[],
    names: {name: string, language: string}[],
    sprites: string,
}

export async function getItemSprite(id: string): Promise<{name: string, url: string}> {
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
                    effect_entries: res.effect_entries.map((eE: any) => (eE.language?.name === "en" ? {effect:eE.effect,short_effect:eE.short_effect} : undefined)).filter(Boolean)[0] ?? null,
                    flavor_text_entries: res.flavor_text_entries.reduce((acc: any, fTE: any) => {
                        if (fTE.language?.name === "en") {
                            acc.push({ text: fTE.text, version: fTE.version_group.name })
                        }
                        return acc
                    }, []),
                    ...(res.fling_effect?.name && {fling_effect: res.fling_effect?.name}),
                    ...(res.fling_power && {fling_power: res.fling_power}),
                    machines: res.machines?.map((m: any) => ({machine:trimUrl(m.url), version: m.version_group.name})),
                    names: names.length > 1 ? names : [{name: res.name, language: "en", sprites: res.sprites?.default }],
                    sprites: res.sprites?.default
                }
                result(itemData);
            }).catch(err => {
                result(null)
            })
        })    
    }

    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const itemsTx = db.transaction(Stores.Items, 'readonly');

            if (cacheIsAllowed()) {
                const itemData = itemsTx.objectStore(Stores.Items).get(id);
                
                itemData.onsuccess = () => {
                    if (itemData.result) {
                        result({name: itemData.result.names.find((n: any) => (n.language === "en"))?.name ?? itemData.result.names[0].name, url: itemData.result.sprites });
                    } else {
                        fetchItemData(id).then(res => {
                            db.transaction(Stores.Items, 'readwrite').objectStore(Stores.Items).put(res, id);
                            if (res) {
                                result({name: res.names.find(n => (n.language === "en"))?.name ?? res.names[0].name, url: res.sprites });
                            } else {
                                result({name: "", url: ""})
                            }
                        })
                    }
                }

            } else {
                fetchItemData(id).then(res => {
                    if (res) {
                        result({name: res.names.find(n => (n.language === "en"))?.name ?? res.names[0].name, url: res.sprites });
                    } else {
                        result({name: "", url: ""})
                    }
                });
            }
        }
    })
}