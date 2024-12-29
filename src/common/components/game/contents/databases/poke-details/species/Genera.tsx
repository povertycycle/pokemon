import { useContext } from "react";
import { PaletteContext } from "../_utils";
import Typewriter from "@/common/components/_utils/Typewriter";

type GeneraProps = {
    genera?: string | null;
    category: {
        isMythical: boolean;
        isLegendary: boolean;
        isBaby: boolean;
    }
}

const Genera: React.FC<GeneraProps> = ({ genera, category }) => {
    const { palette, text } = useContext(PaletteContext);

    return (
        <div className="w-full text-[1rem] sm:text-[1.125rem] leading-7 flex items-center justify-center" style={{ background: palette[1], color: text[1] }}>
            <span className={`${text[1] === "#ffffff" ? "drop-shadow-[0_0_1px_#000000] sm:drop-shadow-[0_0_2px_#000000]" : ""}`}><Typewriter text={`The ${Object.entries(category).filter(c => c[1]).map(c => c[0].replace("is", "")).join(" ")} ${genera}`} duration={500} /></span>
        </div>
    )
}

export default Genera;