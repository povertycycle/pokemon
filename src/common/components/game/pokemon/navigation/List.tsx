import { isDark } from "@/common/utils/colors";
import { Pokemon } from "../../interface";
import { CONTAINER_ID, FILTER_TYPE_COLORS } from "../constants";
import styles from "@/common/styles/custom.module.scss";
import { DisplayContext } from "../contexts";
import { useContext } from "react";

function displayPokemonName(name: string) {
    let identifiers = name.split("-");
    return (
        <>
            <span>{identifiers[0].charAt(0).toUpperCase() + identifiers[0].slice(1)}</span>
            {identifiers.slice(1).map((id: string, i: number) => (
                <span className="ml-4 text-[0.875rem] bg-black/10 px-2 rounded-[4px]" key={i}>{id.toUpperCase()}</span>
            ))}
        </>
    )
}

const List: React.FC<{ pokemons: Pokemon[] }> = ({ pokemons }) => {
    const { pokemon, setPokemon } = useContext(DisplayContext);
    return (
        <div id={CONTAINER_ID} className={`${styles.overflow} h-0 grow w-full flex flex-col gap-1 tracking-[1.5px] text-[1.125rem] leading-[1.125rem] overflow-y-scroll shadow-[inset_0_0_4px_black] rounded-[16px]`}>
            {
                pokemons.map((pokemon: Pokemon, i: number) => (
                    <div onClick={() => { setPokemon(pokemon.name) }} key={i} className="w-full shrink-0 flex items-center cursor-pointer relative hover:bg-black/10 transition-colors px-4 py-2">
                        <div className="w-full h-full flex items-center">
                            {displayPokemonName(pokemon.name)}
                        </div>
                        <div className="absolute right-0 flex gap-2 p-2 text-[0.75rem] h-full">
                            {
                                pokemon.types.map((type: string, i: number) => (
                                    <div key={i} className={`rounded-full flex items-center justify-center px-2 h-full shrink-0`} style={{ background: FILTER_TYPE_COLORS[type], color: isDark(FILTER_TYPE_COLORS[type]) ? "white" : "black" }}>
                                        {type.toUpperCase()}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default List;