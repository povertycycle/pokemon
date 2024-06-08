import { API_HOME } from "@/common/components/game/constants";
import { getMoveData } from "@/common/components/game/database/movesDB";
import styles from "@/common/styles/table.module.scss";
import { capitalize } from "@/common/utils/capitalize";
import { shortcutID } from "@/common/utils/shortcut";
import React, { useContext, useEffect, useState } from "react";
import { MoveData, MoveVersions, VersionDetails } from "../../interfaces/moves";
import { Shortcuts } from "../../shortcuts/constants";
import { TYPE_COLORS } from "../../types/constants";
import { DetailsContext } from "../contexts";
import Loading from "../Loading";
import { METHODS } from "./constants";
import { GenerationContext } from "./contexts";
import Generations from "./Generations";
import { CATEGORY_COLOR } from "../../../_utils/constants";

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

const MoveDetails: React.FC<{ moveVersions: MoveVersions }> = ({ moveVersions }) => {
    const { palette } = useContext(DetailsContext);
    const versionList = Object.keys(Object.values(moveVersions).reduce((a: { [key: string]: number }, vd: VersionDetails[]) => { vd.forEach(({ version }) => { a[version] = 0 }); return a; }, {}));
    const [gen, setGen] = useState<string | null>(versionList.at(-1) ?? null);

    return (
        <div id={shortcutID(Shortcuts.Moves)} className="w-full flex flex-col mt-16 z-[1]">
            <GenerationContext.Provider value={{ gen, setGen }}>
                <div className="w-full text-[1.25rem] py-1 flex items-center justify-center bg-black/50 text-base-white border-y-2 relative" style={{ borderColor: palette[0] }}>
                    Learnset
                    <Generations versions={versionList} />
                </div>
                <div className={`w-full flex flex-col`}>
                    {
                        Object.keys(moveVersions).length > 0 ?
                            Object.entries(
                                Object.entries(structuredClone(moveVersions)).reduce((acc: MoveCategory, [moveId, vd]) => {
                                    let current = vd.find(v => v.version === gen);
                                    if (current) {
                                        acc[current.method].push({ moveId, ...(current.min_level && { level: current.min_level }) })
                                    }

                                    return acc;
                                }, Object.keys(METHODS).reduce((acc: { [key: string]: any[] }, k: string) => { acc[k] = []; return acc; }, {}))
                            ).sort(([a1], [b1]) => (a1 > b1 ? 1 : -1)).map(([method, moveData], i: number) => (
                                moveData.length > 0 &&
                                <div className="w-full flex flex-col mt-8 items-center" key={i}>
                                    <table className="table-auto border-separate border-spacing-x-1 w-fit tracking-[0.5px]">
                                        <caption className="px-4 py-2 underline leading-8 decoration-[1px] text-[1.125rem]">
                                            <span>{METHODS[method].title}</span>
                                        </caption>
                                        <thead className="h-[32px] tracking-[2px] text-base-white">
                                            <tr className={`text-base ${styles.table_header}`}>
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
                                        <tbody className={`${styles.table_body} text-base transition-height text-base-white`} style={{ height: `${HEIGHT * moveData.length}px` }}>
                                            {
                                                moveData.sort((a, b) => ((a?.level ?? parseInt(b.moveId)) - (b?.level ?? parseInt(b.moveId)))).map((data: Data, j: number) => (
                                                    <Move key={j} data={data} gen={gen} {...(method === "level-up" && { isLevelUp: true })} {...(method === "machine" && { isMachine: true })} />
                                                ))
                                            }
                                        </tbody>
                                        <caption className="caption-bottom py-1 h-[36px] text-end">
                                            <span className="text-[0.875rem]">{METHODS[method].desc}</span>
                                        </caption>
                                    </table>
                                </div>
                            )) :
                            <div className="px-4 py-1 bg-black/50 text-[1.125rem] border-b" style={{ borderColor: palette[0] }}>
                                Data is missing from the database. Please report this to <a className="text-[1.25rem] underline" target="_blank" href={API_HOME}>{"https://github.com/PokeAPI/pokeapi/"}</a>
                            </div>
                    }
                </div>
            </GenerationContext.Provider>
        </div>
    )
}

const Move: React.FC<{ data: Data, gen: string | null, isMachine?: boolean, isLevelUp?: boolean }> = ({ data, gen, isMachine, isLevelUp }) => {
    const { palette } = useContext(DetailsContext);
    const [moveData, setMoveData] = useState<MoveData | null>(null);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        getMoveData(data.moveId).then(res => {
            if (res) {
                setMoveData(res.data);
                setName(res.name);
            }
        }).catch(err => {
            // ERROR;
        })
    }, [data.moveId])

    return (
        moveData &&
        <tr className={`even:bg-black/20 odd:bg-black/35`} style={{ height: `${HEIGHT}px` }}>
            {isLevelUp && <td style={{ textAlign: "left" }}>{data.level ?? <span title="Gained when evolved to" className="cursor-help text-[1.125rem] underline decoration-dotted">?</span>}</td>}
            {isMachine && <td style={{ textAlign: "left" }}>{moveData.machines?.find(m => m.version === gen)?.machine.toUpperCase()}</td>}
            <td style={{ textAlign: "left" }}>{capitalize(name)}</td>
            <td>{moveData.accuracy ? `${moveData.accuracy}%` : "-"}</td>
            <td>{moveData.pp}</td>
            <td className="text-center">{moveData.power ?? "-"}</td>
            <td style={{ padding: "4px" }}><div className="flex items-center justify-center rounded-full border" style={{ borderColor: palette[0], background: CATEGORY_COLOR[moveData.damage_class] }}>{capitalize(moveData.damage_class)}</div></td>
            <td style={{ padding: "4px" }}><div className="flex items-center justify-center rounded-[4px] px-4 border" style={{ borderColor: palette[0], background: TYPE_COLORS[moveData.type] }}>{moveData.type.toUpperCase()}</div></td>
        </tr>
    )
}

export default Moves;