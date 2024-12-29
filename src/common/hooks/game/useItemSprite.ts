import { GITHUB_ITEM_PATH } from "@/common/constants/urls";
import { getItemName } from "@/database/items-db";
import { useEffect, useState } from "react";

export const useItemSprite = (id?: string) => {
    const [name, setName] = useState<string | null>();

    useEffect(() => {
        if (!!id) {
            getItemName(id).then(res => {
                setName(res);
            }).catch(err => {
                console.error(err);
                setName(null);
            })
        }
    }, []);

    return {
        name: name,
        sprite: !!name ? `${GITHUB_ITEM_PATH}/${name}.png` : undefined
    }
}