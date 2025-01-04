import { PokeDollars } from "@/common/components/_utils/PokeDollars";
import { TYPE_COLORS } from "@/common/constants/colors";
import { FLING_EFFECT } from "@/common/constants/item";
import { SENTENCES_REGEX } from "@/common/constants/regex";
import { getColorBetween } from "@/common/utils/colors";
import { capitalize } from "@/common/utils/string";
import Image from "next/image";
import { useState } from "react";
import { BerryFullData, FLAVORS } from "./_utils";


const Card: React.FC<{ data: BerryFullData; imageUrl: string; }> = ({ data, imageUrl }) => {
    const [show, setShow] = useState<boolean>(false);
    const lighter = getColorBetween(data.palette[0], "#ffffff");

    return (
        <div className="w-full flex flex-col h-full max-sm:border-b max-sm:border-black text-white/85" style={{
            background: `linear-gradient(135deg,${data.palette[1]}af,${data.palette[0]}af)`,
            color: lighter
        }}>
            <div className="flex flex-col w-full h-full bg-gradient-to-tr from-black/15 text-xs/4 sm:text-base/5">
                <div onClick={() => { setShow(true) }} className="flex flex-col w-full p-2 sm:p-3 relative">
                    <div className="flex gap-2 pl-1">
                        <div className="aspect-square h-full">
                            <Image src={imageUrl} alt="" width={40} height={40} className="p-[2px] h-full w-full rounded-full" style={{ background: lighter }} />
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="text-xl/6 sm:text-2xl/8 font-medium flex gap-4 justify-between">
                                <span>{capitalize(data.itemData.name)}</span>
                                <div title="Natural gift" className="cursor-help rounded-full text-[0.675rem]/4 sm:text-sm/5 px-2 h-fit border" style={{ borderColor: data.palette[0], background: TYPE_COLORS[data.details.naturalGift.type] }}><span className="drop-shadow-[0_0_1px_black] text-white">{data.details.naturalGift.type.toUpperCase()} {data.details.naturalGift.power}</span></div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex gap-[6px]">
                                    {data.details.flavors.map(({ flavor, potency }) => {
                                        const color = FLAVORS[flavor];
                                        return (
                                            !!potency &&
                                            <div key={flavor} className="flex items-center gap-1" style={{ color }}>
                                                <span>{capitalize(flavor)}</span><span className="text-[0.7em]/3 sm:text-[0.8em]/4 font-medium rounded-full px-1" style={{ color: "#000000a3", background: color }}>{potency}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="pl-1 mt-2 text-white/50 sm:h-[60px]" style={{ background: data.palette[0] + " text" }}>{data.itemData.data.descriptions.flavorText}</div>
                </div>
                <div className={`flex shrink-0 sm:mt-2 sm:pb-1 sm:px-3 max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:items-end max-sm:w-screen max-sm:z-50 overflow-hidden grow max-sm:h-full ${show ? "max-sm:max-h-dvh" : "max-sm:max-h-0 max-sm:delay-500"}`}>
                    <div onClick={() => { setShow(false) }} className={`${show ? "opacity-100" : "opacity-0"} max-sm:w-full max-sm:h-full sm:hidden bg-black/65 absolute z-0 left-0 top-0 transition-opacity`} />
                    <div className={`${show ? "max-sm:max-h-[75dvh]" : "max-sm:max-h-0"} mobile__template--card relative max-sm:bg-black`}>
                        <div className="sm:hidden w-full h-full absolute top-0 left-0 z-0" style={{
                            background: `linear-gradient(135deg,${data.palette[1]}80,${data.palette[0]}80)`
                        }} />
                        <div className="sm:hidden w-full flex items-center pl-6 py-[14px] text-[1.25rem] leading-6 relative z-1 bg-black/25">
                            <span className="font-medium">{capitalize(data.itemData.name)}</span>
                            <div className="absolute right-4">
                                <i onClick={() => { setShow(false) }} className="text-[1.5rem] ri-close-line" />
                            </div>
                        </div>
                        <div className="max-sm:p-3 max-sm:text-sm/5 relative flex flex-col grow overflow-y-auto">
                            <div className="grid grid-cols-3 gap-y-4 z-1 relative">
                                <div className="flex flex-col items-center">
                                    <span>Growth Time</span>
                                    <span><span className="font-bold text-[1.1em]">{data.details.growthTime}</span> hrs</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Max Harvest</span>
                                    <span><span className="font-bold text-[1.1em]">{data.details.maxHarvest}</span> berries</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Sell Price</span>
                                    <span className="font-bold text-[1.1em] flex gap-1">{(data.itemData.data.cost ?? 0) / 2}<PokeDollars color={lighter} /></span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Size</span>
                                    <span><span className="font-bold text-[1.1em]">{data.details.size / 10}</span> cm</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Firmness</span>
                                    <span className="font-bold text-[1.1em]">{capitalize(data.details.firmness)}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span>Smoothness</span>
                                    <span className="font-bold text-[1.1em] flex gap-1">{data.details.smoothness}</span>
                                </div>
                                <div className="flex flex-col italic col-span-3 sm:mt-1 text-[0.9em]/4">
                                    <span>*In Gen IV, soil dries by <span className="font-bold">{data.details.soilDryness}</span> every hour</span>
                                </div>
                            </div>
                            <ul className="list-disc my-2 sm:my-4 px-4 sm:px-6 flex flex-col grow">
                                {
                                    data.itemData.data.descriptions.effect?.match(SENTENCES_REGEX)?.map(((t: string, i: number) => (
                                        <li key={i}>
                                            {t}
                                        </li>
                                    )))
                                }
                                <li>
                                    {
                                        !!data.itemData.data.fling.effect ?
                                            FLING_EFFECT[data.itemData.data.fling.effect] :
                                            "No fling effect."
                                    }
                                    {` Fling power ${data.itemData.data.fling.power}`}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;