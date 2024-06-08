import { useEffect, useState } from "react"
import { getVarietySprite } from "../database/pokemonDB";
import { getItemSprite } from "../database/itemsDB";

export const useSprites = (type: "item" | "species", id?: string | null) => {
    const [name, setName] = useState<string | null | undefined>();
    const [url, setUrl] = useState<string | null | undefined>();

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
                if (name !== res?.name) {
                    setName(res?.name ?? null);
                    setUrl(res?.url ?? null);
                }
            })
        }
    }, [id, type]);
    return { name, url };
}