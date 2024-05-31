import { getVarietySprite } from "@/common/components/game/database/pokemonDB"
import React, { useContext, useEffect, useState } from "react"
import { DetailsContext } from "../../contexts";
import styles from "@/common/styles/custom.module.scss";
import { capitalize } from "@/common/utils/capitalize";
import { useSprites } from "@/common/components/game/hooks/useSprites";

type VarietiesProps = {
    varieties: string[],
    switchable: boolean | null,
    description: string[]
}

const BASE = 64;
const MAX = 7;

const Varieties: React.FC<VarietiesProps> = ({ varieties, switchable, description }) => {
    const { palette, colors } = useContext(DetailsContext);
    let base = palette[0];
    let w = (varieties.length > MAX ? (BASE * MAX) : (varieties.length * BASE));
    let h = Math.ceil(varieties.length / MAX) * BASE;

    return (
        <div className="flex flex-col items-end relative gap-2">
            <div className="w-fit flex items-start relative">
                <div className={`px-4 text-[1.25rem] bg-black/50 border-l border-b text-base-white`} style={{ borderColor: palette[0] }}>Variations</div>
                <div className={`border-l border-b`} style={{ borderColor: base }}>
                    <div className={`bg-black/25 relative transition-[width,height] flex overflow-hidden flex-wrap`} style={{ width: `${w}px`, height: `${h}px` }}>
                        {
                            varieties.map((variety: string, i: number) => (
                                <Variety varietyId={variety} key={i} color={base} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <FormDescription switchable={switchable} description={description} color={base} font={colors[0]} />
        </div>
    )
}

const Variety: React.FC<{ varietyId: string, color: string }> = ({ varietyId, color }) => {
    const { details } = useContext(DetailsContext);
    const { name, url } = useSprites("species", varietyId);
    const isCurrent = details?.id === varietyId;

    const goToPokemon = () => {
        if (!isCurrent) {
            (document.querySelector(`[data-id='${varietyId}']`) as HTMLDivElement).click()
        };
    }

    return (
        <div title={!isCurrent ? capitalize(name) : undefined}
            className={`p-[2px] relative transition-colors text-center ${isCurrent ? "" : "hover:bg-white/15 bg-white/0 cursor-pointer"}`}
            onClick={goToPokemon} style={{ background: isCurrent ? color : "", width: `${BASE}px`, height: `${BASE}px` }}>
            {
                url ?
                    <img alt="" src={url} className="relative z-[1] w-full h-full" /> :
                    <span style={{ fontSize: `${BASE * 0.625}px` }} className="text-white">?</span>
            }
        </div>
    )
}

type FormDescriptionProps = {
    description: string[],
    switchable: boolean | null,
    color: string,
    font: string
}

const FormDescription: React.FC<FormDescriptionProps> = ({ description, switchable, color, font }) => {
    return (
        <div className="w-full flex justify-end">
            <div className="flex flex-col items-end">
                <span className="text-base leading-4 px-2">{switchable !== null ? `${switchable ? "Able" : "Unable"} to switch between forms` : "Has no other forms"}</span>
                <div className={`text-[1.25rem] overflow-hidden transition-[height,margin] ${description.length > 0 ? "h-[32px] mt-2" : "h-0"} pl-4 pr-[12px]`} style={{ color: font, background: color }}>Form Description</div>
                <div className={`${description.length > 0 ? "h-[72px] w-full border-y-2" : "w-0 h-0 border-[0px]"} transition-[width,height,border] tracking-[1px] overflow-y-auto text-base leading-5 flex flex-col items-end text-end bg-black/15 ${styles.overflowWhite}`} style={{ borderColor: color }}>
                    {
                        description.map((desc: string, i: number) => (
                            <span className="p-1" key={i}>
                                {desc}
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Varieties;