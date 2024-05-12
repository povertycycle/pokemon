import { isDark } from "@/common/utils/colors";
import Typewriter from "../../../../utils/Typewriter";
import { useContext } from "react";
import { DetailsContext } from "../contexts";

type NameProps = {
    name?: string | null,
    species?: string | null,
    index?: number | null,
}

const Name: React.FC<NameProps> = ({ name, species, index }) => {
    const { palette } = useContext(DetailsContext);
    let identifiers = name && species ? name.replace(species, "").split("-").slice(1) : [];
    const base = palette.at(-1);

    return (
        <div className="absolute left-[16px] top-0 z-[1] flex flex-col border-x-2 border-b-2 rounded-b-[10px] overflow-hidden" style={{ borderColor: base, color: isDark(base) ? "#f0f0f0" : "#000000" }}>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <IndexName base={base} index={`#${index}` ?? "???"} species={species ?? "??????????"} />
                <Identifiers identifiers={identifiers} palette={palette} />
            </div>
        </div>
    )
}

const IndexName: React.FC<{ base?: string, index: string, species: string }> = ({ base, index, species }) => {
    return (
        <div className={`w-full flex justify-between items-center text-[1.5rem] leading-8 tracking-[0px] px-16 gap-4`} style={{ background: base }}>
            <div className={`shrink-0`}>{index}</div>
            <Typewriter text={species.split("-").map(text => (text.charAt(0).toUpperCase() + text.slice(1))).join(" ")} duration={500} />
        </div>
    )
}

const Identifiers: React.FC<{ identifiers: string[], palette: string[] }> = ({ identifiers, palette }) => {
    return (
        identifiers.length > 0 &&
        <div className="w-full flex justify-between gap-1 text-base leading-4 bg-black/25" style={{}}>
            {
                identifiers.map((id: string, i: number) => (
                    <div className={`${i !== 0 ? "border-l-2" : ""} flex items-center justify-center w-full tracking-[2px] text-white py-1 px-2`} key={i} style={{
                        borderColor: palette.at(-1),
                        color: isDark(palette[0]) ? "#f0f0f0" : "#000000"
                    }}>
                        {id.toUpperCase()}
                    </div>
                ))
            }
        </div>
    )
}

export default Name;