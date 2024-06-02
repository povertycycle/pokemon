import { getAbilityData } from "@/common/components/game/database/abilityDB";
import styles from "@/common/styles/custom.module.scss";
import { capitalize } from "@/common/utils/capitalize";
import { useContext, useEffect, useState } from "react";
import Typewriter from "../../../../utils/Typewriter";
import { DetailsContext } from "../contexts";
import { SENTENCES_REGEX } from "@/common/components/game/constants";
import Loading from "../Loading";
import { SHORTCUT_WIDTH } from "../../constants";
import { shortcutID } from "@/common/utils/shortcut";
import { Shortcuts } from "../../shortcuts/constants";
import { AbilityData } from "../../interfaces/ability";

const Abilities: React.FC = () => {
    const { details, palette } = useContext(DetailsContext);
    return (
        details ?
            <div id={shortcutID(Shortcuts.Abilities)} className="w-full ml-[-2px] mt-16 flex justify-center" style={{ paddingRight: `${SHORTCUT_WIDTH / 2}px` }}>
                <div className="flex flex-col border-2" style={{ borderColor: palette[0] }}>
                    <div className="w-full text-[1.5rem] py-1 flex items-center justify-center bg-black/50 text-base-white" style={{ borderColor: palette[0] }}>
                        Abilities
                    </div>
                    <div className="w-full flex gap-1 p-1">
                        {
                            details &&
                            details.abilities.map((id: string, i: number) => (
                                <Ability id={id} pokemon={details.name} key={i} />
                            ))
                        }
                    </div>
                </div>
            </div> :
            <Loading />
    )
}

const Ability: React.FC<{ id: string, pokemon: string }> = ({ id, pokemon }) => {
    const { details, palette, colors } = useContext(DetailsContext);
    const [name, setName] = useState<string | null>(null);
    const [data, setData] = useState<AbilityData | null>(null);
    const [isHidden, setIsHidden] = useState<boolean | null>(false);

    useEffect(() => {
        getAbilityData(id, pokemon, details?.id ?? "-1").then(res => {
            if (res) {
                setName(res.name);
                setData(res.data);
                setIsHidden(res.is_hidden);
            }
        })
    }, [id]);

    return (
        data &&
        <div className={`w-full flex flex-col text-base-white gap-1 max-w-[55vw]`}>
            <div className={`flex flex-col items-center justify-center py-1 px-4 h-[56px] relative ${isHidden ? "brightness-[0.85]" : ""}`} style={{ background: `${palette[0]}`, color: colors[0] }}>
                <span title={data.not_main_series ? "Not in the base game" : undefined} className={`text-[1.25rem] tracking-[1px] ${data.not_main_series ? "cursor-help underline decoration-dotted" : ""}`}>{capitalize(name)}{data.not_main_series ? "*" : ""}</span>
                {isHidden && <span className="text-[0.875rem] leading-4">Hidden Ability</span>}
            </div>
            {
                <div className="flex flex-col gap-1 bg-black/25 p-2 text-base grow">
                    <span className="italic leading-5 tracking-[0.25px] py-4 text-center">
                        <Typewriter text={data.flavor_text ?? "-"} duration={1} />
                    </span>
                    <hr className="h-[2px] w-full shrink-0" style={{ borderColor: palette[0] }} />
                    <div className={`${styles.overflowWhite} max-h-[160px] flex flex-col gap-2 overflow-y-auto font-mono tracking-[-0.5px] leading-[18px] [word-spacing:2px]`}>
                        {
                            data?.effect?.match(SENTENCES_REGEX)?.map(((t: string, i: number) => (
                                <span key={i}>
                                    <Typewriter text={t} duration={1.5} />
                                </span>
                            )))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Abilities;