import { getLuma } from "@/common/utils/colors"
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

    const refBg = getLuma(palette[0]) < 86;

    return (
        <div className={`flex w-full gap-2 flex-col h-fit`}>
            <span className="text-[1.5rem] leading-6 underline px-1">Effectiveness</span>
            {
                effectiveness && Object.entries(effectiveness).sort(([a]: [string, string[]], [b]: [string, string[]]) => (parseFloat(b) - parseFloat(a))).map(([weak, types]: [string, string[]], i: number) => (
                    <Information key={i} level={weak} types={types} refBg={refBg} />
                ))
            }
        </div>
    )
}

const Information: React.FC<{ level: string, types: string[], refBg: boolean }> = ({ level, types, refBg }) => {
    const { title, bg, desc, icon } = (() => {
        switch (level) {
            default:
                return { title: undefined, bg: undefined, desc: undefined, icon: undefined };
            case "4":
                return { title: "WEAK", bg: "bg-hp-dark", desc: "X4", icon: "ri-arrow-down-double-line" };
            case "2":
                return { title: "WEAK", bg: "bg-spd-dark", desc: "X2", icon: "ri-arrow-down-s-line" };
            case "0.5":
                return { title: "RESIST", bg: "bg-sp-atk-dark", desc: "X1/2", icon: "ri-arrow-up-s-line" };
            case "0.25":
                return { title: "RESIST", bg: "bg-sp-def-dark", desc: "X1/4", icon: "ri-arrow-up-double-line" };
            case "0":
                return { title: "IMMUNE", bg: "bg-black", desc: "X0", icon: "ri-close-fill" }
        }
    })()

    return (
        <div className="flex text-[1.125rem] leading-8 gap-4">
            <div className={`h-[40px] shrink-0 w-[192px] ${refBg ? "border-base-white" : "border-black"} border-2 flex items-center justify-between ${bg} text-white gap-4 rounded-[4px]`}>
                <div className="h-full flex items-center">
                    {icon && <i className={`text-[2.5rem] ${icon}`} />}
                    {title}
                </div>
                <div className="h-full px-2 flex items-center justify-center">
                    {desc}
                </div>
            </div>
            <div className={`flex flex flex-wrap gap-1 leading-4`}>
                {
                    types.map((t: string, i: number) => (
                        <div key={i} className={`px-4 rounded-[4px] border  ${refBg ? "border-base-white-dark" : "border-black"} h-[40px] flex items-center justify-center`} style={{ background: FILTER_TYPE_COLORS[t] }}>
                            <span className="text-base-white drop-shadow-[0_0_2px_black]">{t.toUpperCase()}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Effectiveness;