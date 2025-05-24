import { useContext } from "react";
import { IStats } from "../../../interfaces/pokemon";
import { PaletteContext } from "@/stores/contexts";
import { BOOKMARK_DATA } from "../header/Bookmarks";

/**
 * Constants
 */
type Properties = {
    tag: string;
    color: string;
};

const STATS_PROPERTIES: Record<string, Properties> = {
    hp: {
        tag: "HP",
        color: "#FF0000",
    },
    attack: {
        tag: "ATK",
        color: "#F08030",
    },
    defense: {
        tag: "DEF",
        color: "#F8D030",
    },
    "special-attack": {
        tag: "SP-ATK",
        color: "#6890F0",
    },
    "special-defense": {
        tag: "SP-DEF",
        color: "#78C850",
    },
    speed: {
        tag: "SPD",
        color: "#F85888",
    },
};

type StatsProps = {
    stats: IStats;
};

export const Stats: React.FC<StatsProps> = ({ stats }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const { id, icon } = BOOKMARK_DATA.stats;

    return (
        <>
            <div
                id={id}
                className="section__header--default"
                style={{ borderColor: background }}
            >
                <i className={icon} style={{ color: background }} />
                Stats
            </div>
            <div className="w-full flex flex-col gap-1 text-sm sm:text-base">
                <div
                    className={`grid grid-cols-[72px_auto_36px_36px] py-1 font-medium px-3 sm:grid-cols-[128px_auto_64px_48px] w-full`}
                    style={{ background: `${background}1a` }}
                >
                    <span>Name</span>
                    <span>Base</span>
                    <span className="text-center">Min</span>
                    <span className="text-center">Max</span>
                </div>
                {Object.entries(STATS_PROPERTIES).map(
                    ([tag, properties], i) => (
                        <Stat
                            key={i}
                            tag={tag}
                            properties={properties}
                            data={stats[tag]}
                        />
                    )
                )}
            </div>
            <div className="flex px-3 mt-2 gap-2 w-full text-sm sm:text-base">
                <span className="shrink-0 font-semibold flex">
                    EV yield(s):
                </span>
                <div className="max-sm:justify-end flex w-full items-end flex-wrap gap-2">
                    {Object.entries(stats)
                        .filter((s) => !!s[1].effort)
                        .map(([stat, { effort }], i) => {
                            let properties = STATS_PROPERTIES[stat];
                            return (
                                <div className="flex gap-2" key={i}>
                                    <span
                                        className="font-medium"
                                        style={{ color: properties.color }}
                                    >
                                        {properties.tag}
                                    </span>
                                    <span>[{effort} EV]</span>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="flex flex-col text-xs sm:text-sm mt-4 sm:mt-auto pb-1 pt-4 px-2 text-end w-full">
                <span>
                    Max stats are based on 31 IV, 255 EV, and a favorable
                    nature, while Min stats are based on 0 IV, 0 EV, and a
                    disadvantageous nature
                </span>
            </div>
        </>
    );
};

/**
 * Helper to calculat ebase calculation
 */
function baseCalc(value: number, iv?: number, ev?: number) {
    return Math.floor(2 * value + (iv ?? 0) + Math.floor((ev ?? 0) / 4));
}

/**
 * Helper to calculate stats based on wiki formula
 */
function calculateStats(
    stat: number,
    nature?: number,
    iv?: number,
    ev?: number
) {
    return !nature
        ? baseCalc(stat, iv, ev) + 110
        : Math.floor((baseCalc(stat, iv, ev) + 5) * nature);
}

/**
 * Stats list
 */
const Stat: React.FC<{
    tag: string;
    properties: Properties;
    data: { baseStat: number; effort: number };
}> = ({ tag, properties, data }) => {
    const MIN_STAT = calculateStats(
        data.baseStat,
        tag === "hp" ? undefined : 0.9
    );
    const MAX_STAT = calculateStats(
        data.baseStat,
        tag === "hp" ? undefined : 1.1,
        31,
        252
    );

    return (
        <div className="grid grid-cols-[72px_36px_auto_36px_36px] sm:grid-cols-[128px_48px_auto_64px_48px] px-3 w-full grow items-center">
            <span className="font-medium">{properties.tag}</span>
            <span>{data.baseStat}</span>
            <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-r-full"
                    style={{
                        width: `${
                            Math.round((data.baseStat / 255) * 1000) / 10
                        }%`,
                        background: properties.color,
                    }}
                />
            </div>
            <span className="text-center">{MIN_STAT}</span>
            <span className="text-center">{MAX_STAT}</span>
        </div>
    );
};
