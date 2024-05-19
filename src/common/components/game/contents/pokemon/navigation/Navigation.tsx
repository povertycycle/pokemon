import { COMPARATOR, CONTAINER_ID, NAV_ID, NAV_WIDTH, OptionTag } from "../constants";
import { useRef, memo, SetStateAction, Dispatch } from "react";
import styles from "./animation.module.scss";
import Searchbar from "./Searchbar";
import TypeFilter from "./TypeFilter";
import Sorter from "./Sorter";
import List from "./List";
import { Pokemon } from "../interfaces/pokemon";

type FilterRef = {
    name?: string,
    logic: boolean,
    typeOne?: string,
    typeTwo?: string,
    sort?: OptionTag,
}

type NavigationProps = {
    pokemons: Pokemon[],
    pokemon: string | null,
    setPokemon: Dispatch<SetStateAction<string | null>>
}

function typeIsCorrect(types: string[], logic: boolean, first?: string, second?: string): boolean {
    return (
        logic ?
            types.some(type => (type.toLowerCase().includes(first?.toLowerCase() || ""))) || types.some(type => (type.toLowerCase().includes(second?.toLowerCase() || ""))) :
            types.some(type => (type.toLowerCase().includes(first?.toLowerCase() || ""))) && types.some(type => (type.toLowerCase().includes(second?.toLowerCase() || "")))
    )
}

const Navigation = memo(({ pokemons, pokemon, setPokemon }: NavigationProps) => {
    const filterRef = useRef<FilterRef>({ logic: false });

    const doFilter = () => {
        document.getElementById(CONTAINER_ID)?.childNodes?.forEach(div => {
            const pName = div.firstChild?.textContent?.toLowerCase().includes(filterRef.current.name?.toLowerCase() || "");
            const pTypes = Object.entries(div.lastChild?.childNodes ?? {}).map(node => (node[1].textContent || ""))
            if (pName && typeIsCorrect(pTypes, filterRef.current.logic, filterRef.current.typeOne, filterRef.current.typeTwo)) {
                (div as HTMLDivElement).style.display = "";
            } else {
                (div as HTMLDivElement).style.display = "none";
            }
        })
    }

    const search = (pokemon: string) => {
        filterRef.current.name = pokemon;
        doFilter();
    }

    const filter = (type: string | null, section: 0 | 1) => {
        if (section) {
            filterRef.current.typeTwo = type || ""
        } else {
            filterRef.current.typeOne = type || ""
        }
        doFilter();
    }

    const toggle = (logic: boolean) => {
        filterRef.current.logic = logic;
        doFilter();
    }

    const sort = (option: OptionTag) => {
        filterRef.current.sort = option;
        const list = document.getElementById(CONTAINER_ID);
        if (list) {
            [...list.children]
                .sort(COMPARATOR[option])
                .forEach(node => list.appendChild(node));
        }
    }

    return (
        <div id={NAV_ID} className={`${styles.navAnimation} overflow-hidden transition-width h-full duration-500`} style={{ width: `${NAV_WIDTH}%` }}>
            <div className="w-full h-full flex flex-col gap-4 relative p-4">
                <h3 className="text-[1.75rem] leading-6 p-1">Pokémons</h3>
                <div className="w-full flex flex-col gap-2">
                    <Searchbar search={search} />
                    <div className="w-full flex gap-1 h-[28px] z-[1] relative">
                        <TypeFilter filter={filter} toggle={toggle} />
                        <Sorter sort={sort} />
                    </div>
                </div>
                <List pokemons={pokemons} pokemon={pokemon} setPokemon={setPokemon} />
            </div>
        </div>
    )
})

export default Navigation;