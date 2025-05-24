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
    const [display, setDisplay] = useState<PokeRequest[]>([]);

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
                {display.map((pokemon) => (
                    <PokemonCard {...pokemon} key={pokemon.id} />
                ))}
            </div>
        </InfiniteScroll>
    );
};
