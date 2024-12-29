import { PalParkEncounter } from "@/common/interfaces/encounter";
import { useContext } from "react";
import { PaletteContext } from "../_utils";
import { capitalize } from "@/common/utils/string";

type PalParkProps = {
    data: PalParkEncounter[];
}

const PalPark: React.FC<PalParkProps> = ({ data }) => {
    const { palette } = useContext(PaletteContext);

    return (
        <div className="flex flex-col mb-2">
            <div className="text-center font-medium text-[1.rem] sm:text-[1.125rem]" style={{ background: `${palette[1]}40` }}>
                Pal Park
            </div>
            <div className="flex flex-col py-2 px-3" style={{ background: `${palette[1]}1a` }}>
                {
                    data.map(({ area, base_score, rate }, i) => (
                        <div className="flex gap-2 items-center" key={i}>
                            <span className="text-[1rem] sm:text-[1.125rem] font-medium">{capitalize(area)}</span> <span className="max-sm:text-[0.875rem] h-fit bg-black/10 px-2 rounded-full font-medium">Score {base_score}</span> <span className="max-sm:text-[0.875rem] h-fit bg-black/10 px-2 rounded-full font-medium">Rarity {rate}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PalPark;