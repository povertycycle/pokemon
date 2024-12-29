import FetchScroller from "@/common/components/_utils/FetchScroller";
import { PokemonCard } from "@/common/interfaces/pokemon";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import Pokemon from "./Pokemon";
import { useSearchParams } from "next/navigation";
import { NAME_QUERY } from "@/common/constants/main";

type DisplayProps = {
    pokemons: PokemonCard[];
    back: () => void;
}

const Display: React.FC<DisplayProps> = ({ pokemons, back }) => {
    const query = useSearchParams()?.get(NAME_QUERY);
    const [activeList, setActiveList] = useState<PokemonCard[]>(
        query ?
            pokemons.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
            pokemons
    );
    const scrollRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<{
        name: string;
        type: string;
    }>({ name: query ?? "", type: "" });

    const doFilter = () => {
        const nameFilter = filterRef.current.name.toLowerCase();
        const typeFilter = filterRef.current.type.toLowerCase();
        if (!!!nameFilter && !!!typeFilter) {
            setActiveList(pokemons);
        } else {
            setActiveList(pokemons.filter(p => (
                p.name.toLowerCase().includes(nameFilter)) &&
                p.types.some(t => t.toLowerCase().includes(typeFilter))
            ))
        }
    }

    function resetScroll() {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: 0, behavior: "instant" })
        }
    }

    function filterByName(value: string) {
        filterRef.current.name = value;
        doFilter();
        resetScroll();
    }

    function filterByType(type: string) {
        filterRef.current.type = type;
        doFilter();
        resetScroll();
    }

    return (
        <div className="w-full h-full flex flex-col">
            <Filter defaultQuery={{ name: query }} filterByName={filterByName} filterByType={filterByType} back={back} />
            <PokemonList ref={scrollRef} list={activeList} />
        </div>
    )
}

export default Display;

const PokemonList: React.FC<{ list: PokemonCard[]; ref: RefObject<HTMLDivElement> }> = ({ list, ref }) => {
    const MAX_DISPLAY = useRef<number>(0);
    const [display, setDisplay] = useState<PokemonCard[]>([]);

    useEffect(() => {
        if (window.innerWidth < 640) {
            MAX_DISPLAY.current = 12;
        } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
            MAX_DISPLAY.current = 16;
        } else {
            MAX_DISPLAY.current = 20;
        }
    }, []);

    useEffect(() => {
        setDisplay(list.slice(0, MAX_DISPLAY.current));
    }, [list])

    function fetchNext() {
        setDisplay(prev => prev.concat(list.slice(prev.length, prev.length + MAX_DISPLAY.current)));
    }

    return (
        <FetchScroller ref={ref} hasNext={display.length < list.length} fetchNext={fetchNext}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 sm:p-4">
                {
                    display.map(pokemon => (
                        <Pokemon pokemon={pokemon} key={pokemon.name} />
                    ))
                }
            </div>
        </FetchScroller>
    )
}
