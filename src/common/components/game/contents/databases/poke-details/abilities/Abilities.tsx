import Typewriter from "@/common/components/_utils/Typewriter";
import { SENTENCES_REGEX } from "@/common/constants/regex";
import { useInView } from "@/common/hooks/useInView";
import { AbilityCard } from "@/common/interfaces/ability";
import { capitalize } from "@/common/utils/string";
import { getAbilityData } from "@/database/abilities-db";
import { Fragment, useContext, useState } from "react";
import { PaletteContext } from "../_utils";
import Spinner from "@/common/components/_utils/loading/Spinner";
import { Bookmark, BOOKMARK_DATA } from "../../bookmarks/_utils";

type AbilitiesProps = {
    abilities: string[];
    pokeId: number;
}

const Abilities: React.FC<AbilitiesProps> = ({ abilities, pokeId }) => {
    const { palette } = useContext(PaletteContext);
    const { id, icon } = BOOKMARK_DATA[Bookmark.Abilities];

    return (
        <>
            <div id={id} className="border-0 section__header--default items-center gap-3"><i className={`${icon} text-[1.25rem] leading-4`} style={{ color: palette[1] }} /> Abilities</div>
            <div className="w-full flex max-sm:flex-col">
                {
                    abilities.map((ability, i) => (
                        <Fragment key={ability}>
                            <Data ability={ability} pokeId={pokeId} />
                        </Fragment>
                    ))
                }
            </div>
        </>
    )
}

export default Abilities;

const Data: React.FC<{ ability: string; pokeId: number; }> = ({ ability, pokeId }) => {
    const { palette } = useContext(PaletteContext);
    const [data, setData] = useState<AbilityCard | null>();
    const { ref } = useInView({
        onIntoView: () => {
            getAbilityData(ability, pokeId).then(res => {
                setData(res);
            })
        },
    })

    return (
        <div ref={ref} className="w-full h-full flex flex-col items-center justify-between sm:[&:not(:first-child)]:border-l" style={{ borderColor: `${palette[1]}80` }}>
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
            <div className="w-full grid grid-flow-row auto-rows-auto text-[0.875rem] sm:text-[1rem]">
                <div className="py-2 text-center w-full text-[1.125rem] sm:text-[1.25rem] font-medium" style={{ background: palette[1], color: text[1] }}>
                    {name}
                </div>
                <div className="px-4 grow font-vcr-mono py-4 sm:py-6 w-full italic tracking-wider leading-5 text-center" style={{ background: `${palette[1]}1a` }}>{"\u201C"}{data.flavorText}{"\u201D"}</div>
                <ul className="list-disc px-6 sm:px-8 my-3 flex flex-col">
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