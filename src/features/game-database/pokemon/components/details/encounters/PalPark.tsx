import { useContext } from "react";
import { PalParkEncounter } from "../../../interfaces/pokemon";
import { PaletteContext } from "@/stores/contexts";

type PalParkProps = {
    data: PalParkEncounter[];
};

/**
 * Pal park data
 */
export const PalPark: React.FC<PalParkProps> = ({ data }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);

    return (
        data.length > 0 && (
            <div className="flex flex-col mb-2 sm:break-inside-avoid-column">
                <div
                    className="text-center font-medium text-sm sm:text-base py-1"
                    style={{ background: `${background}40` }}
                >
                    Pal Park
                </div>
                <div
                    className="flex flex-col py-2 px-3"
                    style={{ background: `${background}1a` }}
                >
                    {data.map(({ area, base_score, rate }, i) => (
                        <div
                            className="flex gap-2 items-center text-xxs sm:text-sm tracking-wide"
                            key={i}
                        >
                            <span className="text-xs sm:text-base capitalize font-medium">
                                {area}
                            </span>
                            <span className="h-fit bg-black/10 px-2 sm:px-4 rounded-full font-medium">
                                Score {base_score}
                            </span>{" "}
                            <span className="h-fit bg-black/10 px-2 sm:px-4 rounded-full font-medium">
                                Rarity {rate}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};
