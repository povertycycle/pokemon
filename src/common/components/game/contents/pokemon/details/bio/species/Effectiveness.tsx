import { getLuma, isDark } from "@/common/utils/colors"
import React, { useContext } from "react"
import { FILTER_TYPE_COLORS } from "../../../constants"
import { TYPE_EFFECTIVENESS } from "../../../types/constants"
import { DetailsContext } from "../../contexts"

type EffectivenessProps = {
    types?: string[],
}

const Effectiveness: React.FC<EffectivenessProps> = ({ types }) => {
    const { palette } = useContext(DetailsContext);
    const effectiveness = types && Object.entries(types.reduce((acc: { [key: string]: number }, curr: string) => {
        const chart = TYPE_EFFECTIVENESS[curr];
        Object.entries(chart).forEach(([type, value]) => {
            if (acc[type]) {
                acc[type] *= value;
            } else {
                acc[type] = value;
            }
        })
        return acc;
    }, {})).filter(e => (e[1] !== 1)).reduce((acc: { [key: string]: string[] }, [type, value]) => {
        if (acc[String(value)]) {
            acc[String(value)].push(type);
        } else {
            acc[String(value)] = [type]
        }
        return acc;
    }, {})

    const refBg = getLuma(palette[1] ?? "#000000") < 86;

    return (
        <div className={`flex w-full flex-col mt-8 relative z-[1]`}>
            <div className="px-4 w-fit" style={{ background: palette[0], color: isDark(palette[0]) ? "white" : "black" }}>Effectiveness</div>
            <div className="w-fit max-w-full flex flex-col pt-2 gap-4 border-l-2" style={{ borderColor: palette[0] }}>
                {
                    effectiveness && Object.entries(effectiveness).sort(([a]: [string, string[]], [b]: [string, string[]]) => (parseFloat(b) - parseFloat(a))).map(([weak, types]: [string, string[]], i: number) => (
                        <Information key={i} level={weak} types={types} refBg={refBg} />
                    ))
                }
            </div>
        </div>
    )
}

const d: { [key: string]: { title: string, bg: string, desc: string, icon: string } } = {
    "4": { title: "WEAK", bg: "bg-hp-dark", desc: "X4", icon: "ri-arrow-down-double-line" },
    "2": { title: "WEAK", bg: "bg-spd-dark", desc: "X2", icon: "ri-arrow-down-s-line" },
    "0.5": { title: "RESIST", bg: "bg-sp-atk-dark", desc: "X1/2", icon: "ri-arrow-up-s-line" },
    "0.25": { title: "RESIST", bg: "bg-sp-def-dark", desc: "X1/4", icon: "ri-arrow-up-double-line" },
    "0": { title: "IMMUNE", bg: "bg-black", desc: "X0", icon: "ri-close-fill" }
}

const Information: React.FC<{ level: string, types: string[], refBg: boolean }> = ({ level, types, refBg }) => {
    const { title, bg, desc, icon } = d[level];
    const { palette } = useContext(DetailsContext);

    return (
        <div className="flex text-[1.125rem] leading-8 gap-4">
            <div className={`min-h-[48px] transition-height shrink-0 w-[192px] border-r-2 border-y-2 flex items-center justify-between ${bg} text-white`} style={{ borderColor: palette[0] }}>
                <div className="h-full flex items-center">
                    {icon && <i className={`text-[2.5rem] ${icon}`} />}
                    {title}
                </div>
                <div className="h-full px-2 flex items-center justify-center">
                    {desc}
                </div>
            </div>
            <div className={`flex flex-wrap gap-2 leading-4 items-center`}>
                {
                    types.map((t: string, i: number) => (
                        <div key={i} className={`px-4 border-2 shadow-base-black h-[32px] rounded-[6px] flex items-center justify-center`} style={{ background: FILTER_TYPE_COLORS[t] }}>
                            <span className="text-base-white drop-shadow-[0_0_4px_black]">{t.toUpperCase()}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Effectiveness;