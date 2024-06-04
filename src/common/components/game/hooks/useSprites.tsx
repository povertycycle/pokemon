import { useEffect, useState } from "react"
import { getVarietySprite } from "../database/pokemonDB";
import { getItemSprite } from "../database/itemsDB";

export const useSprites = (type: "item" | "species", id?: string) => {
    const [name, setName] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            (() => {
                switch (type) {
                    default:
                    case "species":
                        return getVarietySprite(id);
                    case "item":
                        return getItemSprite(id);
                }
            })()?.then(res => {
                if (res && name !== res.name) {
                    setName(res.name);
                    setUrl(res.url);
                }
            })
        }
    }, [id, type]);
    return { name, url };
}