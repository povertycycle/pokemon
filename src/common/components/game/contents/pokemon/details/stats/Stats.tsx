import StatsDetails from "./StatsDetails";

const Stats: React.FC = () => {
    return (
        <div className="flex flex-col w-full min-w-[512px] items-end shrink-0">
            <div className="w-full">
                {
                    [
                        "hp", "attack", "defense", "special-attack", "special-defense", "speed"
                    ].map((stat: string, i: number) => (
                        <StatsDetails key={i} tag={stat} />
                    ))
                }
            </div>
            <div className="flex flex-col text-[0.875rem] rounded-b-[6px] px-1 leading-4 text-end bg-base-white/50 tracking-[0.5px] w-full">
                <span>Max stats are based on 31 IV, 255 EV, and a favorable nature</span>
                <span>while Min stats are based on 0 IV, 0 EV, and a disadvantageous nature</span>
            </div>
        </div>
    )
}

export default Stats;