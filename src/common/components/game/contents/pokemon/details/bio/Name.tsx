import { isDark } from "@/common/utils/colors";
import Typewriter from "../../../../utils/Typewriter";
import { useContext } from "react";
import { DetailsContext } from "../contexts";
import { FILTER_TYPE_COLORS } from "../../constants";

type NameProps = {
    name?: string | null,
    species?: string | null,
    index?: number | null,
    types: string[]
}

const Name: React.FC<NameProps> = ({ name, species, index, types }) => {
    const { palette } = useContext(DetailsContext);
    let identifiers = name && species ? name.replace(species, "").split("-").slice(1) : [];
    const base = palette.at(-1);

    return (
        <div className="absolute left-[16px] top-0 z-[1] flex flex-col border-x-2 border-b-2 rounded-b-[10px] overflow-hidden shadow-base-black" style={{
            borderColor: base, color: isDark(base) ? "#f0f0f0" : "#000000",
            background: base
        }}>
            <IndexName base={base} index={`#${index}` ?? "???"} species={species ?? "??????????"} />
            <Identifiers identifiers={identifiers} background={palette[0]} />
            <Types types={types} />
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

const Identifiers: React.FC<{ identifiers: string[], background: string }> = ({ identifiers, background }) => {
    return (
        identifiers.length > 0 &&
        <div className="w-full flex justify-between gap-1 text-base px-[2px] pb-[2px]">
            {
                identifiers.map((id: string, i: number) => (
                    <div className={`flex tracking-[2px] items-center justify-center w-full shadow-[inset_0_0_4px_2px_#00000080] text-white py-[2px] px-2`} key={i} style={{
                        background: background,
                        color: isDark(background) ? "#f0f0f0" : "#000000"
                    }}>
                        {id.toUpperCase()}
                    </div>
                ))
            }
        </div>
    )
}

const Types: React.FC<{ types: string[] }> = ({ types }) => {
    return (
        <div className="flex gap-1 text-base-white p-[2px]">
            {
                types.map((t: string, i: number) => (
                    <div key={i} className={`w-full h-[24px] shadow-[inset_0_0_4px_2px_#00000080] flex items-center justify-center ${i === 0 ? "rounded-bl-[8px]" : ""} ${i === types.length - 1 ? "rounded-br-[8px]" : ""}`} style={{ background: FILTER_TYPE_COLORS[t] }}>
                        <span className="drop-shadow-[0_0_2px_black]">{t.toUpperCase()}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Name;