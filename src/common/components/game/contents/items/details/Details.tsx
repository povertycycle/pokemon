import { capitalize } from "@/common/utils/string"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ATTRIBUTES, FLING_EFFECT, LANGUAGES } from "./constants"
import { PokeDollars } from "../../_utils/PokeDollars"
import styles from "@/common/styles/custom.module.scss";

type DetailsProps = {
    item: any;
}

const Details: React.FC<DetailsProps> = ({ item }) => {
    return (
        <div className="w-[20%] h-full bg-x-dark pl-1 py-1">
            {
                !item ?
                    <div className="text-base-white w-full h-full flex items-center justify-center text-[2rem] bg-black/50">
                        Select an item
                    </div> :
                    <div className="flex flex-col w-full gap-1 h-full">
                        <div className="w-full py-[6px] flex items-center justify-center text-center bg-base-white text-[1.25rem]">
                            {/* <Typewriter text={item.names?.find(n => n.language === "en")?.name ?? capitalize(item.name)} duration={500} /> */}
                        </div>
                        <div className="flex gap-1">
                            <div className="w-[96px] h-[96px] p-4 flex items-center justify-center bg-base-white shrink-0">
                                {
                                    item?.sprites ? <Image alt="" src={item.sprites} width={96} height={96} className="w-full h-full" /> : <i className="ri-question-mark text-[2.5rem]" />
                                }
                            </div>
                            <div className="p-2 grow flex flex-col bg-base-white justify-center leading-5">
                                {item.cost ? <span className="flex items-center gap-1 text-[1.5rem] leading-8"><PokeDollars />{item.cost.toLocaleString()}</span> : "-"}
                                <ul className="list-disc pl-[20px]">
                                    {/* <li>{CATEGORIES[item.category].pocket}</li>
                                    <li>{CATEGORIES[item.category].name}</li> */}
                                </ul>
                            </div>
                        </div>
                        <div className={`w-full flex flex-col gap-1 bg-base-white p-2 h-full max-h-full overflow-x-hidden overflow-y-auto ${styles.overflowPurple}`}>
                            <p className="italic text-center leading-4 my-2 font-gb text-[0.625rem]">{item.flavor_text}</p>
                            {
                                !!item.attributes &&
                                <>
                                    <hr className="border-t border-x-dark" />
                                    <ul className="list-disc px-[20px]">
                                        {
                                            // item.attributes.map((attr, i) => (
                                            //     <li key={i} className="">{ATTRIBUTES[attr]}</li>
                                            // ))
                                        }
                                    </ul>
                                </>
                            }
                            {
                                (!!item.fling_effect || !!item.fling_power) &&
                                <>
                                    <hr className="border-t border-x-dark" />
                                    <div className="flex flex-col gap-4 leading-5 my-2 px-2">
                                        {!!item.fling_power && <span className="text-center text-[1.25rem]">{item.fling_power} <span className="text-[0.875rem]">Fling Damage</span></span>}
                                        {!!item.fling_effect && <span>{FLING_EFFECT[item.fling_effect]}</span>}
                                    </div>
                                </>
                            }
                            {
                                // !!item.effect &&
                                // <>
                                //     <hr className="border-t border-x-dark" />
                                //     <p className="leading-4 my-2 px-1 flex flex-col gap-1">
                                //         {item.effect.match(SENTENCES_REGEX)?.map(((t: string, i: number) => (
                                //             <span key={i}>
                                //                 <Typewriter text={t} duration={1.5} />
                                //             </span>
                                //         )))}
                                //     </p>
                                // </>
                            }
                            {
                                !!item.baby_trigger_for &&
                                <>
                                    <hr className="border-t border-x-dark" />
                                    <BabyTriggerItem id={item.baby_trigger_for} />
                                </>
                            }
                            {
                                !!item.names &&
                                <>
                                    <hr className="border-t border-x-dark" />
                                    <div className="w-full flex flex-col">
                                        {
                                            // item.names.map((n, i) => (
                                            //     <div key={i} className="flex justify-between w-full">
                                            //         <span>{n.name}</span>
                                            //         <span>{LANGUAGES[n.language]}</span>
                                            //     </div>
                                            // ))
                                        }
                                    </div>
                                </>
                            }
                            {
                                !!item.games &&
                                <>
                                    <hr className="border-t border-x-dark" />
                                    <div className={`w-[calc(100%+2px)] flex flex-col grow overflow-y-scroll h-0 ${styles.overflowPurple}`}>
                                        {
                                            // item.games.map((g, i) => (
                                            //     <div className="w-full text-center text-base-white">
                                            //         <span className="drop-shadow-[0_0_1px_black]">{getGameName(g)}</span>
                                            //     </div>
                                            // ))
                                        }
                                    </div>
                                </>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

const BabyTriggerItem: React.FC<{ id: string }> = ({ id }) => {
    const [baby, setBaby] = useState<string | null>(null);
    const [evolution, setEvolution] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            // fetchEvolutionChain(id).then(res => {
            //     Promise.all([res[0][0].species, res[1][0].species].map(s => (getVariants(s)))).then(res => {
            //         let a = res?.[0]?.[0];
            //         let b = res?.[1]?.[0];
            //         if (a && b) {
            //             setBaby(a);
            //             setEvolution(b);
            //         }
            //     })
            // })
        }
    }, [id]);

    return (
        <div className="flex justify-center items-center gap-1">
            <span>For</span>
            {/* <ImageSprites id={baby} type="species" />
            <span>to evolve to</span>
            <ImageSprites id={evolution} type="species" /> */}
        </div>
    )
}

export default Details;