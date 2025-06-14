import { InfiniteScroll } from "@/components/loaders/InfiniteScroll";
import { NAME_QUERY } from "@/constants/game/main";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ItemRequest } from "./interfaces/items";
import { Filter } from "./components/Filter";
import { GITHUB_ITEM_PATH } from "@/constants/game/urls";
import { DetailDisplay } from "./DetailDisplay";

interface ItemListProps {
    items: ItemRequest[];
}

/**
 * Items list display
 *
 * @param items List of Items data
 */
export const ItemList: React.FC<ItemListProps> = ({ items }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const nameQuery = useSearchParams()?.get(NAME_QUERY);
    const [filter, setFilter] = useState<string>(nameQuery ?? "");
    const filteredList = filter
        ? items.filter((item) =>
              item.name.toLowerCase().includes(filter.toLowerCase())
          )
        : items;

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [filter]);

    return (
        <div
            ref={scrollRef}
            className="w-full h-full flex flex-col overflow-y-scroll"
        >
            <Filter filter={filter} setFilter={setFilter} />
            <Body pool={filteredList} />
        </div>
    );
};

/**
 * Item list
 */
const Body: React.FC<{ pool: ItemRequest[] }> = ({ pool }) => {
    const [details, setDetails] = useState<ItemRequest | null>(null);

    return (
        <div className="w-full mx-auto max-w-screen-xl flex gap-0.5">
            <List list={pool} setDetails={setDetails} />
            <DetailDisplay details={details} setDetails={setDetails} />
        </div>
    );
};

/**
 * Item list display component
 *
 * @param list Item list filtered
 */
const List: React.FC<{
    list: ItemRequest[];
    setDetails: (details: ItemRequest) => void;
}> = ({ list, setDetails }) => {
    const FETCH_SIZE = 24;
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        setPage(1);
    }, [list]);

    const fetchNext = () => {
        setPage((prev) => prev + 1);
    };

    return (
        <InfiniteScroll
            hasNext={page * FETCH_SIZE < list.length}
            fetchNext={fetchNext}
        >
            <div className="w-full flex flex-col text-sm gap-0.5">
                {list.slice(0, page * FETCH_SIZE).map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setDetails(item)}
                        className="cursor-pointer sm:hover:-translate-x-2 rounded-sm sm:hover:bg-white/80 transition-transform flex py-0.5 pl-1.5 pr-2.5 items-center gap-4 bg-white"
                    >
                        <ItemRow {...item} />
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
};

const ItemRow: React.FC<{ id: number; name: string }> = ({ id, name }) => {
    return (
        <>
            <div className="h-9 w-9 shrink-0">
                {name && (
                    <img
                        alt=""
                        className="h-full w-full"
                        src={`${GITHUB_ITEM_PATH}/${name}.png`}
                    />
                )}
            </div>
            <span className="capitalize">{name.replaceAll("-", " ")}</span>
        </>
    );
};
