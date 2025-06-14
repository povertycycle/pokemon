import { Unavailable } from "@/components/errors/Unavailable";
import { Spinner } from "@/components/loaders/Spinner";
import { BASE_API_URL_ITEM } from "@/constants/game/urls";
import { useEffect, useState } from "react";
import { getAllItems } from "./database/items";
import { ItemRequest } from "./interfaces/items";
import { ItemList } from "./ItemList";

/**
 * Database root component to display list of items
 */
export const Database: React.FC = () => {
    const [items, setItems] = useState<ItemRequest[] | null>();

    useEffect(() => {
        getAllItems()
            .then((res) => {
                setItems(res.sort((a, b) => a.id - b.id));
            })
            .catch((err) => {
                setItems(null);
            });
    }, []);

    return (
        <div
            className={`relative w-full h-full overflow-hidden flex items-center justify-center top-0 `}
        >
            {items === undefined ? (
                <Spinner />
            ) : items === null || items.length === 0 ? (
                <Unavailable url={BASE_API_URL_ITEM} />
            ) : (
                <ItemList items={items} />
            )}
        </div>
    );
};
