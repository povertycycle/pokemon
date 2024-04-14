import { isDark } from "@/common/utils/colors";
import { Pokemon } from "../../interface";
import { CONTAINER_ID, FILTER_TYPE_COLORS } from "../constants";
import styles from "@/common/styles/custom.module.scss";

const List: React.FC<{ pokemons: Pokemon[] }> = ({ pokemons }) => {
    return (
        <div id={CONTAINER_ID} className={`${styles.overflow} h-0 grow w-full flex flex-col gap-1 overflow-y-scroll`}>
            {
                pokemons.map((pokemon: Pokemon, i: number) => (
                    <div key={i} className="w-full h-[32px] shrink-0 flex tracking-[1px] justify-between text-[1.125rem] leading-[1.125rem] items-center"
                    // style={{ background: pokemon.types.length === 1 ? FILTER_TYPE_COLORS[pokemon.types[0]] : `linear-gradient(90deg,${FILTER_TYPE_COLORS[pokemon.types[0]]},${FILTER_TYPE_COLORS[pokemon.types[1]]})` }}
                    >
                        {/* <div className="w-full h-full bg-black/50 px-4 flex justify-between items-center text-white"> */}
                        {pokemon.name.split("-").map(text => (text.charAt(0).toUpperCase() + text.slice(1, text.length))).map((text, i) => (i !== 0 ? `[${text}]` : text)).join(" ")}
                        <div className="flex gap-1 px-2 text-[0.75rem]">
                            {
                                pokemon.types.map((type: string, i: number) => (
                                    <div key={i} className={`rounded-full flex items-center justify-center px-2`} style={{ background: FILTER_TYPE_COLORS[type], color: isDark(FILTER_TYPE_COLORS[type]) ? "white" : "black" }}>
                                        {type.toUpperCase()}
                                    </div>
                                ))
                            }
                        </div>
                        {/* </div> */}
                    </div>
                ))
            }
        </div>
    )
}

export default List;