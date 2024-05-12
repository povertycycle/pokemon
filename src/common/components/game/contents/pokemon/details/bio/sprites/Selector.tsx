import { useContext, Dispatch, SetStateAction } from "react";
import { DetailsContext } from "../../contexts";
import { VERSION_COLORS } from "./constants";
import { getColorBetween, isDark } from "@/common/utils/colors";
import { Sprites } from "../../../interfaces/sprites";

function capitalize(str: string) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`
}

function generateVersion(version: string) {
    const split = (version.match(/\d+|[^\d.-]+/g) ?? []).filter(Boolean);
    if (split.length <= 1) {
        return capitalize(split[0])
    } else {
        const mid = Math.floor(split.length / 2);
        return `${split.slice(0, mid).map(s => capitalize(s)).join(" ")} & ${split.slice(mid).map(s => capitalize(s)).join(" ")}`
    }
}

function generateOthers(others: string) {
    return (others.match(/\d+|[^\d_-]+/g) ?? []).map(o => (capitalize(o))).join(" ");
}

const Selector: React.FC<{ options: Sprites, url: string, setURL: Dispatch<SetStateAction<string>> }> = ({ options, url, setURL }) => {
    const { palette } = useContext(DetailsContext);
    return (
        <div className="w-[384px] h-[28px] flex text-base leading-4 border-x-2 border-b-2 rounded-bl-[16px] overflow-hidden" style={{ borderColor: palette.at(-1) }}>
            {
                Object.entries(options).map((entry: [string, string], i: number) => (
                    <div key={i} className={`${i !== 0 ? "border-l-2" : ""} duration-300 overflow-hidden group/selector whitespace-nowrap flex justify-center items-center transition-[colors,width] relative px-[14px] h-full ${url === entry[1] ? "w-[500%]" : "cursor-pointer w-[28px] hover:w-full"}`} onClick={() => { setURL(entry[1]) }} style={{ borderColor: palette.at(-1) }}>
                        <div className={`absolute left-0 top-0 h-full z-[0] w-full transition-colors`} style={{ background: url === entry[1] ? palette.at(-1) : (entry[0] === "base_default" ? `linear-gradient(90deg,${palette[0]},${palette[1]})` : VERSION_COLORS[entry[0]]) }} />
                        <div className={`absolute z-[1] h-full flex items-center w-full duration-300 transition-colors ${url === entry[1] ? "bg-black/0" : "bg-black/25 text-base-white-dark hover:text-base-white"}`} style={{ color: url === entry[1] ? (isDark(palette.at(-1)) ? "#f0f0f0" : "#000000") : "" }}>
                            {
                                url !== entry[1] ?
                                    <div className="h-full w-full shrink-0 flex items-center justify-center">{i}</div> :
                                    <div className="h-full w-full flex items-center justify-center overflow-hidden">
                                        {Object.keys(options).find(a => a === "base_default") ? generateOthers(entry[0]) : generateVersion(entry[0])}
                                    </div>
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Selector;