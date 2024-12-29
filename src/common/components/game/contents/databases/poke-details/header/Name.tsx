import Typewriter from "@/common/components/_utils/Typewriter";
import { capitalize } from "@/common/utils/string";
import { useContext } from "react";
import { PaletteContext } from "../_utils";
import Image from "next/image";

const Name: React.FC<{ index: number; name: string; species: string; icon: string }> = ({ index, name, species, icon }) => {
    const { palette, text } = useContext(PaletteContext);
    const identifiers = name && species ? name.replace(species, "").replaceAll("-", " ") : "";

    return (
        <div className={`sm:order-2 w-full max-sm:h-[40px] flex justify-center items-center sm:py-1 gap-2 text-[1.25rem] sm:text-[1.75rem]`} style={{ color: text[1] }}>
            <div className="h-[calc(100%-8px)] aspect-square flex items-center justify-center rounded-[6px] bg-base-white p-[2px]">
                {
                    !!icon ?
                        <Image width={80} height={80} className="w-full h-full" alt="" src={icon} /> :
                        <i className="ri-question-mark text-[2.5rem]" style={{ color: palette[0] }} />
                }
            </div>
            <span className={`ml-2 ${text[1] === "#ffffff" ? "drop-shadow-[0_0_1px_#000000] sm:drop-shadow-[0_0_2px_#000000]" : ""}`}>#{index}</span>
            <span className={`${text[1] === "#ffffff" ? "drop-shadow-[0_0_1px_#000000] sm:drop-shadow-[0_0_2px_#000000]" : ""}`}><Typewriter text={capitalize(species)} duration={500} /></span>
            {
                !!identifiers && <div className={`text-black text-[0.75rem] whitespace-nowrap sm:text-[1.125rem] leading-5 sm:leading-6 mt-[2px] sm:mt-1 bg-base-white-soft h-fit px-3 sm:px-4 flex items-center justify-center rounded-[16px]`}>
                    {identifiers.toUpperCase()}
                </div>
            }
        </div>
    )
}

export default Name;