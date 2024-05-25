import { isDark } from "@/common/utils/colors"
import React, { ReactNode, useContext } from "react"
import { DetailsContext } from "../../contexts"
import { EGG_GROUPS_NAMES } from "./constants"
import { SHAPE_ICONS } from "./Icons"

type TrainingProps = {
    capture_rate: number,
    hatch_counter: number,
    growth_rate: string,
    gender_rate: number,
    shape?: string,
    habitat?: string
    egg_groups?: string[],
    measurements: {
        base_happiness: number,
        base_experience: number,
        weight: number,
        height: number
    }
}

const RATE: { [key: string]: string } = {
    "slow": "Slow",
    "medium": "Medium",
    "fast": "Fast",
    "medium-slow": "Medium Slow",
    "slow-then-very-fast": "Erratic",
    "fast-then-very-slow": "Fluctuating",
}

function captureRate(rate: number) {
    return Math.pow((Math.floor(4096 / 3 * (rate ?? 0)) / 1044480), 0.75)
}

function meterToFtIn(height: number) {
    let feet = height * 0.32808;
    return `${Math.floor(feet)}'${Math.round((feet % 1) * 12)}"`
}

const Training: React.FC<TrainingProps> = ({ capture_rate, hatch_counter, growth_rate, gender_rate, habitat, shape, egg_groups, measurements }) => {
    const { palette, colors } = useContext(DetailsContext);

    const Header: React.FC<{ title: string, title2: string, children: ReactNode }> = ({ title, title2, children }) => {
        return (
            <div className={`w-full flex flex-col`}>
                <div className="w-full flex justify-between">
                    <div className="text-[1.25rem] bg-black/50 px-4 border-b-2" style={{ borderColor: palette[0], color: colors[1] }}>{title}</div>
                    <div className="text-[1.25rem] bg-black/50 px-4 border-b-2" style={{ borderColor: palette[0], color: colors[1] }}>{title2}</div>
                </div>
                <div className="w-full flex justify-between items-center bg-black/15 px-2 text-[1.125rem]">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col border-r-2 overflow-hidden w-full pl-12 h-fit items-end gap-4 mt-8" style={{ color: colors[1], borderColor: palette[0] }}>
            <div className="w-full flex flex-col gap-2">
                <Header title="Capture Rate" title2="Egg Cycles">
                    <span>{capture_rate} <span title="Chance to capture at full HP with a pokeball" className="underline text-base cursor-help">{Math.round(captureRate(capture_rate) * 10000) / 100}%</span></span>
                    <span>{hatch_counter} <span className="underline cursor-help text-base" title="Sword, Shield, Scarlet, and Violet">{128 * hatch_counter} Steps</span></span>
                </Header>
                <Header title="Base Friendship" title2="Exp Yield">
                    <span>{measurements.base_happiness}</span>
                    <span>{measurements.base_experience}</span>
                </Header>
                <Header title="Height" title2="Weight">
                    <span><span>{measurements.height / 10}<span className="text-base">m</span> / {meterToFtIn(measurements.height)}</span></span>
                    <span><span>{measurements.weight / 10}<span className="text-base">kg</span> / {Math.round(measurements.weight * 2.205) / 10}<span className="text-base">lbs.</span></span></span>
                </Header>
                <Header title="Growth Rate" title2="Habitat">
                    <span>{RATE[growth_rate]}</span>
                    <span><span>{habitat?.split("-").map(h => (`${h.charAt(0).toUpperCase()}${h.slice(1, h.length - 1)}${h.endsWith("s") ? "'s" : h.charAt(h.length - 1)}`)).join(" ") ?? "Unknown"}</span></span>
                </Header>
            </div>
            <div className="flex justify-end w-full h-[64px]">
                <div className="w-full flex flex-col h-full">
                    <div className="shrink-0 text-[1.25rem] px-8 w-full justify-center flex border-b-2 bg-black/50" style={{ borderColor: palette[0], color: colors[1] }}>Egg Groups</div>
                    <div className="h-full flex w-full gap-2 p-2 bg-black/15 leading-4 text-base">
                        {
                            egg_groups?.map((eG: string, i: number) => (
                                <div key={i} className="h-full w-full justify-center overflow-hidden flex items-center" style={{ background: EGG_GROUPS_NAMES[eG].color, color: isDark(EGG_GROUPS_NAMES[eG].color) ? "white" : "black" }}>
                                    {EGG_GROUPS_NAMES[eG].title}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="p-2 aspect-square h-full shrink-0" style={{ background: palette[0] }}>
                    {SHAPE_ICONS[shape ?? ""]}
                </div>
            </div>
            <GenderRate female={gender_rate} color={palette[0]} />
        </div>
    )
}

const GenderRate: React.FC<{ female: number, color: string }> = ({ female, color }) => {
    return (
        <div className="w-full overflow-hidden flex text-base border-l-2 border-y-2" style={{ borderColor: color }}>
            {
                female < 0 ?
                    <div className="h-full w-full bg-black text-base-white flex justify-center items-center">Genderless</div> :
                    <div className="w-full h-[24px] flex bg-black">
                        <div className="h-full flex items-center justify-center text-[1.25rem] pl-[2px] pr-2 border-r-2" style={{ background: "#6fa8dca3", borderColor: color }}>
                            <div className="h-full gap-2 flex items-center justify-center">
                                <i className="ri-men-line" />
                                <span className="text-base">{(8 - female) / 8 * 100}%</span>
                            </div>
                        </div>
                        <div className="h-full" style={{ background: "#6fa8dc", width: `${(8 - female) / 8 * 100}%` }} />
                        <div className="h-full" style={{ background: "#d5a6bd", width: `${female / 8 * 100}%` }} />
                        <div className="h-full flex items-center justify-center text-[1.25rem] pl-2 pr-[2px] border-l-2" style={{ background: "#d5a6bda3", borderColor: color }}>
                            <div className="h-full gap-2 flex items-center justify-center">
                                <span className="text-base">{female / 8 * 100}%</span>
                                <i className="ri-women-line" />
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Training;