import Typewriter from "@/common/components/game/utils/Typewriter"
import { isDark } from "@/common/utils/colors"
import React, { ReactNode, useContext } from "react"
import { DetailsContext } from "../../contexts"
import { EGG_GROUPS_NAMES } from "./constants"
import { SHAPE_ICONS } from "./Icons"
import { capitalize } from "@/common/utils/capitalize"

type TrainingProps = {
    capture_rate: number,
    hatch_counter: number,
    growth_rate: string,
    gender_rate: number,
    shape?: string,
    habitat?: string
    egg_groups?: string[],
}

function captureRate(rate: number) {
    return Math.pow((Math.floor(4096 / 3 * (rate ?? 0)) / 1044480), 0.75)
}

const Training: React.FC<TrainingProps> = ({ capture_rate, hatch_counter, growth_rate, gender_rate, habitat, shape, egg_groups }) => {
    const { palette, colors } = useContext(DetailsContext);

    const Header: React.FC<{ title: string, children: ReactNode }> = ({ title, children }) => {
        return (
            <div className="flex flex-col gap-1 items-end text-[1.125rem] leading-5">
                <div className="text-[1.25rem] px-8 leading-6" style={{ background: palette[0], color: colors[0] }}>{title}</div>
                <div className="px-2">{children}</div>
            </div>
        )
    }

    return (
        <div className="flex flex-col border-r-2 overflow-hidden w-full pl-8 h-full items-end gap-2 leading-4" style={{ color: colors[1], borderColor: palette[0] }}>
            <Header title="Capture Rate">
                <span title="Chance to capture at full HP with a pokeball" className="underline text-base cursor-help">{Math.round(captureRate(capture_rate) * 10000) / 100}%</span> {capture_rate}
            </Header>
            <Header title="Egg Cycles">
                <span className="underline cursor-help text-base" title="Sword, Shield, Scarlet, and Violet">{128 * hatch_counter} Steps</span> {hatch_counter}
            </Header>
            <Header title="Growth Rate">
                {capitalize(growth_rate)}
            </Header>
            <Header title="Habitat">
                <span>{habitat?.split("-").map(h => (`${h.charAt(0).toUpperCase()}${h.slice(1, h.length - 1)}${h.endsWith("s") ? "'s" : h.charAt(h.length - 1)}`)).join(" ") ?? "Unknown"}</span>
            </Header>
            <div className="flex justify-end">
                <Header title="Egg Groups">
                    <div className="flex gap-1 mr-[-4px]">
                        {
                            egg_groups?.map((eG: string, i: number) => (
                                <div key={i} className="h-full overflow-hidden text-base leading-5 px-4 flex items-center relative rounded-[4px]" style={{ background: EGG_GROUPS_NAMES[eG].color, color: isDark(EGG_GROUPS_NAMES[eG].color) ? "white" : "black" }}>
                                    <span className="relative z-[1]">{EGG_GROUPS_NAMES[eG].title}</span>
                                </div>
                            ))
                        }
                    </div>
                </Header>
                <div className="p-1 aspect-square h-[48px]" style={{ background: palette[0] }}>
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