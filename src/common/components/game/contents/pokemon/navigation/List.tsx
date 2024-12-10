import styles from "@/common/styles/custom.module.scss";
import { Dispatch, memo, SetStateAction } from "react";
import { CONTAINER_ID } from "../constants";
import { isDark } from "@/common/utils/colors";
import { capitalize } from "@/common/utils/capitalize";
import { TYPE_COLORS } from "../../../../../../constants/types";
import { PokemonData } from "@/common/interfaces/pokemon";

function displayPokemonName(name: string, species: string) {
    let identifiers = name.replace(species, "").split("-");

    return (
        <>
            <span>{capitalize(species)}</span>
            {identifiers.slice(1).map((id: string, i: number) => (
                <span className="ml-1 text-[0.875rem] bg-black/10 px-2 rounded-[4px]" key={i}>{id.toUpperCase()}</span>
            ))}
        </>
    )
}

const List: React.FC<{ pokemons: PokemonData[], pokeId: string | null, setPokeId: Dispatch<SetStateAction<string | null>> }> = ({ pokeId, setPokeId, pokemons }) => {
    return (
        <div id={CONTAINER_ID} className={`${styles.overflowGreen} h-0 bg-base-white grow w-full flex flex-col gap-1 text-[0.875rem] leading-4 overflow-y-scroll overflow-x-hidden shadow-[inset_0_0_4px_black] rounded-tl-[16px] rounded-bl-[4px] rounded-r-[4px]`}>
            {
                pokemons.map((p: PokemonData, i: number) => (
                    <Option key={i} p={p} pokeId={pokeId} setPokeId={setPokeId} />
                ))
            }
        </div>
    )
}

const Option = memo(({ p, pokeId, setPokeId }: { p: PokemonData, pokeId: string | null, setPokeId: Dispatch<SetStateAction<string | null>> }) => {
    return (
        <div data-name={p.name} data-index={p.index} onClick={() => { }} className={`w-full shrink-0 flex items-center cursor-pointer relative  transition-colors px-4 py-2`}>
            <div className="w-full h-full flex items-center tracking-[1px]">
                {displayPokemonName(p.name, p.species)}
            </div>
            <div className="absolute right-0 flex gap-1 py-2 pr-1 text-[0.875rem] h-full">
                {
                    p.types.map((type: string, i: number) => (
                        <div key={i} className={`rounded-full flex items-center justify-center px-2 h-full shrink-0`} style={{ background: TYPE_COLORS[type], color: isDark(TYPE_COLORS[type]) ? "white" : "black" }}>
                            {type.toUpperCase()}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}, arePropsEqual)

function arePropsEqual(a: { p: PokemonData, pokeId: string | null, setPokeId: Dispatch<SetStateAction<string | null>> }, b: { p: PokemonData, pokeId: string | null, setPokeId: Dispatch<SetStateAction<string | null>> }) {
    return false
}

export default List;