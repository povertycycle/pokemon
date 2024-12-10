import FetchScroller from "@/common/components/_utils/FetchScroller";
import { PokemonCard } from "@/common/interfaces/pokemon";
import React, { useEffect, useRef, useState } from "react";
import Filter from "./Filter";
import Pokemon from "./Pokemon";

type DisplayProps = {
    pokemons: PokemonCard[];
    back: () => void;
}

const Display: React.FC<DisplayProps> = ({ pokemons, back }) => {
    const [activeList, setActiveList] = useState<PokemonCard[]>(pokemons);
    const filterRef = useRef<{
        name: string;
        type: string;
    }>({ name: "", type: "" });

    const doFilter = () => {
        let nameFilter = filterRef.current.name.toLowerCase();
        let typeFilter = filterRef.current.type.toLowerCase();
        if (!!!nameFilter && !!!typeFilter) {
            setActiveList(pokemons);
        } else {
            setActiveList(pokemons.filter(p => (
                p.name.toLowerCase().includes(nameFilter)) &&
                p.types.some(t => t.toLowerCase().includes(typeFilter))
            ))
        }
    }

    function filterByName(value: string) {
        filterRef.current.name = value;
        doFilter();
    }

    function filterByType(type: string) {
        filterRef.current.type = type;
        doFilter();
    }

    return (
        <div className="w-full h-full flex flex-col-reverse sm:flex-col">
            <Filter filterByName={filterByName} filterByType={filterByType} back={back} />
            <PokemonList list={activeList} />
        </div>
    )
}

export default Display;

const PokemonList: React.FC<{ list: PokemonCard[] }> = ({ list }) => {
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
        <FetchScroller hasNext={display.length < list.length} fetchNext={fetchNext}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4">
                {
                    display.map((pokemon, i) => (
                        <Pokemon pokemon={pokemon} key={pokemon.name} />
                    ))
                }
            </div>
        </FetchScroller>
    )
}
