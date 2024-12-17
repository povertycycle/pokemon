import Typewriter from "@/common/components/_utils/Typewriter";
import { capitalize } from "@/common/utils/string";
import { useContext } from "react";
import { PaletteContext } from "../_utils";

const Name: React.FC<{ index: number; name: string; species: string }> = ({ index, name, species }) => {
    const { text } = useContext(PaletteContext);
    const identifiers = name && species ? name.replace(species, "").split("-").slice(1) : [];

    return (
        <div className={`sm:order-2 w-full flex justify-center items-center sm:py-1 gap-2 sm:gap-4 text-[1.25rem] sm:text-[1.75rem] ${text[1] === "#ffffff" ? "drop-shadow-[0_0_1px_#000000] sm:drop-shadow-[0_0_2px_#000000]" : ""}`} style={{ color: text[1] }}>
            <span>#{index}</span>
            <span><Typewriter text={capitalize(species)} duration={500} /></span>
            <div className="flex text-[0.75rem] sm:text-[1.25rem] leading-5 gap-1 text-black">
                {
                    identifiers.map((id, i) => (
                        <div className={`bg-base-white-soft h-fit px-3 sm:px-4 sm:py-1 flex items-center justify-center rounded-[16px]`} key={i}>
                            {id.toUpperCase()}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Name;