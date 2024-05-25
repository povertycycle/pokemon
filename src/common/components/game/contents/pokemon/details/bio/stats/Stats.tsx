import { useContext } from "react";
import StatsDetails from "./StatsDetails";
import { DetailsContext } from "../../contexts";

const Stats: React.FC = () => {
    const { details, palette } = useContext(DetailsContext);

    return (
        details &&
        <div className="flex flex-col w-full items-end mt-12 border-y-2 ml-[-16px]" style={{ borderColor: palette[0] }}>
            <div className="w-full flex flex-col gap-1">
                {
                    [
                        "hp", "attack", "defense", "special-attack", "special-defense", "speed"
                    ].map((stat: string, i: number) => (
                        <StatsDetails key={i} tag={stat} base={details.stats[stat].base_stat} />
                    ))
                }
            </div>
            <div className="flex flex-col text-base p-1 leading-5 text-end bg-black/15 tracking-[0.5px] w-full">
                <span>Max stats are based on 31 IV, 255 EV, and a favorable nature</span>
                <span>while Min stats are based on 0 IV, 0 EV, and a disadvantageous nature</span>
            </div>
        </div>
    )
}

export default Stats;