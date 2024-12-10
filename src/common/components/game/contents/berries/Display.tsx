import styles from "@/common/styles/custom.module.scss"
import { capitalize } from "@/common/utils/capitalize"
import { generateBackground, isDark } from "@/common/utils/colors"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getItemData } from "../../database/itemsDB"
import Typewriter from "../../../_utils/Typewriter"
import { PokeDollars } from "../_utils/PokeDollars"
import { ItemData } from "../items/constants"
import { BerryData } from "./constants"
import { TYPE_COLORS } from "../../../../../constants/types"

const FLAVORS: { [key: string]: string } = {
    "spicy":
        // "#FF0000"
        "#A60000"
    ,
    "dry":
        // "#6890F0"
        "#445E9C"
    ,
    "sweet":
        // "#F85888"
        "#A13959"
    ,
    "bitter":
        // "#78C850"
        "#4E8234"
    ,
    "sour":
        // "#F8D030"
        "#A1871F"
}


type DisplayProps = {
    berries: BerryData[]
}

const Display: React.FC<DisplayProps> = ({ berries }) => {
    return (
        <div className={`w-full h-full justify-center flex items-center bg-black`}>
            <div className={`w-full h-full pt-24 pl-[10%] pr-[calc(10%+8px)] pb-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 bg-sp-atk-dark/50 overflow-y-scroll ${styles.overflowWhite}`}>
                {
                    berries.map((berry, i) => (
                        <Berry key={i} data={berry} />
                    ))
                }
            </div>
        </div>
    )
}

const Berry: React.FC<{ data: BerryData }> = ({ data }) => {
    const [item, setItem] = useState<ItemData | null>(null);
    const [palette, setPalette] = useState<string[]>(["#000000"]);

    useEffect(() => {
        if (!item)
            getItemData(data.item).then(res => {
                let dat = res;
                if (dat?.sprites) {
                    generateBackground(dat.sprites, 4, 15).then(res => {
                        setItem(dat);
                        setPalette(res);
                    });
                } else {
                    setItem(dat);
                }
            })
    }, [])

    return (
        item &&
        <div className="w-full shrink-0 flex flex-col relative border-2" style={{ background: `${palette[1]}80`, borderColor: palette[0] }}>
            <div className="w-full flex items-center justify-start px-4 text-[1.25rem] py-1 text-base-white border-b-2 tracking-[0.5px] drop-shadow-[0_0_2px_black]" style={{ borderColor: palette[0] }}>{(item?.names?.find(n => n.language === "en")?.name ?? item?.name).toUpperCase()}</div>
            <div className="absolute right-0 top-0 h-[56px] border-l-2 border-b-2" style={{ background: palette[1], borderColor: palette[0] }}>
                {item.cost ? <span className="text-base-white w-full h-full justify-center flex px-4 items-center text-[1.5rem] leading-8 gap-2 bg-black/50"><PokeDollars color="white" size={20} />{item.cost.toLocaleString()}</span> : "-"}
            </div>
            <div className="flex h-[96px]">
                <div className="h-full aspect-square p-4 flex items-center justify-center shrink-0 border-r-2" style={{ borderColor: palette[0], background: `${palette[1]}` }}>
                    {
                        item.sprites ? <Image alt="" src={item.sprites} width={96} height={96} className="w-full h-full" /> : <i className="ri-question-mark text-[2.5rem]" />
                    }
                </div>
                <div className="h-full text-base-white text-base flex grow items-end pb-2 gap-2 px-2">
                    {
                        data.flavors.map((f, i) => (
                            <span className="flex flex-col w-full items-center gap-1" key={i}>
                                <span className="text-end" style={{ fontSize: `${20 + (f.potency / 5 * 2)}px` }}>{f.potency}</span>
                                <div className="shadow-[-2px_2px_4px_2px_#0000003a] w-full border rounded-[10px] text-[0.875rem] flex items-center justify-center leading-5" style={{ background: `linear-gradient(135deg,${FLAVORS[f.flavor]},#0000003e)` }}>
                                    <span className="z-[1] text-base-white tracking-[0.5px]">{capitalize(f.flavor)}</span>
                                </div>
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className={`w-full flex flex-col text-base-white grow`}>
                <p className="italic text-center leading-4 font-gb text-[0.625rem] border-t-2 py-4 px-2 drop-shadow-[0_0_2px_black]" style={{ borderColor: palette[0] }}>{item.flavor_text}</p>
                <div className="flex text-[0.875rem] w-full px-4 gap-1 py-2 items-center justify-between border-t" style={{ borderColor: palette[0] }}>
                    <span className="text-[1.125rem]">{data.size}<span className="text-base">mm</span></span>
                    <span className="flex gap-1 items-center">Firmness<span className="text-[1.125rem]">{`[${data.firmness.split("-").map(t => capitalize(t)).join(" ")}]`}</span></span>
                    <span className="flex gap-1 items-center">Smoothness<span className="text-[1.125rem]">{`[${data.smoothness}]`}</span></span>
                </div>
                <div className="flex w-full text-center border-t text-[1.5rem]" style={{ borderColor: palette[0] }}>
                    {
                        [
                            { head: <i className="ri-time-line" title="Growth time" />, value: data.growth_time },
                            { head: (item.sprites ? <Image title="Maximum harvest" alt="" src={item.sprites} width={32} height={32} className="h-full" /> : <i className="ri-question-mark text-[1.5rem]" />), value: data.max_harvest },
                            { head: <i className="ri-water-percent-line" title="Soil moisture" />, value: data.soil_dryness },
                            { head: <div title="Natural gift" className="text-[1.25rem] w-full flex items-center justify-center" style={{ background: TYPE_COLORS[data.natural_gift.type], color: isDark(TYPE_COLORS[data.natural_gift.type]) ? "white" : "black" }}>{data.natural_gift.type.toUpperCase()}</div>, value: data.natural_gift.power }
                        ].map(({ head, value }, i) => (
                            <div key={i} className="flex flex-col w-full h-[64px]">
                                <div className="h-[32px] flex items-center justify-center">{head}</div>
                                <span className="text-[1.25rem]">{value}</span>
                            </div>
                        ))
                    }
                </div>
                <ul className="list-disc leading-4 px-8 py-8 flex flex-col gap-4 tracking-[0.5px] border-t grow" style={{ borderColor: palette[0] }}>
                    {
                        // item?.effect ?
                        //     item.effect.match(SENTENCES_REGEX)?.map(((t: string, i: number) => (
                        //         <li key={i}>
                        //             <Typewriter text={t} duration={1.5} />
                        //         </li>
                        //     ))) :
                        //     <li>- - -</li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Display;