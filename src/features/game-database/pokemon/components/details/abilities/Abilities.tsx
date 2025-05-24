import { PaletteContext } from "@/stores/contexts";
import { useInView } from "@/utils/hooks";
import { useContext, useState } from "react";
import { IAbility, PokeAbility } from "../../../interfaces/ability";
import { BOOKMARK_DATA } from "../header/Bookmarks";
import { getAbilityData } from "../../../database/ability";
import { Spinner } from "@/components/loaders/Spinner";
import { SENTENCES_REGEX } from "@/constants/regex";
import { Typewriter } from "@/components/loaders/Typewriter";

type AbilitiesProps = {
    abilities: PokeAbility[];
};

/**
 * Ability details
 */
export const Abilities: React.FC<AbilitiesProps> = ({ abilities }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const { id, icon } = BOOKMARK_DATA.abilities;

    return (
        <>
            <div id={id} className="border-0 section__header--default">
                <i className={icon} style={{ color: background }} /> Abilities
            </div>
            <div className="w-full flex max-sm:flex-col">
                {abilities.map((ability) => (
                    <Data key={ability.id} ability={ability} />
                ))}
            </div>
        </>
    );
};

/**
 * Data display fetcher
 */
const Data: React.FC<{ ability: PokeAbility }> = ({ ability }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const [data, setData] = useState<IAbility | null>();
    const ref = useInView({
        onIntoView: () => {
            getAbilityData(ability.id)
                .then((res) => {
                    setData(res);
                })
                .catch((err) => {
                    setData(null);
                });
        },
    });

    return (
        <div
            ref={ref}
            className="w-full h-full flex flex-col items-center justify-between sm:[&:not(:first-child)]:border-l"
            style={{ borderColor: `${background}80` }}
        >
            {data === undefined ? (
                <Spinner />
            ) : !!data ? (
                <Ability {...ability} {...data} />
            ) : (
                <div className="w-full text-center pb-4 pt-6 text-sm sm:text-base">
                    <span className="text-base-red-dark">
                        Unable to fetch data for ability
                    </span>
                    <div className="font-medium text-base sm:text-lg">
                        {ability.id}
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * Ability data displayer
 */
const Ability: React.FC<PokeAbility & IAbility> = (props) => {
    const {
        dark: { background, color },
    } = useContext(PaletteContext);

    return (
        <div className="w-full grid grid-flow-row auto-rows-auto">
            <div
                className={`py-1 text-center w-full text-base sm:text-lg tracking-wider flex gap-2 justify-center items-center`}
                style={{ background, color }}
            >
                <span
                    className={`${
                        props.isHidden ? "opacity-60" : ""
                    } font-medium`}
                >
                    {props.name}
                </span>
                {props.isHidden && (
                    <span className="text-xs sm:text-sm">(Hidden)</span>
                )}
            </div>
            <div
                className="px-4 grow font-vcr-mono py-3 sm:py-4 w-full italic tracking-wider text-xs sm:text-[15px] text-center"
                style={{ background: `${background}1a` }}
            >
                {"\u201C"}
                {props.flavorText}
                {"\u201D"}
            </div>
            <ul className="list-disc px-6 sm:px-8 my-3 flex text-xs sm:text-sm tracking-wide flex-col">
                {props.effectEntry
                    ?.match(SENTENCES_REGEX)
                    ?.map((t: string, i: number) => (
                        <li key={i}>
                            <Typewriter text={t} duration={1500} />
                        </li>
                    ))}
            </ul>
        </div>
    );
};
