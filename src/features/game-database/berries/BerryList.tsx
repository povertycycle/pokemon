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
    const [display, setDisplay] = useState<BerryRequest[]>([]);

    useEffect(() => {
        setDisplay(list.slice(0, FETCH_SIZE));
    }, [list]);

    function fetchNext() {
        setDisplay((prev) =>
            prev.concat(list.slice(prev.length, prev.length + FETCH_SIZE))
        );
    }

    return (
        <InfiniteScroll
            hasNext={display.length < list.length}
            fetchNext={fetchNext}
        >
            <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-2 sm:py-2 sm:px-3">
                {display.map((berry) => (
                    <BerryCard {...berry} key={berry.id} />
                ))}
            </div>
        </InfiniteScroll>
    );
};
