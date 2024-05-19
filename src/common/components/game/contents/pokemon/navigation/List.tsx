import { isDark } from "@/common/utils/colors";
import { CONTAINER_ID, FILTER_TYPE_COLORS } from "../constants";
import styles from "@/common/styles/custom.module.scss";
import { Dispatch, memo, SetStateAction, useContext } from "react";
import { Pokemon } from "../interfaces/pokemon";

function displayPokemonName(name: string, species: string) {
    let identifiers = name.replace(species, "").split("-");

    return (
        <>
            <span>{species.split("-").map(text => (text.charAt(0).toUpperCase() + text.slice(1))).join(" ")}</span>
            {identifiers.slice(1).map((id: string, i: number) => (
                <span className="ml-1 text-[0.875rem] bg-black/10 px-2 rounded-[4px]" key={i}>{id.toUpperCase()}</span>
            ))}
        </>
    )
}

const List: React.FC<{ pokemons: Pokemon[], pokemon: string | null, setPokemon: Dispatch<SetStateAction<string | null>> }> = ({ pokemon, setPokemon, pokemons }) => {
    return (
        <div id={CONTAINER_ID} className={`${styles.overflow} h-0 bg-base-white grow w-full flex flex-col gap-1 text-base leading-4 overflow-y-scroll shadow-[inset_0_0_4px_black] rounded-tl-[16px] rounded-bl-[4px] rounded-r-[4px]`}>
            {
                pokemons.map((p: Pokemon, i: number) => (
                    <Option key={i} p={p} pokemon={pokemon} setPokemon={setPokemon} />
                ))
            }
        </div>
    )
}

const Option = memo(({ p, pokemon, setPokemon }: { p: Pokemon, pokemon: string | null, setPokemon: Dispatch<SetStateAction<string | null>> }) => {
    return (
        <div data-name={p.name} data-id={p.index} onClick={() => { if (pokemon !== p.name) setPokemon(p.name) }} className={`w-full shrink-0 flex items-center cursor-pointer relative ${pokemon === p.name ? "bg-black/10" : "hover:bg-black/10"} transition-colors px-4 py-2`}>
            <div className="w-full h-full flex items-center tracking-[1px]">
                {displayPokemonName(p.name, p.species)}
            </div>
            <div className="absolute right-0 flex gap-1 p-2 text-[0.75rem] h-full">
                {
                    p.types.map((type: string, i: number) => (
                        <div key={i} className={`rounded-full flex items-center justify-center px-2 h-full shrink-0`} style={{ background: FILTER_TYPE_COLORS[type], color: isDark(FILTER_TYPE_COLORS[type]) ? "white" : "black" }}>
                            {type.toUpperCase()}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}, arePropsEqual)

function arePropsEqual(a: { p: Pokemon, pokemon: string | null, setPokemon: Dispatch<SetStateAction<string | null>> }, b: { p: Pokemon, pokemon: string | null, setPokemon: Dispatch<SetStateAction<string | null>> }) {
    return !(a.pokemon === a.p.name) && !(b.pokemon === b.p.name)
}

export default List;