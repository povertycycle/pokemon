import { capitalize } from "@/common/utils/string";
import { useContext, useState } from "react";
import { CATEGORY_COLOR } from "../_utils/constants";
import { PokeMove } from "../pokemon/interfaces/moves";
import { TARGET_DATA } from "./constants";
import { GameContext } from "./context";
import table from "@/common/styles/table.module.scss";
import ImageSprites from "../_utils/ImageSprites";
import { Pokeball } from "../_utils/Pokeball";

const TRowMove: React.FC<{ data: PokeMove, color: string }> = ({ data, color }) => {
    const { game } = useContext(GameContext);
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
            <tr className="odd:bg-white even:bg-white/25 hover:bg-base-white-dark/25 transition-transform cursor-pointer hover:translate-x-[8px]" onClick={() => { setShow(prev => !prev) }}>
                <td>{capitalize(data.name)}</td>
                <td style={{ textAlign: "center" }}>{data.data.pp}</td>
                <td style={{ color: data.data.damage_class === "special" ? "#f0f0f0" : "black", textAlign: "center", background: CATEGORY_COLOR[data.data.damage_class] }}>{data.data.damage_class.toUpperCase()}</td>
                <td style={{ textAlign: "center" }}>{data.data.power ?? "-"}</td>
                <td style={{ textAlign: "center" }}>{data.data.accuracy ?? "-"}</td>
                <td>{data.data.flavor_text}</td>
            </tr>
            {show && <tr className={`w-full overflow-hidden`} style={{ background: color }}>
                <td className={`text-base-white`} colSpan={6} style={{ background: "#000000a3" }}>
                    <div className="flex flex-col py-4">
                        <table className={`table-fixed border-separate ${table.moveDetails}`}>
                            <tbody>
                                <tr>
                                    <td className="text-[1.5rem]" title="Target"><i className="ri-crosshair-2-line" /></td>
                                    <td>{TARGET_DATA[data.data.target]}</td>
                                </tr>
                                <tr>
                                    <td className="text-[1.5rem]" title="Priority"><i className="ri-alert-line" /></td>
                                    <td>{data.data.priority}</td>
                                </tr>
                                <tr>
                                    <td className="text-[1.5rem]" title="Effect"><i className="ri-sparkling-line" /></td>
                                    <td>{data.data.effect}</td>
                                </tr>
                                <tr>
                                    <td title="Pokémon"><div className="w-full flex items-center justify-center"><Pokeball /></div></td>
                                    <td>
                                        {
                                            (data.data.machines && data.data.machines.length > 0) ?
                                                (
                                                    <span className="flex gap-4">
                                                        Via {data.data.machines.filter(m => m.version.split("-").map(t => t.charAt(0)).join("") === game)?.[0]?.machine.toUpperCase()}
                                                    </span>
                                                ) :
                                                (
                                                    data.pokemons ?
                                                        (
                                                            <div className="flex-wrap flex">
                                                                {
                                                                    data.pokemons?.map((p, i) => (
                                                                        <ImageSprites key={i} id={p} type="species" minified />
                                                                    ))
                                                                }
                                                            </div>
                                                        ) :
                                                        <span>Unknown origins</span>
                                                )
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* {data.data.machines && <span>{data.data.machines?.find(m => m.version.split('-').map(s => s.charAt(0)).join('') === game)?.machine}</span>}
                        <div className="flex gap-2">
                            {
                                ((data.data.machines?.length ?? 0) === 0) &&
                                data.pokemons?.map((p, i) => (
                                    <ImageSprites key={i} id={p} type="species" />
                                ))
                            }
                        </div> */}
                    </div>
                </td>
            </tr>}
        </>
    )
}

export default TRowMove;