import Typewriter from "@/common/components/_utils/Typewriter";
import { capitalize } from "@/common/utils/capitalize";
import { useContext } from "react";
import { PaletteContext } from "../_utils";
import { TYPE_COLORS } from "@/constants/types";

type HeaderProps = {
    index: number;
    name: string;
    species: string;
    types: string[];
}

const Header: React.FC<HeaderProps> = ({ index, name, species, types }) => {
    const { palette, text } = useContext(PaletteContext);

    return (
        <div className="sm:sticky sm:w-fit sm:top-0 sm:left-4 z-[99] max-sm:w-full flex flex-col sm:rounded-b-[8px] px-1 pb-1 text-[1.25rem] sm:text-[1.5rem] leading-8 shadow-base-black" style={{ color: text[0], background: palette[0] }}>
            <Name index={index} name={name} species={species} />
            <Types types={types} />
        </div>
    )
}

export default Header;

const Name: React.FC<{ index: number; name: string; species: string }> = ({ index, name, species }) => {
    const { palette, text } = useContext(PaletteContext);
    const identifiers = name && species ? name.replace(species, "").split("-").slice(1) : [];

    return (
        <div className={`w-full flex justify-center items-center px-8 sm:py-1 gap-2 sm:gap-4`}>
            <span>#{index}</span>
            <span><Typewriter text={capitalize(species)} duration={500} /></span>
            <div className="flex text-[0.75rem] sm:text-[0.875rem] leading-5 gap-1">
                {
                    identifiers.map((id, i) => (
                        <div className={`h-fit px-3 sm:px-4 flex items-center justify-center rounded-[16px]`} key={i} style={{ background: palette[1], color: text[1] }}>
                            {id.toUpperCase()}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const Types: React.FC<{ types: string[] }> = ({ types }) => {
    return (
        <div className="flex gap-1 text-base-white text-[0.875rem] sm:text-[1rem] leading-6 sm:rounded-b-[6px] overflow-hidden">
            {
                types.map((t: string, i: number) => (
                    <div key={i} className={`w-full h-[24px] flex items-center justify-center`} style={{ background: TYPE_COLORS[t] }}>
                        <span className="drop-shadow-[0_0_1px_black]">{t.toUpperCase()}</span>
                    </div>
                ))
            }
        </div>
    )
}
