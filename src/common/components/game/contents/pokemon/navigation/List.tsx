import styles from "@/common/styles/custom.module.scss";
import { Dispatch, memo, SetStateAction } from "react";
import { CONTAINER_ID } from "../constants";
import { Pokemon } from "../interfaces/pokemon";
import { isDark } from "@/common/utils/colors";
import { capitalize } from "@/common/utils/capitalize";
import { TYPE_COLORS } from "../types/constants";

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

const List: React.FC<{ pokemons: Pokemon[], pokeId: string | null, setPokeId: Dispatch<SetStateAction<string | null>> }> = ({ pokeId, setPokeId, pokemons }) => {
    return (
        <div id={CONTAINER_ID} className={`${styles.overflow} h-0 bg-base-white grow w-full flex flex-col gap-1 text-base leading-4 overflow-y-scroll overflow-x-hidden shadow-[inset_0_0_4px_black] rounded-tl-[16px] rounded-bl-[4px] rounded-r-[4px]`}>
            {
                pokemons.map((p: Pokemon, i: number) => (
                    <Option key={i} p={p} pokeId={pokeId} setPokeId={setPokeId} />
                ))
            }
        </div>
    )
}

const Option = memo(({ p, pokeId, setPokeId }: { p: Pokemon, pokeId: string | null, setPokeId: Dispatch<SetStateAction<string | null>> }) => {
    return (
        <div data-name={p.name} data-id={p.id} data-index={p.index} onClick={() => { if (pokeId !== p.id) setPokeId(p.id) }} className={`w-full shrink-0 flex items-center cursor-pointer relative ${pokeId === p.id ? "bg-black/10" : "hover:bg-black/10"} transition-colors px-4 py-2`}>
            <div className="w-full h-full flex items-center tracking-[1px]">
                {displayPokemonName(p.name, p.species)}
            </div>
            <div className="absolute right-0 flex gap-1 p-2 text-[0.75rem] h-full">
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

function arePropsEqual(a: { p: Pokemon, pokeId: string | null, setPokeId: Dispatch<SetStateAction<string | null>> }, b: { p: Pokemon, pokeId: string | null, setPokeId: Dispatch<SetStateAction<string | null>> }) {
    return !(a.pokeId === a.p.id) && !(b.pokeId === b.p.id)
}

export default List;