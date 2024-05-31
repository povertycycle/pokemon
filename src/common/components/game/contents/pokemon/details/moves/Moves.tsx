import { getMoveData } from "@/common/components/game/database/movesDB";
import { capitalize } from "@/common/utils/capitalize";
import React, { useContext, useEffect, useState } from "react";
import { FILTER_TYPE_COLORS } from "../../constants";
import { MoveData, MoveVersions, VersionDetails } from "../../interfaces/moves";
import { DetailsContext } from "../contexts";
import Loading from "../Loading";
import { CATEGORY_COLOR } from "./constants";
import { GenerationContext } from "./contexts";
import Generations from "./Generations";
import styles from "./index.module.scss";

type MovesProps = {
    moveVersions: MoveVersions;
}

const Moves: React.FC<MovesProps> = ({ moveVersions }) => {
    const { details } = useContext(DetailsContext);
    return (details && moveVersions ? <MoveDetails moveVersions={moveVersions} /> : <Loading />)
}

type Data = {
    moveId: string,
    level?: number
};
type MoveCategory = {
    [method: string]: Data[]
}
const HEIGHT = 28;
const METHOD_NAMES: { [key: string]: { title: string, desc: string } } = {
    "egg": { title: "Egg", desc: "Appears on a newly-hatched Pokémon, if the father had the same move." },
    "level-up": { title: "Level Up", desc: "Learned when a Pokémon reaches a certain level." },
    "machine": { title: "Machine", desc: "Can be taught at any time by using a TM or HM." },
    "tutor": { title: "Tutor", desc: "Can be taught at any time by an NPC" },
    "stadium-surfing-pikachu": { title: "Stadium: Surfendes Pikachu", desc: "Learned when a non-rental Pikachu helps beat Prime Cup Master Ball R-2. It must participate in every battle, and you must win with no continues." },
    "light-ball-egg": { title: "Volt Tackle Pichu", desc: "Appears on a Pichu whose mother was holding a Light Ball. The father cannot be Ditto." },
    "colosseum-purification": { title: "Colosseum: Purification", desc: "Appears on a Shadow Pokémon as it becomes increasingly purified." },
    "xd-shadow": { title: "XD: Shadow", desc: "Appears on a Snatched Shadow Pokémon." },
    "xd-purification": { title: "XD: Purification", desc: "Appears on a Shadow Pokémon as it becomes increasingly purified." },
    "form-change": { title: "Form Change", desc: "Appears when Rotom or Cosplay Pikachu changes form. Disappears if the Pokémon becomes another form and this move can only be learned by form change." },
    "zygarde-cube": { title: "Zygarde Cube", desc: "Can be taught using the Zygarde Cube.  Must find the corresponding Zygarde Core first in Sun/Moon. All moves are available immediately in Ultra Sun/Ultra Moon." }
}

const MoveDetails: React.FC<{ moveVersions: MoveVersions }> = ({ moveVersions }) => {
    const { palette } = useContext(DetailsContext);
    const versionList = Object.keys(Object.values(moveVersions).reduce((a: { [key: string]: number }, vd: VersionDetails[]) => { vd.forEach(({ version }) => { a[version] = 0 }); return a; }, {}));
    const [gen, setGen] = useState<string | null>("scarlet-violet");

    return (
        <div className="w-full flex flex-col mt-24 z-[1]">
            <GenerationContext.Provider value={{ gen, setGen }}>
                <div className="w-full text-[1.5rem] py-1 flex items-center justify-center bg-black/50 text-base-white border-y-2 relative" style={{ borderColor: palette[0] }}>
                    Learnset
                    <Generations versions={versionList} />
                </div>
                <div className={`w-full flex flex-col`}>
                    {
                        Object.entries(
                            Object.entries(structuredClone(moveVersions)).reduce((acc: MoveCategory, [moveId, vd]) => {
                                let current = vd.find(v => v.version === gen);
                                if (current) {
                                    acc[current.method].push({ moveId, ...(current.min_level && { level: current.min_level }) })
                                }

                                return acc;
                            }, Object.keys(METHOD_NAMES).reduce((acc: { [key: string]: any[] }, k: string) => { acc[k] = []; return acc; }, {}))
                        ).sort(([a1], [b1]) => (a1 > b1 ? 1 : -1)).map(([method, moveData], i: number) => (
                            moveData.length > 0 &&
                            <div className="w-full flex flex-col mt-8 items-center" key={i}>
                                <table className="table-auto border-separate border-spacing-x-1 w-fit transition-height tracking-[0.5px]" style={{ height: `${HEIGHT * moveData.length + 68}px` }}>
                                    <caption className="px-4 py-1 h-[36px]">
                                        <span className="text-[1.125rem]">{METHOD_NAMES[method].title}</span>
                                    </caption>
                                    <thead className="h-[32px] tracking-[2px]">
                                        <tr className={`text-[1.125rem] ${styles.table_header}`}>
                                            {method === "level-up" && <th style={{ textAlign: "left", borderColor: palette[0] }}>Lv</th>}
                                            {method === "machine" && <th style={{ textAlign: "left", borderColor: palette[0] }}>TM</th>}
                                            <th style={{ textAlign: "left", borderColor: palette[0] }}>Name</th>
                                            <th style={{ borderColor: palette[0] }}>Accuracy</th>
                                            <th style={{ borderColor: palette[0] }}>PP</th>
                                            <th style={{ borderColor: palette[0] }}>Power</th>
                                            <th style={{ borderColor: palette[0] }}>Damage Class</th>
                                            <th style={{ borderColor: palette[0] }}>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className={styles.table_body}>
                                        {
                                            moveData.sort((a, b) => ((a?.level ?? parseInt(b.moveId)) - (b?.level ?? parseInt(b.moveId)))).map((data: Data, j: number) => (
                                                <Move key={j} data={data} gen={gen} {...(method === "machine" && { isMachine: true })} />
                                            ))
                                        }
                                    </tbody>
                                    <caption className="caption-bottom py-1 h-[36px] text-end">
                                        <span className="text-[0.875rem]">{METHOD_NAMES[method].desc}</span>
                                    </caption>
                                </table>
                            </div>
                        ))
                    }
                </div>
            </GenerationContext.Provider>
        </div>
    )
}

const Move: React.FC<{ data: Data, gen: string | null, isMachine?: boolean }> = ({ data, gen, isMachine }) => {
    const [moveData, setMoveData] = useState<MoveData | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        getMoveData(data.moveId).then(res => {
            setMoveData(res.data);
            setName(res.name);
        }).catch(err => {
            // ERROR;
        })
    }, [data.moveId])

    return (
        moveData &&
        <tr>
            {data.level && <td style={{ textAlign: "left" }}>{data.level}</td>}
            {isMachine && <td style={{ textAlign: "left" }}>{moveData.machines.find(m => m.version === gen)?.item.name.toUpperCase()}</td>}
            <td style={{ textAlign: "left" }}>{capitalize(name)}</td>
            <td>{moveData.accuracy ?? "-"}%</td>
            <td>{moveData.pp}</td>
            <td className="text-center">{moveData.power ?? "-"}</td>
            <td style={{ padding: "4px" }}><div className="flex items-center justify-center rounded-full" style={{ background: CATEGORY_COLOR[moveData.damage_class] }}>{capitalize(moveData.damage_class)}</div></td>
            <td style={{ padding: "4px" }}><div className="flex items-center justify-center rounded-[4px] px-4" style={{ background: FILTER_TYPE_COLORS[moveData.type] }}>{moveData.type.toUpperCase()}</div></td>
        </tr>
    )
}
{/* effect_chance?: number,
    priority: number,
    effect_entries?:{
        effect: string,
        short_effect: string,
    },
    flavor_text_entries?: {
        flavor_text: string,
        version: string,
    }[],
    meta?: {
        [tag: string]: number | string
    },
    target: string,*/}

export default Moves;