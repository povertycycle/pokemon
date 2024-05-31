import { useEffect, useState } from "react";
import { BAD_NATURE, GOOD_NATURE, MAX_EV, MAX_IV, MIN_EV, MIN_IV, Properties, STATS_PROPERTIES } from "./constants";
import { calculateStats } from "./utils";

type StatsDetailsProps = {
    tag: string,
    base: number
}

const StatsDetails: React.FC<StatsDetailsProps> = ({ tag, base }) => {
    const [value, setValue] = useState<number>(0);
    const properties: Properties = STATS_PROPERTIES[tag];

    useEffect(() => {
        setValue(base);
    }, [base]);

    const MIN_STAT = calculateStats(tag, value, MIN_IV, MIN_EV, tag === "hp" ? undefined : BAD_NATURE);
    const MAX_STAT = calculateStats(tag, value, MAX_IV, MAX_EV, tag === "hp" ? undefined : GOOD_NATURE);

    return (
        <div className="flex items-center justify-between w-full h-[48px]">
            <div className="h-full flex flex-col items-start justify-center bg-black/50 shrink-0 text-base-white pl-6 pr-4 py-2">
                <span className="text-[1.25rem] leading-5">{properties.tag}</span>
                <span className="leading-4 text-base tracking-[0.5px] whitespace-nowrap">Base Value</span>
            </div>
            <div className="h-full text-[1.75rem] leading-6 w-[60px] flex items-center justify-start pl-2 shrink-0 text-black" style={{ background: properties.colors[2] }}>
                {value}
            </div>
            <div className="h-full w-full flex items-center justify-end px-4 text-base-white relative overflow-hidden" style={{ background: properties.colors[0] }}>
                <div className="flex flex-col items-end justify-center h-full">
                    <span className="text-[1.25rem] leading-5 py-[2px]">{MAX_STAT}</span>
                    <span className="leading-4 text-base tracking-[0.5px]">Max</span>
                </div>
                <div className="absolute left-0 top-0 flex flex-col transition-width duration-500 items-end justify-center h-full px-4" style={{ background: properties.colors[1], width: `${Math.round(MIN_STAT / MAX_STAT * 100)}%` }}>
                    <span className="text-[1.25rem] leading-5 py-[2px]">{MIN_STAT}</span>
                    <span className="leading-4 text-base tracking-[0.5px]">Min</span>
                </div>
                <div className="absolute transition-width duration-500 left-0 top-0 h-full flex items-center" style={{ background: properties.colors[2], width: `${Math.round(value / MAX_STAT * 100)}%` }} />
            </div>
        </div>
    )
}

export default StatsDetails;