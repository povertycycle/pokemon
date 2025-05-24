import { Typewriter } from "@/components/loaders/Typewriter";
import { PaletteContext } from "@/stores/contexts";
import { useContext } from "react";

/**
 * Genus display
 */
export const Genus: React.FC<{
    genus?: string | null;
    category: {
        isMythical: boolean;
        isLegendary: boolean;
        isBaby: boolean;
    };
}> = ({ genus, category }) => {
    const {
        dark: { background, color },
    } = useContext(PaletteContext);

    return (
        <div
            className="w-full text-sm sm:text-base flex items-center justify-center py-1 font-medium tracking-wider"
            style={{ background, color }}
        >
            <span>
                <Typewriter
                    text={`The ${Object.entries(category)
                        .filter((c) => c[1])
                        .map((c) => c[0].replace("is", ""))
                        .join(" ")} ${genus}`}
                    duration={500}
                />
            </span>
        </div>
    );
};
