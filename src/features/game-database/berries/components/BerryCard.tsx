import { BerryData, BerryDetails, BerryRequest } from "../interfaces/berries";
import { useInView } from "@/utils/hooks";
import { getBerryDetails } from "../database/berries";
import { Spinner } from "@/components/loaders/Spinner";
import { useState } from "react";
import { TYPE_COLORS } from "@/constants/game/colors";
import { getItemDetails } from "../../items/database/items";
import { SENTENCES_REGEX } from "@/constants/regex";
import { usePalette } from "../../pokemon/hooks/usePalette";
import { PokeDollars } from "@/components/icons/Game";
import { FLING_EFFECT } from "../../items/constants/constants";

/**
 * Berry card display
 */
export const BerryCard: React.FC<BerryRequest> = (props) => {
    const [data, setData] = useState<BerryDetails | null | undefined>();

    const ref = useInView({
        onIntoView: () => {
            if (data === undefined) {
                let berryData = props.data;
                new Promise((resolve, reject) => {
                    if (!!berryData) {
                        resolve(berryData);
                    } else {
                        getBerryDetails(props.id)
                            .then((res) => {
                                berryData = res.data;
                                resolve(res.data);
                            })
                            .catch((err) => {
                                reject(err?.message);
                            });
                    }
                })
                    .then((res: any) => {
                        return getItemDetails(res.itemId);
                    })
                    .then((res) => {
                        if (!berryData) {
                            throw new Error("[Error]: BC-38");
                        }
                        setData({
                            berry: berryData,
                            item: res.data,
                        });
                    })
                    .catch((err) => {
                        setData(null);
                    });
            }
        },
    });

    return (
        <div
            ref={ref}
            className="w-full flex items-center justify-center sm:rounded-lg overflow-hidden bg-black"
        >
            {data === undefined ? (
                <Spinner />
            ) : data === null || !data.berry || !data.item ? (
                <div className="text-base-red-dark">Berry Data Missing</div>
            ) : (
                <Card data={data} id={props.id} name={props.name} />
            )}
        </div>
    );
};

/**
 * Berry card component
 */
const Card: React.FC<{
    id: number;
    name: string;
    data: Required<BerryDetails>;
}> = ({ id, name, data: { item, berry } }) => {
    const [show, setShow] = useState<boolean>(false);
    const { palette } = usePalette(item.sprite);
    const lighter = getColorBetween(palette?.[0] ?? "", "#ffffff");

    return !palette ? (
        <Spinner />
    ) : (
        <div
            className="w-full flex flex-col h-full max-sm:border-b max-sm:border-black text-white/85"
            style={{
                background: `linear-gradient(135deg,${palette?.[1]}af,${palette?.[0]}af)`,
                color: lighter,
            }}
        >
            <div className="flex flex-col w-full h-full bg-gradient-to-tr from-black/15">
                <div
                    onClick={() => {
                        setShow(true);
                    }}
                    className="flex flex-col w-full p-2 sm:p-3 relative"
                >
                    <div className="flex gap-2 pl-1">
                        <div className="aspect-square h-full">
                            {item?.sprite && (
                                <img
                                    src={item.sprite}
                                    alt=""
                                    className="p-0.5 h-full w-full rounded-full"
                                    style={{
                                        background: lighter,
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="font-medium flex gap-4 justify-between">
                                <span className="capitalize text-sm sm:text-base">
                                    {name} berry
                                </span>
                                <div
                                    title="Natural gift"
                                    className="cursor-help rounded-full text-xxs sm:text-xs h-fit border overflow-hidden"
                                    style={{
                                        borderColor: palette?.[0],
                                        background:
                                            TYPE_COLORS[berry.naturalGift.type],
                                    }}
                                >
                                    <div className="text-white flex items-center justify-center gap-2 bg-black/15 px-2">
                                        {berry.naturalGift.type.toUpperCase()}{" "}
                                        {berry.naturalGift.power}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 text-xxs sm:text-xs">
                                {berry.flavors.map(({ flavor, potency }) => {
                                    const color = FLAVORS[flavor];
                                    return (
                                        !!potency && (
                                            <div
                                                key={flavor}
                                                className="flex items-center gap-1"
                                                style={{ color }}
                                            >
                                                <span className="font-medium capitalize">
                                                    {flavor}
                                                </span>
                                                <span
                                                    className="font-medium rounded-full px-1 text-black"
                                                    style={{
                                                        background: color,
                                                    }}
                                                >
                                                    {potency}
                                                </span>
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div
                        className="pl-1 mt-2 text-white/50 text-xs sm:text-sm sm:h-14"
                        style={{ background: palette?.[0] + " text" }}
                    >
                        {item.descriptions.flavorText}
                    </div>
                </div>
                <div
                    className={`flex shrink-0 sm:mt-2 sm:pb-1 sm:px-3 max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:items-end max-sm:w-screen max-sm:z-50 overflow-hidden grow max-sm:h-full ${
                        show
                            ? "max-sm:max-h-dvh"
                            : "max-sm:max-h-0 max-sm:delay-500"
                    }`}
                >
                    <div
                        onClick={() => {
                            setShow(false);
                        }}
                        className={`${
                            show ? "opacity-100" : "opacity-0"
                        } max-sm:w-full max-sm:h-full sm:hidden bg-black/65 absolute z-0 left-0 top-0 transition-opacity`}
                    />
                    <div
                        className={`${
                            show ? "max-sm:max-h-[75dvh]" : "max-sm:max-h-0"
                        } mobile__template--card overflow-y-auto max-sm:bg-black`}
                    >
                        <div
                            className="sm:hidden w-full h-full absolute top-0 left-0 z-0"
                            style={{
                                background: `linear-gradient(135deg,${palette?.[1]}80,${palette?.[0]}80)`,
                            }}
                        />
                        <div className="sm:hidden px-6 py-4 w-full flex justify-between font-bold text-jalin-blue-deep gap-4 text-xl/8 items-center">
                            <span className="capitalize">{`${name} berry`}</span>
                            <div
                                onClick={() => {
                                    setShow(false);
                                }}
                            >
                                <i className="text-2xl/6 ri-close-line font-medium sm:hover:text-jalin-blue-deep sm:text-jalin-blue-base" />
                            </div>
                        </div>
                        <div className="max-sm:p-3 max-sm:text-xs sm:text-sm relative flex flex-col grow overflow-y-auto">
                            <div className="grid grid-cols-3 gap-y-4 z-1 relative">
                                <div className="flex flex-col items-center">
                                    <span>Growth Time</span>
                                    <span className="tracking-wider">
                                        <span className="font-bold text-[1.1em]">
                                            {berry.growthTime}
                                        </span>{" "}
                                        hrs
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Max Harvest</span>
                                    <span>
                                        <span className="font-bold text-[1.1em]">
                                            {berry.maxHarvest}
                                        </span>{" "}
                                        berries
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Sell Price</span>
                                    <span className="font-bold text-[1.1em] flex gap-1 items-center">
                                        {(item.cost ?? 0) / 2}
                                        <PokeDollars color={lighter} />
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Size</span>
                                    <span>
                                        <span className="font-bold text-[1.1em]">
                                            {berry.size / 10}
                                        </span>{" "}
                                        cm
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Firmness</span>
                                    <span className="font-bold text-[1.1em]">
                                        {berry.firmness}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Smoothness</span>
                                    <span className="font-bold text-[1.1em] flex gap-1">
                                        {berry.smoothness}
                                    </span>
                                </div>
                                <div className="flex flex-col italic col-span-3 sm:mt-1 text-[0.9em]">
                                    <span>
                                        *In Gen IV, soil dries by{" "}
                                        <span className="font-bold">
                                            {berry.soilDryness}
                                        </span>{" "}
                                        every hour
                                    </span>
                                </div>
                            </div>
                            <ul className="list-disc my-2 sm:my-4 px-4 sm:px-6 flex flex-col grow">
                                {item.descriptions.effect
                                    ?.match(SENTENCES_REGEX)
                                    ?.map((t: string, i: number) => (
                                        <li key={i}>{t}</li>
                                    ))}
                                <li>
                                    {!!item.fling.effect
                                        ? FLING_EFFECT[item.fling.effect]
                                        : "No fling effect."}
                                    {` Fling power ${item.fling.power}`}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Berry flavor color
 */
const FLAVORS: Record<string, string> = {
    spicy: "#ff9a82",
    dry: "#abc2f8",
    sweet: "#f7d3de",
    bitter: "#9ad67d",
    sour: "#f7d961",
};

/**
 * Get color in between two hexes
 */
function getColorBetween(a: string, b: string) {
    const p = (color: any) => parseInt(color, 16);
    const d = [p(b.slice(1, 3)), p(b.slice(3, 5)), p(b.slice(5))];
    return `#${[p(a.slice(1, 3)), p(a.slice(3, 5)), p(a.slice(5))]
        .map((l, i) => Math.round(l + (d[i] - l) * 0.5))
        .map((l) => l.toString(16).padStart(2, "0"))
        .join("")}`;
}
