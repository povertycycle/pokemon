import { PaletteContext } from "@/stores/contexts";
import { useContext, useState } from "react";
import { BOOKMARK_DATA } from "../header/Bookmarks";
import { TYPE_COLORS } from "@/constants/game/colors";
import { PokeType } from "../../ui/PokeType";

type EffectivenessProps = {
    types: string[];
};

/**
 * Constants
 */
const ORDER = ["4", "2", "1/2", "1/4", "0", "1"];

const EFFECTIVENESS_DATA: Record<
    string,
    { icon: string; color: string; title: string; power?: string }
> = {
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
};

type Effectiveness = Record<string, number>;

const TYPE_EFFECTIVENESS: Record<string, Effectiveness> = {
    normal: { fighting: 2, ghost: 0 },
    fighting: {
        flying: 2,
        rock: 0.5,
        bug: 0.5,
        psychic: 2,
        dark: 0.5,
        fairy: 2,
    },
    flying: {
        fighting: 0.5,
        ground: 0,
        rock: 2,
        bug: 0.5,
        grass: 0.5,
        electric: 2,
        ice: 2,
    },
    poison: {
        fighting: 0.5,
        poison: 0.5,
        ground: 2,
        bug: 0.5,
        grass: 0.5,
        psychic: 2,
        fairy: 0.5,
    },
    ground: { poison: 0.5, rock: 0.5, water: 2, grass: 2, electric: 0, ice: 2 },
    rock: {
        normal: 0.5,
        fighting: 2,
        flying: 0.5,
        poison: 0.5,
        ground: 2,
        steel: 2,
        fire: 0.5,
        water: 2,
        grass: 2,
    },
    bug: {
        fighting: 0.5,
        flying: 2,
        ground: 0.5,
        rock: 2,
        fire: 2,
        grass: 0.5,
    },
    ghost: { normal: 0, fighting: 0, poison: 0.5, bug: 0.5, ghost: 2, dark: 2 },
    steel: {
        normal: 0.5,
        fighting: 2,
        flying: 0.5,
        poison: 0,
        ground: 2,
        rock: 0.5,
        bug: 0.5,
        steel: 0.5,
        fire: 2,
        grass: 0.5,
        psychic: 0.5,
        ice: 0.5,
        dragon: 0.5,
        fairy: 0.5,
    },
    fire: {
        ground: 2,
        rock: 2,
        bug: 0.5,
        steel: 0.5,
        fire: 0.5,
        water: 2,
        grass: 0.5,
        ice: 0.5,
        fairy: 0.5,
    },
    water: {
        steel: 0.5,
        fire: 0.5,
        water: 0.5,
        grass: 2,
        electric: 2,
        ice: 0.5,
    },
    grass: {
        flying: 2,
        poison: 2,
        ground: 0.5,
        bug: 2,
        fire: 2,
        water: 0.5,
        grass: 0.5,
        electric: 0.5,
        ice: 2,
    },
    electric: { flying: 0.5, ground: 2, steel: 0.5, electric: 0.5 },
    psychic: { fighting: 0.5, bug: 2, ghost: 2, psychic: 0.5, dark: 2 },
    ice: { fighting: 2, rock: 2, steel: 2, fire: 2, ice: 0.5 },
    dragon: {
        fire: 0.5,
        water: 0.5,
        grass: 0.5,
        electric: 0.5,
        ice: 2,
        dragon: 2,
        fairy: 2,
    },
    dark: { fighting: 2, bug: 2, ghost: 0.5, psychic: 0, dark: 0.5, fairy: 2 },
    fairy: {
        fighting: 0.5,
        poison: 2,
        bug: 0.5,
        steel: 2,
        dragon: 0,
        dark: 0.5,
    },
};

/**
 * Effectiveness componenets
 */
export const Effectiveness: React.FC<EffectivenessProps> = ({ types }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const { icon, id } = BOOKMARK_DATA.effectiveness;
    const effectiveness = generateEffectiveness(types);

    return (
        <div id={id} className={`flex flex-col w-full`}>
            <div
                className="section__header--default items-center"
                style={{ borderColor: background }}
            >
                <i className={icon} style={{ color: background }} />
                Type Effectiveness
            </div>
            <div className="w-full flex flex-col p-2 sm:p-3 gap-2">
                {ORDER.filter((o) =>
                    Object.keys(effectiveness).includes(o)
                ).map((order, i) => {
                    const eff = EFFECTIVENESS_DATA[order];
                    return (
                        <div
                            key={i}
                            className="grid grid-cols-[112px_auto] sm:grid-cols-[128px_auto] w-full gap-4 sm:gap-8 items-start"
                        >
                            <div className="flex shrink-0 items-center gap-1 tracking-wider h-5">
                                <i
                                    style={{ color: eff.color }}
                                    className={`text-base sm:text-lg font-bold ${eff.icon}`}
                                />
                                <div className="text-xs sm:text-sm flex items-center justify-between w-full">
                                    <span>{eff.title} </span>
                                    <span>
                                        x
                                        <span className="text-sm sm:text-base font-medium">
                                            {eff.power ?? order}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <Types
                                types={effectiveness[order]}
                                allowHide={order === "1"}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

/**
 * Type list
 */
const Types: React.FC<{ types: string[]; allowHide: boolean }> = ({
    types,
    allowHide,
}) => {
    const [expand, setExpand] = useState<boolean>(!allowHide);
    return (
        <div className="w-full flex flex-wrap gap-2 items-center text-white text-xs sm:text-sm">
            {expand &&
                types.map((type) => (
                    <PokeType className="rounded-full" type={type} key={type} />
                ))}
            {allowHide && (
                <div
                    className="text-center px-4 bg-white outline-1 outline outline-black rounded-full text-black cursor-pointer"
                    onClick={() => {
                        setExpand((prev) => !prev);
                    }}
                >
                    {!expand ? "Expand" : "Collapse"}
                </div>
            )}
        </div>
    );
};

/**
 * Helper to generate list of effectiveness
 */
function generateEffectiveness(types: string[]) {
    const effectiveness = Object.fromEntries(
        Object.keys(TYPE_EFFECTIVENESS).map((type) => [type, 1])
    );
    types.forEach((type) => {
        Object.entries(TYPE_EFFECTIVENESS[type]).forEach(([t, value]) => {
            effectiveness[t] *= value;
        });
    });
    return Object.entries(effectiveness).reduce((acc, [type, str]) => {
        const strength =
            str === 0.5 ? "1/2" : str === 0.25 ? "1/4" : str.toString();
        if (acc[strength]) {
            acc[strength].push(type);
        } else {
            acc[strength] = [type];
        }
        return acc;
    }, {} as Record<string, string[]>);
}
