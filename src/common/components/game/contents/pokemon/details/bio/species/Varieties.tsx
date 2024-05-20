import { getVarietySprite } from "@/common/components/game/database/pokemonDB"
import React, { useContext, useEffect, useState } from "react"
import { DetailsContext } from "../../contexts";
import styles from "@/common/styles/custom.module.scss";
import { isDark } from "@/common/utils/colors";

const BASE = 64;
const MAX = 5;

type VarietiesProps = {
    varieties: string[],
    switchable: boolean | null,
    description: string[]
}

const Varieties: React.FC<VarietiesProps> = ({ varieties, switchable, description }) => {
    const { palette } = useContext(DetailsContext);
    let base = palette[0];

    return (
        <div className="flex flex-col items-end relative">
            <div className="w-fit flex items-start relative">
                <div className={`px-4`} style={{ color: isDark(base) ? "white" : "black", background: base }}>Variations</div>
                <div className={`border-l-2 border-b-2 flex bg-black/25 relative transition-width duration-500 w-full flex-wrap overflow-y-auto ${styles.overflowWhite}`} style={{ borderColor: base, height: `${BASE}px`, maxWidth: `${BASE * MAX + (varieties.length > MAX ? 4 : 0)}px` }}>
                    {
                        varieties.map((variety: string, i: number) => (
                            <Variety variety={variety} key={i} color={base} />
                        ))
                    }
                </div>
            </div>
            <FormDescription switchable={switchable} description={description} color={base} />
        </div>
    )
}

const Variety: React.FC<{ variety: string, color: string }> = ({ variety, color }) => {
    const { details } = useContext(DetailsContext);
    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("");
    const title = details?.name !== name ? variety.split("-").map(v => `${v.charAt(0).toUpperCase()}${v.slice(1)}`).join(" ") : undefined;

    useEffect(() => {
        if (name !== variety) {
            getVarietySprite(variety).then(res => {
                setUrl(res);
                setName(variety);
            })
        }
    }, [variety])

    const goToPokemon = () => {
        if (details?.name !== name) {
            (document.querySelector(`[data-name='${name}']`) as HTMLDivElement).click()
        };
    }

    return (
        <div ref={ref => { details?.name === name && ref?.scrollIntoView(); }} title={title} className={`p-[2px] relative transition-colors text-center aspect-square h-full ${details?.name === name ? "" : "hover:bg-white/15 bg-white/0 cursor-pointer"}`} onClick={goToPokemon} style={{ borderColor: color, background: name === details?.name ? color : "" }}>
            {
                url ?
                    <img alt="" src={url} className="relative z-[1] w-full h-full" /> :
                    <span className="text-[2.5rem] text-white">?</span>
            }
        </div>
    )
}

type FormDescriptionProps = {
    description: string[],
    switchable: boolean | null,
    color: string,
}

const FormDescription: React.FC<FormDescriptionProps> = ({ description, switchable, color }) => {
    return (
        <div className="w-full flex justify-end">
            <div className="flex flex-col items-end">
                <span className="text-[0.875rem] leading-4">{switchable !== null ? `${switchable ? "Able" : "Unable"} to switch between forms*` : "No other forms"}</span>
                {
                    description.length > 0 &&
                    <>
                        <div className="mt-4 px-4" style={{ color: isDark(color) ? "white" : "black", background: color }}>Form Description</div>
                        <div className={`max-h-[72px] tracking-[1px] border-r-2 border-b-2 overflow-y-scroll text-[0.875rem] flex flex-col items-end text-end bg-black/15 ${styles.overflowWhite}`} style={{ borderColor: color }}>
                            {
                                description.map((desc: string, i: number) => (
                                    <span className="p-1" key={i}>
                                        {desc}
                                    </span>
                                ))
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Varieties;