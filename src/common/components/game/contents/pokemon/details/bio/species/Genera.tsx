import { useContext } from "react";
import { DetailsContext } from "../../contexts";
import Typewriter from "@/common/components/game/utils/Typewriter";

type MythLegendProps = {
    genera: string,
    is_mythical: boolean,
    is_legendary: boolean,
    is_baby: boolean,
}

const Genera: React.FC<MythLegendProps> = ({ genera, is_mythical, is_legendary, is_baby }) => {
    const { palette } = useContext(DetailsContext);

    return (
        <div className="shrink-0 w-full h-[32px] text-[1.25rem] leading-6 flex items-center justify-center bg-black/50 border-t text-base-white" style={{ borderColor: palette[0] }}>
            <Typewriter text={`${is_baby ? "(Baby) " : ""}${[is_mythical ? "Mythical" : undefined, is_legendary ? "Legendary" : undefined].filter(Boolean).join(" & ")} ${genera}`} duration={500} />
        </div>
    )
}

export default Genera;