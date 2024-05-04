import { BASE_API_URL_POKEMON } from "../constants";
import { GenSprites, Sprites, SpritesData } from "../contents/pokemon/interface";
import { POKEMON_DB, Stores } from "./db";

export function fetchSpritesDetails(pokemon: string): Promise<SpritesData | null> {
    return new Promise(result => {
        const request = indexedDB.open(POKEMON_DB);

        request.onsuccess = () => {
            let db: IDBDatabase = request.result;
            const spritesData = db.transaction(Stores.Sprites, 'readonly').objectStore(Stores.Sprites).get(pokemon);

            spritesData.onsuccess = () => {
                if (!spritesData.result) {
                    fetch(`${BASE_API_URL_POKEMON}/${pokemon}`).then(res => {
                        if (!res.ok) {
                            throw new Error("Failed to fecth data")
                        }
                        return res.json();
                    }).then(res => {
                        const insert = db.transaction(Stores.Sprites, 'readwrite');
                        const resSprites = res.sprites;
                        const spritesData = {
                            others: Object.entries(resSprites.other).reduce((acc: Sprites, entries: [string, any]) => {
                                const entry = { [entries[0]]: entries[1].front_default };
                                if (entry) {
                                    acc = { ...acc, ...entry }
                                }
                                return acc
                            }, {}),
                            versions: Object.entries(resSprites.versions).reduce((acc: GenSprites, entries: [string, any]) => {
                                const subSprites = Object.entries(entries[1]).reduce((acc2: Sprites, entries2: [string, any]) => {
                                    return { ...acc2, ...(entries2[1].front_default ? { [entries2[0]]: entries2[1].front_default } : undefined) }
                                }, {});

                                return Object.keys(subSprites).length === 0 ? acc : {
                                    ...acc, [entries[0]]: subSprites
                                }
                            }, {})
                        }
                        if (resSprites.front_default) {
                            spritesData.others["base_default"] = resSprites.front_default
                        }
                        insert.objectStore(Stores.Sprites).put(spritesData, pokemon);
                        insert.oncomplete = () => {
                            result(spritesData);
                        }
                    }).catch(err => {
                        result(null);
                    });
                } else {
                    result(spritesData.result);
                }
            }
        };
    })
}