import { PaletteContext } from "@/stores/contexts";
import { useContext } from "react";

type FlavorTextProps = {
    flavorText?: string | null;
};

/**
 * Flavor text display
 */
export const FlavorText: React.FC<FlavorTextProps> = ({ flavorText }) => {
    const {
        light,
        dark: { background },
    } = useContext(PaletteContext);
    return (
        <div
            style={{ background: `${light.background}1a` }}
            className="font-vcr-mono max-sm:py-8 grow w-full flex items-center italic tracking-wider sm:tracking-widest text-xs sm:text-base px-8 text-center relative"
        >
            {flavorText}
            <i
                className="absolute left-2 top-2 ri-double-quotes-l text-sm sm:text-base h-6 aspect-square shrink-0 flex items-center rounded-full justify-center"
                style={{ background: `${background}1a`, color: background }}
            />
            <i
                className="absolute bottom-2 right-2 ri-double-quotes-r text-sm sm:text-base h-6 aspect-square shrink-0 flex items-center rounded-full justify-center"
                style={{ background: `${background}1a`, color: background }}
            />
        </div>
    );
};
