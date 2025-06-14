import { Unavailable } from "@/components/errors/Unavailable";
import { PokeDollars } from "@/components/icons/Game";
import { Spinner } from "@/components/loaders/Spinner";
import { FLING_EFFECT } from "@/constants/game/main";
import { BASE_API_URL_ITEM } from "@/constants/game/urls";
import { SENTENCES_REGEX } from "@/constants/regex";
import React, { useEffect, useState } from "react";
import { getVersionData } from "../pokemon/utils/versions";
import { getItemDetails } from "./database/items";
import { ItemData, ItemRequest } from "./interfaces/items";

interface DetailDisplayProps {
    details: ItemRequest | null;
    setDetails: (id: ItemRequest | null) => void;
}

/**
 * Item details display
 */
export const DetailDisplay: React.FC<DetailDisplayProps> = ({
    details,
    setDetails,
}) => {
    const [data, setData] = useState<ItemData | null>();

    useEffect(() => {
        if (details?.data) {
            setData(details.data);
        } else if (details?.id) {
            getItemDetails(details.id)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    setData(null);
                });
        }
    }, [details?.id]);

    return (
        <div
            className={`max-md:fixed max-md:left-0 max-md:top-0 w-screen md:max-w-80 lg:max-w-[480px] h-dvh sm:h-screen ${
                !details ? "max-md:max-h-0" : ""
            } overflow-hidden md:h-[calc(100vh-56px)] max-md:z-max md:sticky md:right-0 md:top-14 flex items-end`}
        >
            <div
                onClick={() => setDetails(null)}
                className="md:hidden w-full h-full absolute left-0 top-0 bg-black/65 z-0"
            />
            <div className="bg-white w-full h-full max-md:max-h-[75dvh] overflow-y-auto z-1 p-3 flex flex-col">
                {!details ? (
                    <span className="text-base-purple-7 tracking-wide m-auto text-xl">
                        Select an item
                    </span>
                ) : data === undefined ? (
                    <Spinner />
                ) : data === null ? (
                    <Unavailable url={BASE_API_URL_ITEM} />
                ) : (
                    <Data {...data} />
                )}
            </div>
        </div>
    );
};

const Data: React.FC<ItemData> = (item) => {
    return (
        <div className="flex flex-col w-full h-fit">
            <div className="mx-auto font-medium tracking-wide text-lg">
                {item.names?.find((n) => n.language === "en")?.name}
            </div>
            <div className="flex gap-1 items-center">
                <div className="w-20 h-20 p-4 flex items-center justify-center shrink-0">
                    {item?.sprite ? (
                        <img
                            alt=""
                            src={item.sprite}
                            width={80}
                            height={80}
                            className="w-full h-full"
                        />
                    ) : (
                        <i className="ri-question-mark text-2xl" />
                    )}
                </div>
                <p className="italic text-center text-xs sm:text-sm my-auto">
                    {item.descriptions.flavorText}
                </p>
            </div>
            <div className="flex flex-wrap gap-3 px-2 sm:px-3 text-xs sm:text-sm my-2">
                {item.cost ? (
                    <span className="flex items-center gap-1">
                        <PokeDollars />
                        <b>{item.cost}</b>
                    </span>
                ) : (
                    "-"
                )}
                {item.category && (
                    <>
                        <span className="bg-base-white rounded-semi px-3">
                            {CATEGORIES[item.category].pocket}
                        </span>
                        <span className="bg-base-white rounded-semi px-3">
                            {CATEGORIES[item.category].name}
                        </span>
                    </>
                )}
                {!!item.attributes && (
                    <>
                        {item.attributes.map((attr, i) => (
                            <span
                                className="bg-base-white rounded-semi px-3"
                                key={i}
                            >
                                {ATTRIBUTES[attr]}
                            </span>
                        ))}
                    </>
                )}
                {!!item.fling.power && (
                    <span className="bg-base-white rounded-semi px-3">
                        {item.fling.power}{" "}
                        <span className="text-sm">Fling Damage</span>
                    </span>
                )}
                {!!item.fling.effect && (
                    <span className="bg-base-white rounded-semi px-3">
                        {FLING_EFFECT[item.fling.effect]}
                    </span>
                )}
            </div>
            {!!item.descriptions.effect && (
                <>
                    <hr className="border-t my-2" />
                    <ul className="list-disc text-xs sm:text-sm px-4 flex flex-col gap-1">
                        {item.descriptions.effect
                            .match(SENTENCES_REGEX)
                            ?.map((t: string, i: number) => (
                                <li key={i}>{t}</li>
                            ))}
                    </ul>
                </>
            )}
            {!!item.games && (
                <>
                    <hr className="border-t my-2" />
                    <div
                        className={`flex flex-wrap text-xs sm:text-sm gap-3 my-2`}
                    >
                        {item.games.map((g) => (
                            <Version game={g} key={g} />
                        ))}
                    </div>
                </>
            )}
            {!!item.names && (
                <>
                    <hr className="border-t my-2" />
                    <div className="w-full flex flex-col text-xs sm:text-sm my-2">
                        {item.names.map((n, i) => (
                            <div
                                key={i}
                                className="flex justify-between w-full"
                            >
                                <span>{LANGUAGES[n.language]}</span>
                                <span>{n.name}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

/**
 * Version display
 */
const Version: React.FC<{ game: string }> = ({ game }) => {
    const { name, background } = getVersionData(game, { opacity: "33" });
    return (
        <div className="bg-base-white rounded-semi px-3" style={{ background }}>
            <span>{name}</span>
        </div>
    );
};

/**
 * Attribute descriptions
 */
const ATTRIBUTES: Record<string, string> = {
    countable: "Has a count in the bag",
    consumable: "Consumed when used",
    "usable-overworld": "Usable outside battle",
    "usable-in-battle": "Usable in battle",
    holdable: "Can be held by a Pokémon",
    "holdable-passive": "Works passively when held",
    "holdable-active": "Usable by a Pokémon when held",
    underground: "Appears in Sinnoh Underground",
};

const CATEGORIES: { [tag: string]: { name: string; pocket: string } } = {
    "stat-boosts": {
        name: "Stat boosts",
        pocket: "Battle Items",
    },
    "effort-drop": {
        name: "Effort drop",
        pocket: "Berries",
    },
    medicine: {
        name: "Medicine",
        pocket: "Berries",
    },
    other: {
        name: "Other",
        pocket: "Berries",
    },
    "in-a-pinch": {
        name: "In a pinch",
        pocket: "Berries",
    },
    "picky-healing": {
        name: "Picky healing",
        pocket: "Berries",
    },
    "type-protection": {
        name: "Type protection",
        pocket: "Berries",
    },
    "baking-only": {
        name: "Baking only",
        pocket: "Berries",
    },
    collectibles: {
        name: "Collectibles",
        pocket: "Items",
    },
    evolution: {
        name: "Evolution",
        pocket: "Items",
    },
    spelunking: {
        name: "Spelunking",
        pocket: "Items",
    },
    "held-items": {
        name: "Held items",
        pocket: "Items",
    },
    choice: {
        name: "Choice",
        pocket: "Items",
    },
    "effort-training": {
        name: "Effort training",
        pocket: "Items",
    },
    "bad-held-items": {
        name: "Bad held items",
        pocket: "Items",
    },
    training: {
        name: "Training",
        pocket: "Items",
    },
    plates: {
        name: "Plates",
        pocket: "Items",
    },
    "species-specific": {
        name: "Species-specific",
        pocket: "Items",
    },
    "type-enhancement": {
        name: "Type enhancement",
        pocket: "Items",
    },
    "event-items": {
        name: "Event items",
        pocket: "Key Items",
    },
    gameplay: {
        name: "Gameplay",
        pocket: "Key Items",
    },
    "plot-advancement": {
        name: "Plot advancement",
        pocket: "Key Items",
    },
    unused: {
        name: "Unused",
        pocket: "Key Items",
    },
    loot: {
        name: "Loot",
        pocket: "Items",
    },
    "all-mail": {
        name: "All mail",
        pocket: "Mail",
    },
    vitamins: {
        name: "Vitamins",
        pocket: "Medicine",
    },
    healing: {
        name: "Healing",
        pocket: "Medicine",
    },
    "pp-recovery": {
        name: "PP recovery",
        pocket: "Medicine",
    },
    revival: {
        name: "Revival",
        pocket: "Medicine",
    },
    "status-cures": {
        name: "Status cures",
        pocket: "Medicine",
    },
    mulch: {
        name: "Mulch",
        pocket: "Items",
    },
    "special-balls": {
        name: "Special balls",
        pocket: "Poké Balls",
    },
    "standard-balls": {
        name: "Standard balls",
        pocket: "Poké Balls",
    },
    "dex-completion": {
        name: "Dex completion",
        pocket: "Items",
    },
    scarves: {
        name: "Scarves",
        pocket: "Items",
    },
    "all-machines": {
        name: "All machines",
        pocket: "TMs and HMs",
    },
    flutes: {
        name: "Flutes",
        pocket: "Battle Items",
    },
    "apricorn-balls": {
        name: "Apricorn balls",
        pocket: "Poké Balls",
    },
    "apricorn-box": {
        name: "Apricorn Box",
        pocket: "Key Items",
    },
    "data-cards": {
        name: "Data Cards",
        pocket: "Key Items",
    },
    jewels: {
        name: "Jewels",
        pocket: "Items",
    },
    "miracle-shooter": {
        name: "Miracle Shooter",
        pocket: "Battle Items",
    },
    "mega-stones": {
        name: "Mega Stones",
        pocket: "Items",
    },
    memories: {
        name: "Memories",
        pocket: "Items",
    },
    "z-crystals": {
        name: "Z-Crystals",
        pocket: "Key Items",
    },
    "species-candies": {
        name: "Species candies",
        pocket: "Items",
    },
    "catching-bonus": {
        name: "Catching bonus",
        pocket: "Berries",
    },
    "dynamax-crystals": {
        name: "Dynamax crystals",
        pocket: "Items",
    },
    "nature-mints": {
        name: "Nature mints",
        pocket: "Medicine",
    },
    "curry-ingredients": {
        name: "Curry ingredients",
        pocket: "Items",
    },
    "tera-shard": {
        name: "Tera shard",
        pocket: "Items",
    },
    "sandwich-ingredients": {
        name: "Sandwich ingredients",
        pocket: "Items",
    },
    "tm-materials": {
        name: "TM-Materials",
        pocket: "Items",
    },
    picnic: {
        name: "Picnic",
        pocket: "Items",
    },
};

const LANGUAGES: Record<string, string> = {
    "ja-Hrkt": "日本語",
    roomaji: "Official roomaji",
    ko: "한국어",
    "zh-Hant": "Chinese (Traditional)",
    fr: "Français",
    de: "Deutsch",
    es: "Español",
    it: "Italian",
    en: "English",
    cs: "Czech",
    ja: "Japanese",
    "pt-BR": "Brazilian Portuguese",
    "zh-Hans": "Chinese (Simplified)",
};
