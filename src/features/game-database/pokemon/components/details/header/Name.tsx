import { Typewriter } from "@/components/loaders/Typewriter";
import { PaletteContext } from "@/stores/contexts";
import { useContext } from "react";
import { getIdentifiers } from "../../../utils/strings";

/**
 * Name display
 */
export const Name: React.FC<{
    index: number;
    name: string;
    species: string;
    icon?: string | null;
}> = ({ index, name, species, icon }) => {
    const {
        dark: { background, color },
    } = useContext(PaletteContext);
    const identifiers = getIdentifiers(name, species);

    return (
        <div
            className={`sm:order-2 w-full h-8 sm:h-full flex justify-center items-center gap-2 text-base sm:text-lg`}
            style={{ color }}
        >
            <span className="text-white/75 text-xs/6 sm:text-sm/6">
                #{String(index).padStart(4, "0")}
            </span>
            <span className="capitalize text-base/6 sm:text-lg/6">
                <Typewriter text={species} duration={500} />
            </span>
            {!!identifiers && (
                <span
                    className={`text-xs sm:text-sm whitespace-nowrap text-white/75`}
                >
                    {identifiers.toUpperCase()}
                </span>
            )}
            <div className="h-full aspect-square flex items-center justify-center rounded-semi bg-base-white p-0.5">
                {!!icon ? (
                    <img alt="" className="w-full h-full" src={icon} />
                ) : (
                    <i
                        className="ri-question-mark text-xl"
                        style={{ color: background }}
                    />
                )}
            </div>
        </div>
    );
};
