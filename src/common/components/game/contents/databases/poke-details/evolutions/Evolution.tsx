import { TYPE_COLORS } from "@/common/constants/colors";
import { usePokemonCard } from "@/common/hooks/game/usePokemonCard";
import { usePalette } from "@/common/hooks/usePalette";
import { capitalize } from "@/common/utils/string";
import { getMoveName } from "@/database/move-db";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { ItemSprite, PokeEvolution } from "./_utils";
import Spinner from "@/common/components/_utils/loading/Spinner";

type EvolutionProps = {
    data: PokeEvolution;
    isActive: boolean;
    parent?: string[];
    child?: string;
    single: boolean;
}

const Evolution: React.FC<EvolutionProps> = ({ data, isActive, parent, child, single }) => {
    const { pokemon, evolution } = data;
    const { palette, localUrl } = usePalette(pokemon.mainSprites.default);
    const identifiers = pokemon.name?.replace(pokemon.species, "").replaceAll("-", " ");

    return (
        <div className={`flex flex-col items-center justify-center relative overflow-hidden grow bg-black`} style={{ color: palette?.[0] }}>
            <div className="w-full h-full absolute top-0 left-0" style={{ background: `linear-gradient(90deg,${palette?.[1]}b3,${palette?.[0]}b3)` }} />
            <div className="w-full h-full flex flex-col justify-center bg-gradient-to-r from-black/35 relative">
                <div className={`absolute ${!!single ? "sm:left-[50%] sm:-translate-x-[50%]" : "sm:right-0"} max-sm:right-0 max-w-[128px] max-h-[128px] w-full aspect-square`}>
                    {
                        !isActive && <Link target="_blank" href={`/pokemon?id=${pokemon.id}`} className="peer w-full h-full absolute z-10 top-0 left-0" />
                    }
                    {
                        palette ?
                            <Image className={`h-full w-full object-cover z-0 sm:peer-hover:scale-125`} src={localUrl} alt="" width={128} height={128} /> :
                            <Spinner />
                    }
                </div>
                <div className={`max-w-[480px] w-full h-[72px] flex relative`}>
                    <div className="h-full aspect-square flex items-center justify-center">
                        {
                            !!pokemon.mainSprites.icon ?
                                <Image alt="" src={pokemon.mainSprites.icon} width={64} height={64} className="object-contain w-full h-full" /> :
                                <i className="ri-question-mark text-[2.5rem]" style={{ color: palette?.[1] }} />
                        }
                    </div>
                    <div className="w-full flex flex-col justify-center relative">
                        <div className="text-white absolute flex top-0 left-0 leading-[18px] text-[0.75rem] sm:text-[0.875rem] rounded-b-[4px] overflow-hidden max-w-full">
                            {
                                pokemon.types.map((t: string, i: number) => (
                                    <div key={i} className={`w-[78px] sm:w-[92px] flex items-center justify-center`} style={{ background: TYPE_COLORS[t] }}>
                                        <span className="drop-shadow-[0_0_1px_black] sm:drop-shadow-[0_0_2px_black]">{t.toUpperCase()}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="w-full h-full flex flex-col justify-end pb-[2px] z-1">
                            <span className="text-[0.875rem] sm:text-[1rem] leading-3">#{`${pokemon.index}`.padStart(4, "0")}</span>
                            <div className="flex text-[1.125rem] sm:text-[1.25rem] items-center">
                                <span className="leading-6">{capitalize(pokemon.species)}</span>
                                {
                                    !!identifiers && <div className={`h-fit px-2 text-[0.75rem] sm:text-[0.875rem] leading-4 text-black ml-2 flex items-center justify-center bg-base-white-soft rounded-[12px]`}>
                                        {identifiers.toUpperCase()}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`overflow-hidden flex flex-col relative z-1 text-[0.875rem] sm:text-[1rem] leading-5 px-3 sm:mb-auto w-fit pr-24 pb-3`}>
                    {!!evolution.isBaby && <BabyItem id={evolution.babyItemId} parent={parent} palette={palette} />}
                    {
                        !!evolution.conditions && <ul className="list-disc px-3 sm:px-5 w-fit pb-1 py-2">
                            {
                                evolution.conditions.map((conditions, i) => (
                                    <li key={i}>
                                        {
                                            Object.entries(conditions)
                                                .sort(([keyA], [keyB]) => {
                                                    const orders = Object.keys(METHODS);
                                                    return orders.indexOf(keyA) - orders.indexOf(keyB)
                                                })
                                                .map(([method, value], j, arr) => (
                                                    <Fragment key={j}>
                                                        {j > 0 && " "}
                                                        {METHODS[method]({ value, palette, child, end: j === arr.length - 1 })}
                                                    </Fragment>
                                                ))
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export default Evolution;

const BabyItem: React.FC<{ id?: string; parent?: string[]; palette?: string[] }> = ({ id, parent, palette }) => {
    return (
        <div className="flex flex-col max-sm:mt-1 sm:py-2">
            <span className="text-[0.75rem] italic">Prior to Gen XI</span>
            <span>
                Can be bred{!!parent && <> by<span className="font-medium px-1 text-[1rem] sm:text-[1.125rem] brightness-[175%]" style={{ color: palette?.[1] }}>{new Intl.ListFormat('en', { style: 'long', type: 'disjunction' }).format(parent.map(poke => capitalize(poke)))}</span></>}<ItemSprite id={id} palette={palette} phrase={"while holding"} />
            </span>
        </div>
    )
}

const TRIGGERS: Record<string, string> = {
    "level-up": "leveling up",
    "trade": "trading",
    "use-item": "using",
    "shed": "having an empty slot in the party and an extra Poké Ball on hand",
    "spin": "spinning",
    "tower-of-darkness": "training in the Tower of Darkness",
    "tower-of-waters": "training in the Tower of Waters",
    "three-critical-hits": "landing three critical hits in a battle",
    "take-damage": "traveling after taking damage",
    "other": "other methods",
    "agile-style-move": "using move in the agile style at least 20 times",
    "strong-style-move": "using move in the strong style at least 20 times",
    "recoil-damage": "losing at least 294 HP from recoil damage"
}

type MethodProps = {
    value: string | boolean | number;
    palette?: string[];
    child?: string;
    end: boolean;
}

const METHODS: Record<string, React.FC<MethodProps>> = {
    "trigger": ({ value }) => (
        <>{TRIGGERS[String(value)] ? `By ${TRIGGERS[String(value)]}` : ""}</>
    ),
    "item": ({ value, palette, end }) => (
        typeof value === "string" ? <ItemSprite id={value} palette={palette} phrase="a" trail={end ? "" : "on"} /> : "-- No Item Found --"
    ),
    "gender": ({ value, child, palette }) => (
        <>a <span className="text-[1rem] sm:text-[1.125rem] font-medium">{String(value) === "1" ? "Female" : (String(value) === "2" ? "Male" : "")} <span className="brightness-[175%]" style={{ color: palette?.[0] }}>{capitalize(child)}</span></span></>
    ),
    "min_level": ({ value }) => (
        <>to Lv.<span className="font-medium text-[1rem] sm:text-[1.125rem]">{value}</span></>
    ),
    "location": ({ value }) => (
        <>at <span className="font-medium text-[1rem] sm:text-[1.125rem]">{new Intl.ListFormat('en', { style: 'long', type: 'disjunction' }).format(String(value).split(";").map(location => capitalize(location)))}</span></>
    ),
    "min_affection": ({ value }) => (
        <>with Lv.<span className="font-medium text-[1rem] sm:text-[1.125rem]">{value}</span> {"'Affection'"}</>
    ),
    "min_happiness": ({ value }) => (
        <>with a friendship value of <span className="text-[1rem] sm:text-[1.125rem] font-medium">{value}</span></>
    ),
    "min_beauty": ({ value }) => (
        <>with a beauty value of <span className="text-[1rem] sm:text-[1.125rem] font-medium">{value}</span></>
    ),
    "held_item": ({ value, palette }) => (
        typeof value === "string" ? <ItemSprite id={value} palette={palette} phrase="while holding a" /> : <span className="text-base-red-dark">-- No Item Found --"</span>
    ),
    "known_move": ({ value }) => (
        typeof value === "string" ? <>while knowing move {"\u2014"} <Move id={value} /></> : <span className="text-base-red-dark">-- No Move Found --</span>
    ),
    "known_move_type": ({ value }) => (
        <>while knowing any <span className="px-3 font-medium rounded-full leading-3 text-[0.75rem] sm:text-[0.875rem] text-white" style={{ background: TYPE_COLORS[String(value)] }}>{value.toString().toUpperCase()}</span> type move</>
    ),
    "party_type": ({ value }) => (
        <>while having a <span className="px-3 font-medium rounded-full leading-3 text-[0.75rem] sm:text-[0.875rem] text-white" style={{ background: TYPE_COLORS[String(value)] }}>{value.toString().toUpperCase()}</span> type pokemon in the party</>
    ),
    "party_species": ({ value, palette }) => (
        <>While having a {typeof value === "string" && !isNaN(parseInt(value)) && <PokeSprite id={value} palette={palette} />} in the party</>
    ),
    "relative_physical_stats": ({ value }) => (
        typeof value === "number" ?
            <>While <span className="text-[1rem] sm:text-[1.125rem] font-medium">ATK is {value > 0 ? "higher than" : (value < 0 ? "lower than" : "equal to")} DEF</span></> :
            "-- Evolution data corrupted --"
    ),
    "turn_upside_down": () => (
        <>and turning the 3DS upside down</>
    ),
    "time_of_day": ({ value }) => (
        <>at <span className="text-[1rem] sm:text-[1.125rem] font-medium">{capitalize(String(value))}time</span></>
    ),
    "needs_overworld_rain": () => (
        <>while it is raining in the overworld</>
    ),
    "trade_species": ({ value, palette }) => (
        <>for a {typeof value === "string" && !isNaN(parseInt(value)) && <PokeSprite id={value} palette={palette} />}</>
    ),
}


const PokeSprite: React.FC<{ id: string; palette?: string[] }> = ({ id, palette }) => {
    const data = usePokemonCard(id);

    return (
        !!data ?
            <>
                <span className="font-medium brightness-[175%] text-[1rem] sm:text-[1.125rem]" style={{ color: palette?.[1] }}>{capitalize(data.species)}</span> {
                    !!data.mainSprites.icon ?
                        <Image width={30} height={30} alt="" src={data.mainSprites.icon} className="inline align-text-bottom -mb-[2px] sm:-mb-1 h-[24px] sm:h-[30px] w-[24px] sm:w-[30px]" /> :
                        <i className="ri-question-mark text-[1.5rem]" />
                }
            </> :
            <span className="text-base-red-dark">"-- Missing Pokemon --"</span>
    )
}

const Move: React.FC<{ id: string }> = ({ id }) => {
    const [name, setName] = useState<string | null>();

    useEffect(() => {
        getMoveName(id).then(res => {
            setName(res);
        })
    }, [])

    return (
        name === null ?
            <span className="text-base-red-dark">-- Move not found --</span> :
            <span className="font-medium text-[1rem] sm:text-[1.125rem]">{capitalize(name)}</span>
    )
}