import { Pokemon } from "../../interface";
import { CONTAINER_ID, NAV_ID } from "../constants";
import { useRef } from "react";
import List from "./List";
import Searchbar from "./Searchbar";
import Sorter from "./Sorter";
import TypeFilter from "./TypeFilter";
import Logic from "./Logic";

type FilterRef = {
    name?: string,
    logic: boolean,
    typeOne?: string,
    typeTwo?: string,
}

type NavigationProps = {
    pokemons: Pokemon[]
}

function typeIsCorrect(types: string[], logic: boolean, first?: string, second?: string): boolean {
    return (
        logic ?
            types.some(type => (type.toLowerCase().includes(first?.toLowerCase() || ""))) || types.some(type => (type.toLowerCase().includes(second?.toLowerCase() || ""))) :
            types.some(type => (type.toLowerCase().includes(first?.toLowerCase() || ""))) && types.some(type => (type.toLowerCase().includes(second?.toLowerCase() || "")))
    )
}

const Navigation: React.FC<NavigationProps> = ({ pokemons }) => {
    const filterRef = useRef<FilterRef>({ logic: false });

    const doFilter = () => {
        const container: HTMLElement | null = document.getElementById(CONTAINER_ID);
        const pokemons = container?.childNodes;
        if (pokemons) {
            pokemons.forEach(div => {
                const pokemonName = div.firstChild;
                const pokemonTypes = div.lastChild?.childNodes;
                if (!pokemonName || !pokemonTypes) return;
                if (
                    pokemonName.textContent?.toLowerCase().includes(filterRef.current.name || "") &&
                    typeIsCorrect(Object.entries(pokemonTypes).map(child => (child[1].textContent || "")), filterRef.current.logic, filterRef.current.typeOne, filterRef.current.typeTwo)
                ) {
                    (div as HTMLDivElement).style.display = "";
                } else {
                    (div as HTMLDivElement).style.display = "none";
                }
            })
        }
    }

    const searchPokemon = (pokemon: string) => {
        filterRef.current.name = pokemon;
        doFilter();
    }

    const filterByType = (type: string | null, section: 0 | 1) => {
        if (section) {
            filterRef.current.typeTwo = type || ""
        } else {
            filterRef.current.typeOne = type || ""
        }
        doFilter();
    }

    const toggleLogic = (logic: boolean) => {
        filterRef.current.logic = logic;
        doFilter();
    }

    return (
        <div id={NAV_ID} className="transition-width h-full flex flex-col p-4 gap-4 relative duration-500" style={{ width: "25%" }}>
            <h3 className="text-[2rem] leading-[2rem] p-1">Pokémons</h3>
            <Searchbar searchPokemon={searchPokemon} />
            <div className="w-full flex gap-2 h-[32px]">
                <Logic logic={filterRef.current.logic} toggleLogic={toggleLogic} />
                <TypeFilter filterByType={filterByType} />
                <Sorter />
            </div>
            <List pokemons={pokemons} />
        </div>
    )
}

export default Navigation;