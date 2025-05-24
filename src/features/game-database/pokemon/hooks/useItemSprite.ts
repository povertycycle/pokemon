import { GITHUB_ITEM_PATH } from "@/constants/game/urls";
import { useEffect, useState } from "react";
import { getItemName } from "../database/item";

/**
 * Hook to get item sprite data
 * @param id Item id
 */
export const useItemSprite = (id?: number) => {
    const [name, setName] = useState<string | null>();

    useEffect(() => {
        if (!!id) {
            getItemName(id)
                .then((res) => {
                    setName(res);
                })
                .catch((err) => {
                    setName(null);
                });
        } else {
            setName(null);
        }
    }, []);

    return {
        name: name?.replaceAll("-", " "),
        sprite: !!name ? `${GITHUB_ITEM_PATH}/${name}.png` : undefined,
    };
};
