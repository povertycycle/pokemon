import { Properties, STATS_PROPERTIES } from "@/common/constants/stats";
import { Stats as S } from "@/common/interfaces/pokemon";
import { useContext } from "react";
import { PaletteContext } from "../_utils";
import { Bookmark, BOOKMARK_DATA } from "../../bookmarks/_utils";

type StatsProps = {
    stats: S;
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
    const { palette } = useContext(PaletteContext);
    const { id, icon } = BOOKMARK_DATA[Bookmark.Stats];

    return (
        <>
            <div id={id} className="pb-2 section__header--default items-center gap-3" style={{ borderColor: palette[1] }}><i className={`${icon} text-[1.25rem] leading-4`} style={{ color: palette[1] }} /> Stats</div>
            <div className="w-full flex flex-col gap-1">
                <div className={`grid grid-cols-[72px_auto_36px_36px] py-[2px] font-medium sm:py-1 px-2 sm:px-3 sm:grid-cols-[128px_auto_64px_48px] w-full text-[0.875rem] sm:text-[1rem]`} style={{ background: `${palette[1]}1a` }}>
                    <span>Name</span>
                    <span>Base</span>
                    <span className="text-center">Min</span>
                    <span className="text-center">Max</span>
                </div>
                {
                    Object.entries(STATS_PROPERTIES).map(([tag, properties], i) => (
                        <Stat key={i} tag={tag} properties={properties} data={stats[tag]} />
                    ))
                }
            </div>
            <div className="flex px-2 sm:px-3 mt-2 gap-2 w-full">
                <span className="text-[1rem] sm:text-[1.125rem] shrink-0 font-semibold flex">EV yield(s):</span>
                <div className="max-sm:justify-end flex w-full items-end flex-wrap text-[0.875rem] sm:text-[1rem] gap-2">
                    {
                        Object.entries(stats).filter(s => !!s[1].effort).map(([stat, { effort }], i) => {
                            let properties = STATS_PROPERTIES[stat];
                            return (
                                <div className="flex gap-2" key={i}>
                                    <span className="font-medium" style={{ color: properties.color }}>{properties.tag}</span>
                                    <span>[{effort} EV]</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col text-[0.75rem] sm:text-[0.875rem] mt-4 sm:mt-auto pb-1 pt-4 px-2 leading-4 text-end w-full">
                <span>Max stats are based on 31 IV, 255 EV, and a favorable nature, while Min stats are based on 0 IV, 0 EV, and a disadvantageous nature</span>
            </div>

        </>
    )
}

export default Stats;

function baseCalc(value: number, iv: number, ev: number) {
    return Math.floor((2 * value) + iv + Math.floor(ev / 4));
}

function calculateStats(stat: number, iv: number, ev: number, nature?: number) {
    return (
        !nature ?
            baseCalc(stat, iv, ev) + 110 :
            Math.floor((baseCalc(stat, iv, ev) + 5) * nature)
    )
}

const Stat: React.FC<{ tag: string; properties: Properties; data: { baseStat: number; effort: number; } }> = ({ tag, properties, data }) => {
    const MIN_STAT = calculateStats(data.baseStat, 0, 0, tag === "hp" ? undefined : 0.9);
    const MAX_STAT = calculateStats(data.baseStat, 31, 252, tag === "hp" ? undefined : 1.1);
    return (
        <div className="leading-5 grid grid-cols-[72px_36px_auto_36px_36px] sm:grid-cols-[128px_48px_auto_64px_48px] sm:py-[2px] px-2 sm:px-3 w-full text-[0.875rem] sm:text-[1rem] grow items-center">
            <span className="font-medium">{properties.tag}</span>
            <span>{data.baseStat}</span>
            <div className="h-[12px] w-full bg-black/10 rounded-full overflow-hidden">
                <div className="h-full rounded-r-full" style={{ width: `${Math.round((data.baseStat / 255) * 1000) / 10}%`, background: properties.color }} />
            </div>
            <span className="text-center">{MIN_STAT}</span>
            <span className="text-center">{MAX_STAT}</span>
        </div>
    )
}