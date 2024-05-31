import { getMoveName } from "@/common/components/game/database/movesDB";
import { capitalize } from "@/common/utils/capitalize";
import React, { useContext, useEffect, useState } from "react";
import { FILTER_TYPE_COLORS } from "../../../constants";
import { EvolutionMethod } from "../../../interfaces/evolution";
import { DetailsContext } from "../../contexts";
import ImageSprites from "./ImageSprites";

type MethodsProps = {
    data: EvolutionMethod[]
};

const Methods: React.FC<MethodsProps> = ({ data }) => {
    const { palette } = useContext(DetailsContext);
    function isSame(a: EvolutionMethod, b: EvolutionMethod) { let ks1 = Object.keys(a).sort(); let ks2 = Object.keys(b).sort(); if (ks1.length !== ks2.length) return false; for (let i = 0; i < ks1.length; i++) { if (ks1[i] !== ks2[i]) { return false; } } return true; }

    return (
        <div className="flex flex-col leading-5 text-[1.125rem] grow gap-1 w-[256px] justify-center">
            <div className="w-full flex flex-col h-0 grow items-center border-y-2 border-l-2 bg-black/15" style={{ borderColor: palette[0] }}>
                {
                    structuredClone(data).reduce((acc: EvolutionMethod[], c: EvolutionMethod) => {
                        if (acc.length === 0) acc = [c];
                        else {
                            let inserted = false;
                            for (let i = 0; i < acc.length; i++) {
                                let current = acc[i];
                                let same = isSame(c, current);
                                if (same) {
                                    Object.entries(c).forEach(([k, v]) => {
                                        let set: { [key: string]: any } = {};
                                        let cVal = current[k];
                                        String(cVal).split(";").forEach(t => {
                                            set[t] = 0;
                                        })
                                        set[String(v)] = 0;
                                        current[k] = Object.keys(set).join(";");
                                    })
                                    inserted = true;
                                }
                            }

                            if (!inserted) {
                                acc.push(c);
                            }
                        }
                        return acc;
                    }, []).filter(e => { let k = Object.keys(e); return e["trigger"] === "level-up" ? k.length > 1 : k.length > 0 })
                        .map((methods: EvolutionMethod, i: number) => (
                            <div key={i} className="max-h-[192px] leading-4 grow flex flex-col text-base-white justify-center items-center text-center px-1">
                                <Method methods={methods} />
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

const TRIGGER: { [key: string]: string } = {
    "level-up": "leveling up",
    "trade": "trading",
    "use-item": "using",
    "shed": "an empty slot in party and an extra Poké Ball on hand",
    "spin": "spinning",
    "tower-of-darkness": "training in the Tower of Darkness",
    "tower-of-waters": "training in the Tower of Waters",
    "three-critical-hits": "landing three critical hits in a battle",
    "take-damage": "traveling after taking damage",
    "other": "other methods",
    "agile-style-move": "using move in the agile style at least 20 times",
    "strong-style-move": "using move in the strong style at least 20 times",
    "recoil-damage": "after losing at least 294 HP from recoil damage"
}

type Values = string | number | boolean;
const Description: React.FC<{ tag: string, value: Values }> = ({ tag, value }) => {
    switch (tag) {
        case "trigger":
            return <span>{TRIGGER[String(value)] ? `By ${TRIGGER[String(value)]}` : ""}</span>;
        case "turn_upside_down":
            return <span>turning 3DS upside down</span>;
        case "min_level":
            return <span>At Lv.{value}</span>;
        case "gender":
            return <span>{String(value) === "1" ? "Female" : (String(value) === "2" ? "Male" : "Unknown gender")} only</span>;
        case "time_of_day":
            return <span>At {value}time</span>
        case "location":
            return <span>At {String(value).split(";").map(t => capitalize(t)).join(', ')}</span>;
        case "relative_physical_stats":
            let d = parseInt(String(value));
            return <span>{isNaN(d) ? "???" : `while ATK is ${(d > 0 ? "higher" : (d < 0 ? "lower" : "equal to"))} than DEF`}</span>;
        case "known_move_type":
        case "party_type":
            return <span className="leading-5">while {tag === "party_type" ? "having" : "knowing"} a <span className="px-2 rounded-[4px]" style={{ background: FILTER_TYPE_COLORS[String(value)] }}>{value.toString().toUpperCase()}</span> type {tag === "party_type" ? "pokemon in the party" : "move"}</span>;
        case "min_affection":
            return <span>With Lv.{value} Affection</span>;
        case "needs_overworld_rain":
            return value && <span>while it is raining in the overworld</span>;
        case "min_happiness":
            return <span>With Friendship {`> ${value}`}</span>;
        case "min_beauty":
            return <span>With Beauty {`> ${String(value).replace(";", "/")}`}</span>;
        case "trade_species":
        case "party_species":
            return (
                <div className="flex flex-col items-center">
                    <span className="mb-1">{tag === "trade_species" ? "for a" : "while having a"}</span>
                    {
                        String(value).split(";").map((id: string, i: number) => (
                            <ImageSprites key={i} id={id} type="species" />
                        ))
                    }
                    {tag === "party_species" && <span>in the party</span>}
                </div>
            )
        case "item":
        case "held_item":
            return (
                <div className="flex flex-col items-center">
                    <span className="mb-1">{tag === "held_item" ? "while holding" : ""}</span>
                    {
                        String(value).split(";").map((id: string, i: number) => (
                            <ImageSprites key={i} id={id} type="item" />
                        ))
                    }
                </div>
            )
        case "known_move":
            return (
                <div className="flex flex-col items-center">
                    <span>while knowing</span>
                    {
                        String(value).split(";").map((id: string, i: number) => (
                            <KnownMove key={i} id={String(id)} />
                        ))
                    }
                </div>
            )
        default:
            return;
    }
}

const Method: React.FC<{ methods: EvolutionMethod }> = ({ methods }) => {
    return (
        Object.entries(methods).sort((a: [string, any], b: [string, any]) => (a[0] === "trigger" || b[0] === "trigger" ? -1 : 0)).map(([key, value], i: number) => (
            <Description key={i} tag={key} value={value} />
        ))
    )
}

const KnownMove: React.FC<{ id: string }> = ({ id }) => {
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        getMoveName(id).then(res => {
            setName(res);
        })
    }, [id]);

    return (
        <span>{capitalize(name)}</span>
    )
}

export default Methods;