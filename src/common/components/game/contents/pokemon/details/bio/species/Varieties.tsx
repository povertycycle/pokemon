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
    return (
        <div className="w-full flex flex-col items-end relative">
            <div className="w-fit flex items-start relative">
                <div className={`text-[1.25rem] px-8`} style={{ color: isDark(palette.at(-1)) ? "white" : "black", background: palette.at(-1) }}>Variations</div>
                <div className={`flex bg-black/25 relative transition-width duration-500 w-full flex-wrap ${varieties.length > MAX ? `${styles.overflowWhite} overflow-y-scroll` : ""}`} style={{ height: `${BASE}px`, maxWidth: `${BASE * MAX + (varieties.length > MAX ? 12 : 0)}px` }}>
                    {
                        varieties.map((variety: string, i: number) => (
                            <Variety variety={variety} key={i} />
                        ))
                    }
                </div>
            </div>
            <FormDescription switchable={switchable} description={description} />
        </div>
    )
}

const Variety: React.FC<{ variety: string }> = ({ variety }) => {
    const { details, palette } = useContext(DetailsContext);
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
        <div ref={ref => { details?.name === name && ref?.scrollIntoView(); }} title={title} className={`p-1 relative transition-colors text-center aspect-square h-full ${details?.name === name ? "" : "hover:bg-white/15 bg-white/0 cursor-pointer"}`} onClick={goToPokemon} style={{ borderColor: palette.at(-1), background: name === details?.name ? palette.at(-1) : "" }}>
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
    switchable: boolean | null
}

const FormDescription: React.FC<FormDescriptionProps> = ({ description, switchable }) => {
    const { palette } = useContext(DetailsContext);

    return (
        <div className="w-full flex justify-end">
            <div className="flex flex-col items-end">
                <span>{switchable !== null && `${switchable ? "Able" : "Unable"} to switch between forms*`}</span>
                {
                    description.length > 0 &&
                    <>
                        <div className="mt-4 text-[1.25rem] leading-5 py-1 px-16" style={{ color: isDark(palette.at(-1)) ? "white" : "black", background: palette.at(-1) }}>Form Description</div>
                        <div className={`max-h-[72px] tracking-[1px] mt-2 overflow-y-scroll text-base leading-5 flex flex-col items-end text-end bg-black/15 ${styles.overflowWhite}`}>
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