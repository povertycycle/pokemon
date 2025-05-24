import { Fragment, useEffect, useState } from "react";
import { IEvolution } from "../../../database/evolutions";
import { PokemonBase } from "../../../interfaces/pokemon";
import { MAIN_ICON } from "@/constants/game/main";
import { getSprite } from "../../../utils/sprites";
import { getPokemonData } from "../../../database/pokemon";
import { TYPE_COLORS } from "@/constants/game/colors";
import { ItemSprite } from "../ItemSprite";
import { usePalette } from "../../../hooks/usePalette";
import Link from "next/link";
import { GAME_DATABASE } from "@/constants/routes";
import { getMoveName } from "../../../database/move";

/**
 * Query selector id
 */
export const EVOLUTION_HTML_ID = "poke-evolution-";

/**
 * Evolution condition list
 */
export const Conditions: React.FC<
    Omit<IEvolution, "pokemon"> & { stage: number }
> = (props) => {
    return (
        <div
            className={`overflow-hidden flex flex-col relative z-1 text-xs sm:text-sm pl-1 pr-28 pb-1`}
        >
            {!!props.isBaby && (
                <BabyItem id={props.babyItemId} stage={props.stage} />
            )}
            {!!props.conditions && (
                <ul className="list-disc px-3 sm:px-6 w-fit pb-1 py-2">
                    {props.conditions.map((conditions, i) => (
                        <li key={i}>
                            <span className="brightness-110">
                                {Object.entries(conditions)
                                    .sort(
                                        ([keyA], [keyB]) =>
                                            ORDERS.indexOf(keyA) -
                                            ORDERS.indexOf(keyB)
                                    )
                                    .map(([method, value], j, arr) => (
                                        <Fragment key={j}>
                                            {j > 0 && " "}
                                            {METHODS[method]({
                                                value,
                                                stage: props.stage,
                                                end: j === arr.length - 1,
                                            })}
                                        </Fragment>
                                    ))}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

/**
 * Baby item condition
 */
const BabyItem: React.FC<{
    id?: number;
    stage: number;
}> = ({ id, stage }) => {
    const [parent, setParent] = useState<string>();
    const [parentColor, setParentColor] = useState<string>();

    useEffect(() => {
        const name = document.getElementById(
            `${EVOLUTION_HTML_ID}-${stage + 1}`
        );
        const color = name?.getAttribute("data-color");
        setParent(name?.innerText);
        setParentColor(color ?? undefined);
    }, []);

    return (
        <div className="flex flex-col sm:pt-1 pb-1">
            <span className="tracking-wide">
                Can be bred
                {!!parent && (
                    <>
                        {" "}
                        by
                        <span
                            className="font-medium px-1"
                            style={{ color: parentColor }}
                        >
                            {parent}
                        </span>
                    </>
                )}
                {!!id && (
                    <>
                        <span className="mr-1">while holding</span>
                        <div className="bg-black/15 rounded-semi w-fit my-1 font-medium pl-1 pr-3">
                            <ItemSprite id={id} />
                        </div>
                    </>
                )}
            </span>
            <span className="text-xxs sm:text-xs italic">*Prior to Gen XI</span>
        </div>
    );
};

/**
 * Constants
 */
const TRIGGERS: Record<string, string> = {
    "level-up": "leveling up",
    trade: "trading",
    "use-item": "using",
    shed: "having an empty slot in the party and an extra Poké Ball on hand",
    spin: "spinning",
    "tower-of-darkness": "training in the Tower of Darkness",
    "tower-of-waters": "training in the Tower of Waters",
    "three-critical-hits": "landing three critical hits in a battle",
    "take-damage": "traveling after taking damage",
    other: "other methods",
    "agile-style-move": "using move in the agile style at least 20 times",
    "strong-style-move": "using move in the strong style at least 20 times",
    "recoil-damage": "losing at least 294 HP from recoil damage",
};

type MethodProps = {
    value: string | boolean | number;
    stage: number;
    end: boolean;
};

const METHODS: Record<string, React.FC<MethodProps>> = {
    trigger: ({ value }) => (
        <>{TRIGGERS[String(value)] ? `By ${TRIGGERS[String(value)]}` : ""}</>
    ),
    item: ({ value, end }) =>
        typeof value === "number" && (
            <>
                <ItemSprite id={value} />
                {!end && " on "}
            </>
        ),
    gender: ({ value, stage }) => {
        const [children, setChildren] = useState<string>();
        const [color, setColor] = useState<string>();

        useEffect(() => {
            const elem = document.getElementById(
                `${EVOLUTION_HTML_ID}-${stage - 1}`
            );
            const color = elem?.getAttribute("data-color");
            setChildren(elem?.innerText);
            setColor(color ?? "");
        }, []);

        return (
            <>
                a{" "}
                <span className="font-medium">
                    {String(value) === "1"
                        ? "Female"
                        : String(value) === "2"
                        ? "Male"
                        : ""}{" "}
                    <span style={{ color }}>{children}</span>
                </span>
            </>
        );
    },
    min_level: ({ value }) => (
        <>
            to Lv.
            <span className="font-medium">{value}</span>
        </>
    ),
    location: ({ value }) => (
        <>
            at{" "}
            <span className="contents font-bold tracking-wide capitalize">
                {new Intl.ListFormat("en", {
                    style: "long",
                    type: "disjunction",
                }).format(
                    String(value)
                        .split(";")
                        .map((location) => location.replaceAll("-", " "))
                )}
            </span>
        </>
    ),
    min_affection: ({ value }) => (
        <>
            with Lv.
            <span className="contents font-bold">{value} 'Affection'</span>
        </>
    ),
    min_happiness: ({ value }) => (
        <>
            with a friendship value of{" "}
            <span className="font-bold contents">{value}</span>
        </>
    ),
    min_beauty: ({ value }) => (
        <>
            with a beauty value of <span className="font-medium">{value}</span>
        </>
    ),
    held_item: ({ value }) =>
        typeof value === "number" ? (
            <>
                while holding
                <ItemSprite id={value} />
            </>
        ) : (
            <span className="text-base-red-dark">-- No Item Found --"</span>
        ),
    known_move: ({ value }) =>
        typeof value === "number" ? (
            <>
                while knowing move {"\u2014"} <Move id={value} />
            </>
        ) : (
            <span className="text-base-red-dark">-- No Move Found --</span>
        ),
    known_move_type: ({ value }) => (
        <>
            while knowing any{" "}
            <span
                className="px-3 font-medium rounded-full text-xxs/3 sm:text-xs/4 text-white"
                style={{ background: TYPE_COLORS[String(value)] }}
            >
                {String(value).toUpperCase()}
            </span>{" "}
            type move
        </>
    ),
    party_type: ({ value }) => (
        <>
            while having a{" "}
            <span
                className="px-3 font-medium rounded-full text-xxs/3 sm:text-xs/4 text-white"
                style={{ background: TYPE_COLORS[String(value)] }}
            >
                {value.toString().toUpperCase()}
            </span>{" "}
            type pokemon in the party
        </>
    ),
    party_species: ({ value }) => (
        <>
            while having a{" "}
            {typeof value === "number" && <PokeSprite id={value} />} in the
            party
        </>
    ),
    relative_physical_stats: ({ value }) =>
        typeof value === "number" ? (
            <>
                While{" "}
                <span className="font-medium">
                    ATK is{" "}
                    {value > 0
                        ? "higher than"
                        : value < 0
                        ? "lower than"
                        : "equal to"}{" "}
                    DEF
                </span>
            </>
        ) : (
            "-- Evolution data corrupted --"
        ),
    turn_upside_down: () => <>and turning the 3DS upside down</>,
    time_of_day: ({ value }) => (
        <>
            at{" "}
            <span className="contents font-bold tracking-wider">
                {String(value)}time
            </span>
        </>
    ),
    needs_overworld_rain: () => <>while it is raining in the overworld</>,
    trade_species: ({ value }) => (
        <>for a {typeof value === "number" && <PokeSprite id={value} />}</>
    ),
};

const ORDERS = Object.keys(METHODS);

/**
 * Mini pokemon sprite
 */
const PokeSprite: React.FC<{ id: number }> = ({ id }) => {
    const [pokemon, setPokemon] = useState<PokemonBase | null>();

    useEffect(() => {
        if (pokemon === undefined) {
            getPokemonData(id)
                .then((res) => {
                    setPokemon(res);
                })
                .catch((err) => {
                    setPokemon(null);
                });
        }
    }, []);

    const Pokemon: React.FC<{ data: PokemonBase }> = ({ data }) => {
        const mainSprite = getSprite(data.data.sprites, MAIN_ICON);
        const { palette } = usePalette(mainSprite);

        return (
            <Link
                style={{ color: palette?.[0] }}
                target="_blank"
                href={`${GAME_DATABASE}/pokemon/p?id=${data.id}`}
            >
                {!!mainSprite ? (
                    <span className="ml-1.5 flex gap-1 items-center bg-black/15 rounded-semi w-fit my-1 font-medium pl-1 pr-3">
                        <img
                            alt=""
                            src={mainSprite}
                            className={`h-7 aspect-square`}
                        />
                        <span className="capitalize text-xs sm:text-sm">
                            {data.data.species}
                        </span>
                    </span>
                ) : (
                    <i className="ri-question-mark text-xl" />
                )}
            </Link>
        );
    };

    return !!pokemon ? (
        <Pokemon data={pokemon} />
    ) : (
        <span className="text-base-red-dark">"-- Missing Pokemon --"</span>
    );
};

/**
 * Move data name
 */
const Move: React.FC<{ id: number }> = ({ id }) => {
    const [name, setName] = useState<string | null>();

    useEffect(() => {
        getMoveName(id)
            .then((res) => {
                setName(res);
            })
            .catch((err) => {
                setName(null);
            });
    }, []);

    return name === null ? (
        <span className="text-base-red-dark">-- Move not found --</span>
    ) : (
        <span className="font-medium capitalize">
            {name?.replace("-", " ")}
        </span>
    );
};
