import Dropdown from "@/common/components/_utils/Dropdown";
import { Sprites } from "@/common/interfaces/pokemon";
import { useState } from "react";

type SelectionProps = {
    sprites: Sprites;
    selectSprite: (url: string) => void;
}

const Selection: React.FC<SelectionProps> = ({ sprites, selectSprite }) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
            <div onClick={() => { setShow(prev => !prev) }} className="sm:hidden sm:hover:bg-base-white-soft cursor-pointer absolute right-2 bottom-2 bg-white rounded-full z-[1] h-[36px] sm:h-[40px] aspect-square flex items-center justify-center">
                <i className="ri-menu-fill text-[1.25rem] sm:text-[1.5rem]" />
            </div>
            <div className={`max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-screen  bg-white flex flex-col sm:-ml-6 relative z-[2] sm:z-[0] sm:rounded-br-[24px] ${show ? "max-sm-h-[384px]" : "max-sm:h-0"} overflow-hidden`}>
                <div className="flex flex-col py-2 pr-2 pl-8">
                    <span>Others</span>
                    <div className="flex flex-col">
                        {
                            Object.entries(sprites.others).map(([name, url], i) => (
                                <div key={i} className="">
                                    {name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Selection;


// function generateOthers(others: string) {
//     return (others.match(/\d+|[^\d_-]+/g) ?? []).map(o => (capitalize(o))).join(" ");
// }

// const Selector: React.FC<{ options: any, url: string, setURL: Dispatch<SetStateAction<string>>, gen: string }> = ({ options, url, setURL, gen }) => {
//     const { palette } = useContext(DetailsContext);

//     return (
//         <div className="w-[20vw] h-[28px] flex text-base leading-4 border-x-2 border-b-2 overflow-hidden" style={{ borderColor: palette[0] }}>
//             {
//                 // Object.entries(options).map((entry: [string, string], i: number) => {
//                 //     const select = () => { setURL(entry[1]) };
//                 //     const title = Object.keys(options).find(a => a === "base_default") ? generateOthers(entry[0]) : getGameName(entry[0])
//                 //     const background = () => {
//                 //         switch (entry[0]) {
//                 //             case "base_default":
//                 //                 return `linear-gradient(90deg,${palette[1]},${palette[0]})`;
//                 //             case "icons":
//                 //                 return `linear-gradient(90deg,${VERSION_COLORS[gen.split("-")[1]].join(",")})`;
//                 //             default:
//                 //                 return getGameColors(entry[0])
//                 //         }
//                 //     }
//                 //     return (
//                 //         <div title={url === entry[1] ? undefined : title} key={i} className={`${i !== 0 ? "border-l-2" : ""} duration-300 overflow-hidden group/selector whitespace-nowrap flex justify-center items-center transition-[colors,width] relative px-[14px] h-full ${url === entry[1] ? "w-[500%]" : "cursor-help w-[28px] hover:w-full"}`} onClick={select} style={{ borderColor: palette[0] }}>
//                 //             <div className={`absolute left-0 top-0 h-full z-[0] w-full transition-[color,filter] ${url !== entry[1] ? "brightness-[50%] group-hover/selector:brightness-[100%]" : ""}`} style={{ background: background() }} />
//                 //             <div className={`absolute z-[1] h-full flex items-center w-full duration-300 transition-colors text-base-white ${url === entry[1] ? "bg-black/0" : "bg-black/25"}`}>
//                 //                 {
//                 //                     <span className={`${url !== entry[1] ? "shrink-0" : "overflow-hidden"} drop-shadow-[0_0_1px_black] h-full w-full flex items-center justify-center`}>{url !== entry[1] ? i : title}</span>
//                 //                 }
//                 //             </div>
//                 //         </div>
//                 //     )
//                 // })
//             }
//         </div>
//     )
// }

// export default Selector;
// type NavigationProps = {
//     active: string;
//     setActive: Dispatch<SetStateAction<string>>;
// }

// const Navigation: React.FC<NavigationProps> = ({ active, setActive }) => {
//     let GAP = 8;
//     let HEIGHT = 28;
//     const { palette, colors } = useContext(DetailsContext);
//     // const h = `${(Object.keys(sprites?.versions ?? {}).length + 1) * (HEIGHT + GAP) - GAP + 22}px`;

//     return (
//         <div className={`text-base relative z-[1] transition-height w-[112px] max-h-full flex flex-col py-2 pl-2 pr-[6px] rounded-l-[12px] bg-black/50 border-y-2 border-l-2 overflow-hidden shadow-base-black`} style={{ borderColor: palette[0], gap: `${GAP}px` }}>
//             {
//                 // sprites &&
//                 // Object.keys(sprites.versions).concat([OTHERS]).map((gen: string, i: number, ref: string[]) => {
//                 //     const pickGen = () => { if (active !== gen) setActive(gen); }
//                 //     const num = gen.split("-").pop()?.toUpperCase();

//                 //     return (
//                 //         <div key={i} className={`${i === 0 ? "rounded-tl-[6px]" : ""} ${i === ref.length - 1 ? "rounded-bl-[6px]" : ""} ${active === gen ? "px-2" : "hover:translate-x-[-4px] hover:translate-y-[-4px] px-[6px]"} shrink-0 overflow-hidden transition-transform w-full flex items-center justify-start overflow-hidden leading-4 cursor-pointer`}
//                 //             style={{ height: `${HEIGHT}px`, background: active !== gen ? `transparent` : palette[0], border: `2px solid ${palette[0]}80`, color: active !== gen ? "#f0f0f0" : colors[0] }} onClick={pickGen}>
//                 //             {i < ref.length - 1 ? `GEN ${num}` : num}
//                 //         </div>
//                 //     )
//                 // })
//             }
//         </div>
//     )
// }

// export default Navigation;