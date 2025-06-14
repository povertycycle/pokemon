import { InfiniteScroll } from "@/components/loaders/InfiniteScroll";
import { NAME_QUERY } from "@/constants/game/main";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Filter } from "./components/Filter";
import { PokemonCard } from "./components/PokemonCard";
import { PokeRequest } from "./interfaces/pokemon";

interface PokemonListProps {
    pokemons: PokeRequest[];
}

/**
 * Pokemon list display
 *
 * @param pokemons List of pokemon data
 */
export const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const nameQuery = useSearchParams()?.get(NAME_QUERY);
    const [filter, setFilter] = useState<string>(nameQuery ?? "");
    const filteredList = filter
        ? pokemons.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(filter.toLowerCase())
          )
        : pokemons;

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
 * Pokemon list display component
 *
 * @param list Pokemon list filtered
 */
const List: React.FC<{ list: PokeRequest[] }> = ({ list }) => {
    const FETCH_SIZE = 18;
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
                {list.slice(0, page * FETCH_SIZE).map((pokemon) => (
                    <PokemonCard {...pokemon} key={pokemon.id} />
                ))}
            </div>
        </InfiniteScroll>
    );
};
