import React, { useContext } from "react"
import { DetailsContext } from "../../contexts"
import Typewriter from "@/common/components/game/utils/Typewriter"
import { isDark } from "@/common/utils/colors"
import { EGG_GROUPS_NAMES } from "./constants"
import { SHAPE_ICONS } from "./Icons"

type TrainingProps = {
    capture_rate?: number,


    shape?: string,
    habitat?: string
    gender_rate?: number,
    egg_groups?: string[],
    evolves_from_species?: string,
}

const Training: React.FC<TrainingProps> = ({ capture_rate,

    shape, habitat, gender_rate, egg_groups, evolves_from_species }) => {
    const { palette } = useContext(DetailsContext);
    const parsedHabitat = habitat?.split("-").map(h => {
        let word = h.charAt(0).toUpperCase() + h.slice(1);
        if (word.endsWith("s")) {
            word = word.slice(0, word.length - 1) + "'s"
        }
        return word;
    }).join(" ") ?? "Unknown";
    const { darker, bgFont } = { darker: palette[1] ?? "", bgFont: isDark(palette[1]) ? "white" : "black" };
    const { lighter, brFont } = { lighter: palette[0], brFont: isDark(palette[0]) ? "white" : "black" }

    return (
        <div className="flex flex-col border-2 rounded-[8px] overflow-hidden w-[384px] h-0 grow p-2 items-end" style={{ color: bgFont, borderColor: lighter }}>
            <CaptureRate capture_rate={capture_rate} />






            {/* <div className="w-full flex flex-col h-full text-base leading-4 justify-between py-1">
                <Habitat habitat={parsedHabitat} />
                <GenderRate gender_rate={gender_rate} male={darker} female={lighter} />

                <div className="w-full flex gap-1 h-[48px] py-1 px-2">
                    <Shape shape={shape} />
                    <EggGroups egg_groups={egg_groups} />
                </div>


            </div> */}
        </div>
    )
}

const CaptureRate: React.FC<{ capture_rate?: number }> = ({ capture_rate }) => {
    const calculate = Math.pow((Math.floor(4096 / 3 * (capture_rate ?? 0)) / 1044480), 0.75);

    return (
        <div>
            Capture Rate: {capture_rate} {Math.round(calculate * 10000) / 100}%
        </div>
    )
}









const Habitat: React.FC<{ habitat?: string }> = ({ habitat }) => {
    return (
        <div className="flex w-full justify-between px-2 text-[1.125rem] leading-6">
            <span>Habitat: </span>
            <span><Typewriter text={habitat ?? ""} duration={500} /></span>
        </div>
    )
}

const GenderRate: React.FC<{ gender_rate?: number, male: string, female: string }> = ({ gender_rate, male, female }) => {
    const mRatio = (8 - (gender_rate ?? 0)) / 8 * 100;
    const fRatio = (gender_rate ?? 0) / 8 * 100;

    return (
        <div className="px-2 flex h-full grow justify-between text-[1.125rem] leading-6 items-center">
            <div className="w-full">Gender Ratio:</div>




            <div className="w-full h-[14px] rounded-[50px] overflow-hidden flex border-2" style={{ borderColor: (gender_rate ?? 0) < 0 ? "black" : male }}>
                {
                    (gender_rate ?? 0) < 0 ?
                        <div className="h-full w-full bg-black" /> :
                        <>
                            <div className="h-full transition-width duration-500" style={{ width: `${mRatio}%`, background: male }} />
                            <div className="h-full transition-width duration-500" style={{ width: `${fRatio}%`, background: female }} />
                        </>
                }
            </div>
            {/* <div className="w-full text-[1.125rem] leading-6 flex">
                {
                    gender_rate < 0 ?
                        <span><Typewriter text={"Genderless"} duration={500} /></span> :
                        <>
                            <div className="flex w-full justify-start">
                                <span>Male:<Typewriter text={`${mRatio}%`} duration={500} /></span>
                            </div>
                            <div className="flex w-full justify-end">
                                <span>Female:<Typewriter text={`${fRatio}%`} duration={500} /></span>
                            </div>
                        </>
                }
            </div> */}
        </div>
    )
}

const Shape: React.FC<{ shape?: string }> = ({ shape }) => {
    return (
        <div className="h-full flex items-center justify-center px-2">
            <div className="h-full aspect-square">{SHAPE_ICONS[shape ?? ""]}</div>
        </div>
    )
}
const EggGroups: React.FC<{ egg_groups?: string[] }> = ({ egg_groups }) => {
    return (
        <div className="flex flex-col gap-[2px] justify-between w-full">
            <div className="underline h-full text-[1.125rem] flex items-center justify-center leading-6 text-center pb-[2px]">Egg Group{(egg_groups?.length ?? 0) > 1 ? "s" : ""}</div>
            <div className="w-full flex h-full gap-1 text-base-white">
                {
                    egg_groups?.map((eG: string, i: number) => (
                        <div key={i} className="w-full h-full overflow-hidden text-base leading-5 flex items-center justify-center relative rounded-[4px]" style={{ background: EGG_GROUPS_NAMES[eG].color, color: isDark(EGG_GROUPS_NAMES[eG].color) ? "white" : "black" }}>
                            <span className="relative z-[1]">{EGG_GROUPS_NAMES[eG].title}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Training;