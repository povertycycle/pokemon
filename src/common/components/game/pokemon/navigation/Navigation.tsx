import { Pokemon } from "../../interface";
import { CONTAINER_ID, NAV_ID, OptionTag } from "../constants";
import { useRef, memo } from "react";
import List from "./List";
import Searchbar from "./Searchbar";
import Sorter from "./Sorter";
import TypeFilter from "./TypeFilter";

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

const Navigation = memo(({ pokemons }: NavigationProps) => {
    console.log("RENDER NAVIGATION");
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

    }

    return (
        <div id={NAV_ID} className="transition-width h-full" style={{ width: "25%" }}>
            <div className="w-full h-full flex flex-col gap-4 relative p-4 duration-500">
                <h3 className="text-[2rem] leading-[2rem] p-1">Pokémons</h3>
                <Searchbar search={search} />
                <div className="w-full flex gap-2 h-[32px] z-[1] relative">
                    <TypeFilter filter={filter} toggle={toggle} />
                    <Sorter sort={sort} />
                </div>
                <List pokemons={pokemons} />
            </div>
        </div>
    )
})

export default Navigation;