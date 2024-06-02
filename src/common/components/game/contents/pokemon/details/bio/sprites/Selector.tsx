import { capitalize } from "@/common/utils/capitalize";
import { Dispatch, SetStateAction, useContext } from "react";
import { Sprites } from "../../../interfaces/sprites";
import { getGameColors } from "../../_utils/getGameColors";
import { VERSION_COLORS } from "../../constants";
import { DetailsContext } from "../../contexts";
import { getGameName } from "../../_utils/getGameName";

function generateOthers(others: string) {
    return (others.match(/\d+|[^\d_-]+/g) ?? []).map(o => (capitalize(o))).join(" ");
}

const Selector: React.FC<{ options: Sprites, url: string, setURL: Dispatch<SetStateAction<string>>, gen: string }> = ({ options, url, setURL, gen }) => {
    const { palette } = useContext(DetailsContext);

    return (
        <div className="w-[20vw] h-[28px] flex text-base leading-4 border-x-2 border-b-2 overflow-hidden" style={{ borderColor: palette[0] }}>
            {
                Object.entries(options).map((entry: [string, string], i: number) => {
                    const select = () => { setURL(entry[1]) };
                    const title = Object.keys(options).find(a => a === "base_default") ? generateOthers(entry[0]) : getGameName(entry[0])
                    const background = () => {
                        switch (entry[0]) {
                            case "base_default":
                                return `linear-gradient(90deg,${palette[1]},${palette[0]})`;
                            case "icons":
                                return `linear-gradient(90deg,${VERSION_COLORS[gen.split("-")[1]].join(",")})`;
                            default:
                                return getGameColors(entry[0])
                        }
                    }
                    return (
                        <div title={url === entry[1] ? undefined : title} key={i} className={`${i !== 0 ? "border-l-2" : ""} duration-300 overflow-hidden group/selector whitespace-nowrap flex justify-center items-center transition-[colors,width] relative px-[14px] h-full ${url === entry[1] ? "w-[500%]" : "cursor-help w-[28px] hover:w-full"}`} onClick={select} style={{ borderColor: palette[0] }}>
                            <div className={`absolute left-0 top-0 h-full z-[0] w-full transition-[color,filter] ${url !== entry[1] ? "brightness-[50%] group-hover/selector:brightness-[100%]" : ""}`} style={{ background: background() }} />
                            <div className={`absolute z-[1] h-full flex items-center w-full duration-300 transition-colors text-base-white ${url === entry[1] ? "bg-black/0" : "bg-black/25"}`}>
                                {
                                    <span className={`${url !== entry[1] ? "shrink-0" : "overflow-hidden"} drop-shadow-[0_0_1px_black] h-full w-full flex items-center justify-center`}>{url !== entry[1] ? i : title}</span>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Selector;