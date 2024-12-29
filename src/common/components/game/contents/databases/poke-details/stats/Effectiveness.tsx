import { TYPE_COLORS } from "@/common/constants/colors";
import { TYPE_EFFECTIVENESS } from "@/common/constants/types";
import { useContext, useState } from "react";
import { PaletteContext } from "../_utils";
import { Bookmark, BOOKMARK_DATA } from "../../bookmarks/_utils";

type EffectivenessProps = {
    types: string[],
}

const ORDER = ["4", "2", "1/2", "1/4", "0", "1"];

const EFFECTIVENESS_DATA: Record<string, { icon: string; color: string; title: string; power?: string; }> = {
    "0": {
        icon: "ri-close-fill",
        color: "#000000",
        title: "Immune",
    },
    "1/4": {
        icon: "ri-arrow-up-double-line",
        color: "#64ab40",
        title: "Resist",
        power: "\u00bc",
    },
    "1/2": {
        icon: "ri-arrow-up-s-line",
        color: "#5093d3",
        title: "Resist",
        power: "\u00bd",
    },
    "1": {
        icon: "ri-subtract-line",
        color: "#606060",
        title: "Normal",
    },
    "2": {
        icon: "ri-arrow-down-s-line",
        color: "#e65d00",
        title: "Weak",
    },
    "4": {
        icon: "ri-arrow-down-double-line",
        color: "#cc0000",
        title: "Weak",
    },
}

const Effectiveness: React.FC<EffectivenessProps> = ({ types }) => {
    const { palette } = useContext(PaletteContext);
    const { icon, id } = BOOKMARK_DATA[Bookmark.Effectiveness];
    const effectiveness = generateEffectiveness(types);

    return (
        <div id={id} className={`flex flex-col w-full`}>
            <div className="pb-2 section__header--default items-center gap-3" style={{ borderColor: palette[1] }}><i className={`${icon} text-[1.25rem] leading-4`} style={{ color: palette[1] }} /> Type Effectiveness</div>
            <div className="max-sm:mt-1 w-full flex flex-col p-2 sm:p-3 gap-2">
                {
                    ORDER.filter(o => Object.keys(effectiveness).includes(o)).map((order, i) => {
                        const _dat = EFFECTIVENESS_DATA[order];
                        return (
                            <div className="grid grid-cols-[128px_auto] sm:grid-cols-[160px_auto] w-full gap-2 items-start" key={i}>
                                <div className="flex shrink-0 items-center leading-5 sm:leading-6 text-[1rem] gap-1" style={{ color: _dat.color }}>
                                    <i className={`text-[1rem] sm:text-[1.5rem] ${_dat.icon}`} />
                                    <span className="">{_dat.title} <span className="text-[0.875rem] sm:text-[1rem]">x</span>{_dat.power ?? order}</span>
                                </div>
                                <Types types={effectiveness[order]} allowHide={order === "1"} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const Types: React.FC<{ types: string[]; allowHide: boolean }> = ({ types, allowHide }) => {
    const [expand, setExpand] = useState<boolean>(!allowHide);
    return (
        <div className="w-full flex flex-wrap gap-2 text-white text-[0.875rem] sm:text-[1rem]">
            {
                expand &&
                types.map((type, i) => (
                    <div key={i} className={`px-4 rounded-full flex items-center justify-center`} style={{ background: `${TYPE_COLORS[type]}` }}>
                        <span className="drop-shadow-[0_0_1px_black]">{type.toUpperCase()}</span>
                    </div>
                ))
            }
            {
                allowHide && <div className="sm:hover:bg-base-white-dark/50 text-center px-8 text-black bg-base-white-dark/50 rounded-full cursor-pointer" onClick={() => { setExpand(prev => !prev); }}>{!expand ? "EXPAND" : "COLLAPSE"}</div>
            }
        </div>
    )
}

function generateEffectiveness(types: string[]) {
    const effectiveness = Object.fromEntries(Object.keys(TYPE_EFFECTIVENESS).map(type => [type, 1]));
    types.forEach(type => {
        Object.entries(TYPE_EFFECTIVENESS[type]).forEach(([t, value]) => {
            effectiveness[t] *= value;
        })
    });
    return Object.entries(effectiveness).reduce((acc, [type, str]) => {
        const strength = (str === 0.5) ? "1/2" : (str === 0.25 ? "1/4" : str.toString());
        if (acc[strength]) {
            acc[strength].push(type);
        } else {
            acc[strength] = [type];
        }
        return acc;
    }, {} as Record<string, string[]>);
}

export default Effectiveness;