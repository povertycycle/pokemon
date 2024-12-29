import { useContext } from "react";
import { PaletteContext } from "../_utils";

type FlavorTextProps = {
    flavorText?: string | null;
}

const FlavorText: React.FC<FlavorTextProps> = ({ flavorText }) => {
    const { palette, text } = useContext(PaletteContext);
    return (
        <div className="font-vcr-mono max-sm:py-8 max-sm:mb-2 grow w-full flex items-center italic tracking-wider text-[0.875rem] sm:text-[1.125rem] leading-5 sm:leading-6 px-8 text-center relative" style={{ background: `${palette[1]}1a` }}>
            {flavorText}
            <i className="absolute left-2 top-2 ri-double-quotes-l text-[1.25rem] sm:text-[1.75rem] h-[24px] sm:h-[36px] aspect-square shrink-0 flex items-center rounded-full justify-center" style={{ background: palette[1], color: text[1] }} />
            <i className="absolute bottom-2 right-2 ri-double-quotes-r text-[1.25rem] sm:text-[1.75rem] h-[24px] pl-[2px] sm:h-[36px] aspect-square shrink-0 flex items-center rounded-full justify-center" style={{ background: palette[1], color: text[1] }} />
        </div>
    )
}

export default FlavorText;