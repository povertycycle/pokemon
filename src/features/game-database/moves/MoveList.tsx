import { InfiniteScroll } from "@/components/loaders/InfiniteScroll";
import { NAME_QUERY } from "@/constants/game/main";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Filter } from "./components/Filter";
import { DetailDisplay } from "./DetailsDisplay";
import { MoveRequest } from "./interfaces/moves";

interface MoveListProps {
    moves: MoveRequest[];
}

/**
 * Move list display
 *
 * @param moves List of Moves data
 */
export const MoveList: React.FC<MoveListProps> = ({ moves }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const nameQuery = useSearchParams()?.get(NAME_QUERY);
    const [filter, setFilter] = useState<string>(nameQuery ?? "");
    const filteredList = filter
        ? moves.filter((moves) =>
              moves.name.toLowerCase().includes(filter.toLowerCase())
          )
        : moves;

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
 * Move list
 */
const Body: React.FC<{ pool: MoveRequest[] }> = ({ pool }) => {
    const [details, setDetails] = useState<MoveRequest | null>(null);
    return (
        <div className="w-full mx-auto max-w-screen-xl flex gap-0.5">
            <List list={pool} setDetails={setDetails} />
            <DetailDisplay details={details} setDetails={setDetails} />
        </div>
    );
};

/**
 * Move list display component
 *
 * @param list Move list filtered
 */
const List: React.FC<{
    list: MoveRequest[];
    setDetails: (details: MoveRequest) => void;
}> = ({ list, setDetails }) => {
    const FETCH_SIZE = 36;
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
            <div className="w-full flex flex-col text-sm gap-0.5 tracking-wide">
                {list.slice(0, page * FETCH_SIZE).map((move) => (
                    <div
                        key={move.id}
                        onClick={() => setDetails(move)}
                        className="cursor-pointer py-1.5 px-2.5 sm:hover:-translate-x-2 rounded-sm sm:hover:bg-white/80 transition-transform flex items-center gap-4 bg-white"
                    >
                        <span className="capitalize">
                            {move.name.replaceAll("-", " ")}
                        </span>
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    );
};
