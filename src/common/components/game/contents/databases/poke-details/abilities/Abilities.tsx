import { useInView } from "@/common/hooks/useInView";
import { AbilityCard } from "@/common/interfaces/ability";
import { capitalize } from "@/common/utils/string";
import { getAbilityData } from "@/database/abilities-db";
import Image from "next/image";
import { Fragment, useContext, useState } from "react";
import { PaletteContext } from "../_utils";
import { SENTENCES_REGEX } from "@/common/constants/regex";
import Typewriter from "@/common/components/_utils/Typewriter";
import Spinner from "../../../_utils/Spinner";

type AbilitiesProps = {
    abilities: string[];
    pokeId: number;
}

const Abilities: React.FC<AbilitiesProps> = ({ abilities, pokeId }) => {
    const { palette } = useContext(PaletteContext);

    return (
        <>
            {
                abilities.map((ability, i) => (
                    <Fragment key={ability}>
                        {i !== 0 && <div className="w-0 border-r h-full" style={{ borderColor: palette[1] }} />}
                        <Data ability={ability} pokeId={pokeId} />
                    </Fragment>
                ))
            }
        </>
    )
}

export default Abilities;

const Data: React.FC<{ ability: string; pokeId: number; }> = ({ ability, pokeId }) => {
    const [data, setData] = useState<AbilityCard | null>();
    const { ref } = useInView({
        onIntoView: () => {
            getAbilityData(ability, pokeId).then(res => {
                setData(res);
            })
        },
        once: true
    })

    return (
        <div ref={ref} className="w-full h-full flex flex-col items-center justify-between">
            {
                data === undefined ?
                    <div className="my-4">
                        <Spinner />
                    </div> :
                    (
                        !!data ?
                            <Ability data={data} name={capitalize(ability)} /> :
                            <div className="w-full text-center pb-4 pt-6 sm:text-[1.25rem]">
                                <span className="text-base-red-dark">Unable to fetch ability data for</span>
                                <div className="font-medium text-[1.25rem] sm:text-[1.5rem]">{capitalize(ability)}</div>
                            </div>
                    )
            }
        </div>
    )
}

const Ability: React.FC<{ data: AbilityCard; name: string }> = ({ data, name }) => {
    const { palette, text } = useContext(PaletteContext);

    return (
        <>
            <div className="w-full grid grid-flow-row auto-rows-auto">
                <div className="py-2 text-center w-full text-[1.125rem] sm:text-[1.25rem] font-medium" style={{ background: palette[1], color: text[1] }}>
                    {name}
                </div>
                <div className="px-4 grow font-vcr-mono py-4 sm:py-6 w-full italic tracking-wider text-[0.875rem] sm:text-[1rem] leading-5 text-center" style={{ background: `${palette[1]}1a` }}>{"\u201C"}{data.flavorText}{"\u201D"}</div>
                <ul className="list-disc px-6 sm:px-8 my-3 flex flex-col text-[0.875rem] sm:text-[1rem]">
                    {
                        data.effectEntry?.match(SENTENCES_REGEX)?.map(((t: string, i: number) => (
                            <li key={i}>
                                <Typewriter text={t} duration={1500} />
                            </li>
                        )))
                    }
                </ul>
            </div>
            {data.isHidden && <div style={{ background: `${palette[1]}40` }} className="mt-4 text-center w-full px-4 py-1 italic">Hidden ability</div>}
        </>
    )
}