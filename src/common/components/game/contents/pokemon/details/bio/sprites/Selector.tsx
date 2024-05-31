import { Dispatch, SetStateAction, useContext } from "react";
import { Sprites } from "../../../interfaces/sprites";
import { DetailsContext } from "../../contexts";
import { capitalize } from "@/common/utils/capitalize";
import { GEN_COLORS } from "../../../../constants";

export const VERSION_COLORS: { [key: string]: string } = {
    "red-blue": GEN_COLORS["red-blue"],
    "yellow": GEN_COLORS["yellow"],
    "gold": GEN_COLORS["gold-silver"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g)?.[0] ?? "gold",
    "silver": GEN_COLORS["gold-silver"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g)?.[1] ?? "silver",
    "crystal": GEN_COLORS["crystal"],
    "emerald": GEN_COLORS["emerald"],
    "firered-leafgreen": GEN_COLORS["firered-leafgreen"],
    "diamond-pearl": GEN_COLORS["diamond-pearl"],
    "ruby-sapphire": GEN_COLORS["ruby-sapphire"],
    "platinum": GEN_COLORS["platinum"],
    "heartgold-soulsilver": GEN_COLORS["heartgold-soulsilver"],
    "black-white": GEN_COLORS["black-white"],
    "x-y": GEN_COLORS["x-y"],
    "omegaruby-alphasapphire": GEN_COLORS["omega-ruby-alpha-sapphire"],
    "ultra-sun-ultra-moon": GEN_COLORS["ultra-sun-ultra-moon"],
    "vii": (() => {
        let c1 = GEN_COLORS["sun-moon"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
        let c2 = GEN_COLORS["ultra-sun-ultra-moon"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
        let c3 = GEN_COLORS["lets-go-pikachu-lets-go-eevee"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
        return `linear-gradient(90deg,${c1?.join(",")},${c2?.join(",")},${c3?.join(",")})`
    })(),
    "viii": (() => {
        let c1 = GEN_COLORS["sword-shield"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
        let c2 = GEN_COLORS["the-isle-of-armor"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
        let c3 = GEN_COLORS["the-crown-tundra"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
        let c4 = GEN_COLORS["brilliant-diamond-and-shining-pearl"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
        let c5 = GEN_COLORS["legends-arceus"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
        let c6 = GEN_COLORS["home"].match(/#(?:[0-9a-fA-F]{3}){1,2}/g);
        return `linear-gradient(90deg,${c1?.join(",")},${c2?.join(",")},${c3?.join(",")},${c4?.join(",")},${c5?.join(",")},${c6?.join(",")})`
    })(),
    "dream_world": GEN_COLORS["dream_world"],
    "home": GEN_COLORS["home"],
    "showdown": GEN_COLORS["showdown"],
    "official-artwork": GEN_COLORS["official-artwork"]
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

const Selector: React.FC<{ options: Sprites, url: string, setURL: Dispatch<SetStateAction<string>>, gen: string }> = ({ options, url, setURL, gen }) => {
    const { palette } = useContext(DetailsContext);

    return (
        <div className="w-[20vw] h-[28px] flex text-base leading-4 border-x-2 border-b-2 overflow-hidden" style={{ borderColor: palette[0] }}>
            {
                Object.entries(options).map((entry: [string, string], i: number) => {
                    const select = () => { setURL(entry[1]) };
                    const title = Object.keys(options).find(a => a === "base_default") ? generateOthers(entry[0]) : generateVersion(entry[0])
                    const background = () => {
                        switch (entry[0]) {
                            case "base_default":
                                return `linear-gradient(90deg,${palette[1]},${palette[0]})`;
                            case "icons":
                                return VERSION_COLORS[gen.split("-")[1]];
                            default:
                                return VERSION_COLORS[entry[0]]
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