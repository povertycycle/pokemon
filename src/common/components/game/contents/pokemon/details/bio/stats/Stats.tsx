import { useContext } from "react";
import StatsDetails from "./StatsDetails";
import { DetailsContext } from "../../contexts";
import { shortcutID } from "@/common/utils/shortcut";
import { Shortcuts } from "../../../shortcuts/constants";

const Stats: React.FC = () => {
    const { details, palette } = useContext(DetailsContext);

    return (
        details &&
        <div id={shortcutID(Shortcuts.Stats)} className="flex flex-col w-full items-end mt-[50px] border-y-2 border-r-2 ml-[-16px]" style={{ borderColor: palette[0] }}>
            <div className="w-full flex flex-col">
                {
                    [
                        "hp", "attack", "defense", "special-attack", "special-defense", "speed"
                    ].map((stat: string, i: number) => (
                        <StatsDetails key={i} tag={stat} base={details.stats[stat].base_stat} />
                    ))
                }
            </div>
            <div className="flex flex-col text-base py-1 px-2 leading-5 font-mono text-end bg-black/15 text-[1.125rem] tracking-[-0.5px] w-full">
                <span>Max stats are based on 31 IV, 255 EV, and a favorable nature</span>
                <span>while Min stats are based on 0 IV, 0 EV, and a disadvantageous nature</span>
            </div>
        </div>
    )
}

export default Stats;