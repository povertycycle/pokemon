import { InfiniteScroll } from "@/components/loaders/InfiniteScroll";
import { NAME_QUERY } from "@/constants/game/main";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BerryCard } from "./components/BerryCard";
import { Filter } from "./components/Filters";
import { BerryRequest } from "./interfaces/berries";

interface BerryList {
    berries: BerryRequest[];
}

/**
 * Pokemon list display
 *
 * @param berries List of pokemon data
 */
export const BerryList: React.FC<BerryList> = ({ berries }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const nameQuery = useSearchParams()?.get(NAME_QUERY);
    const [filter, setFilter] = useState<string>(nameQuery ?? "");
    const filteredList = filter
        ? berries.filter((berry) =>
              berry.name.toLowerCase().includes(filter.toLowerCase())
          )
        : berries;

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [filter]);

    return (
        <div
            ref={scrollRef}
            className="w-full h-full flex flex-col overflow-y-scroll"
        >
            <Filter filter={filter} setFilter={setFilter} />
            <List list={filteredList} />
        </div>
    );
};

/**
 * Berries list display component
 *
 * @param list Berries list filtered
 */
const List: React.FC<{ list: BerryRequest[] }> = ({ list }) => {
    const FETCH_SIZE = 12;
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
            <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-2 sm:py-2 sm:px-3">
                {list.slice(0, page * FETCH_SIZE).map((berry) => (
                    <BerryCard {...berry} key={berry.id} />
                ))}
            </div>
        </InfiniteScroll>
    );
};
