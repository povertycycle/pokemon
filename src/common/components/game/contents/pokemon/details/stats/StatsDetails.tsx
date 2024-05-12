import { useContext, useEffect, useState } from "react";
import { DetailsContext } from "../contexts";
import { BAD_NATURE, GOOD_NATURE, MAX_EV, MAX_IV, MIN_EV, MIN_IV, Properties, STATS_PROPERTIES } from "./constants";
import { calculateStats } from "./utils";

type StatsDetailsProps = {
    tag: string
}

const StatsDetails: React.FC<StatsDetailsProps> = ({ tag }) => {
    const { details } = useContext(DetailsContext);
    const [value, setValue] = useState<number>(0);
    const properties: Properties = STATS_PROPERTIES[tag];

    useEffect(() => {
        if (details) {
            setValue(details.stats[tag].base_stat);
        }
    }, [details?.stats]);

    const MIN_STAT = calculateStats(tag, value, MIN_IV, MIN_EV, tag === "hp" ? undefined : BAD_NATURE);
    const MAX_STAT = calculateStats(tag, value, MAX_IV, MAX_EV, tag === "hp" ? undefined : GOOD_NATURE);

    return (
        <div className="flex pb-2 items-center justify-between w-full h-[48px]">
            <div className="h-full flex flex-col items-start justify-center bg-black/25 shrink-0 text-white p-2 rounded-[4px]">
                <span className="text-[1.25rem] leading-5">{properties.tag}</span>
                <span className="leading-4 text-[0.875rem] tracking-[0.5px] whitespace-nowrap">Base Value</span>
            </div>
            <div className="ml-2 h-full text-[1.5rem] leading-6 w-[60px] flex items-center justify-start shrink-0 rounded-l-[4px] pl-2 text-black" style={{ background: properties.colors[2], border: `4px solid ${properties.colors[2]}` }}>
                {value}
            </div>
            <div className="h-full w-full flex items-center justify-end px-2 text-base-white relative rounded-r-[4px] overflow-hidden" style={{ background: properties.colors[0] }}>
                <div className="flex flex-col items-end justify-center h-full">
                    <span className="text-[1.25rem] leading-4 py-[2px]">{MAX_STAT}</span>
                    <span className="leading-4 text-[0.875rem] tracking-[0.5px]">Max</span>
                </div>
                <div className="absolute left-0 top-0 flex flex-col transition-width duration-500 items-end justify-center h-full px-2 rounded-r-[4px]" style={{ background: properties.colors[1], width: `${Math.round(MIN_STAT / MAX_STAT * 100)}%` }}>
                    <span className="text-[1.25rem] leading-4 py-[2px]">{MIN_STAT}</span>
                    <span className="leading-4 text-[0.875rem] tracking-[0.5px]">Min</span>
                </div>
                <div className="absolute transition-width duration-500 left-0 top-0 h-full flex items-center px-2 rounded-r-[4px]" style={{ background: properties.colors[2], width: `${Math.round(value / MAX_STAT * 100)}%` }} />
            </div>
        </div>
    )
}

export default StatsDetails;