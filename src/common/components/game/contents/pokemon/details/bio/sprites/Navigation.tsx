import { isDark } from "@/common/utils/colors";
import { Dispatch, SetStateAction, useContext } from "react";
import { SpritesData } from "../../../interfaces/sprites";
import { DetailsContext } from "../../contexts";
import { OTHERS } from "./constants";

type NavigationProps = {
    sprites: SpritesData | null;
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
}

const Navigation: React.FC<NavigationProps> = ({ sprites, active, setActive }) => {
    const { palette } = useContext(DetailsContext);
    const font = isDark(palette[0]) ? "white" : "black";
    const lFont = isDark(palette.at(-1)) ? "white" : "black";

    return (
        <div className={`relative z-[1] h-fit w-[112px] max-h-full flex flex-col gap-2 py-2 pl-2 pr-[6px] rounded-l-[16px] overflow-hidden shadow-base-black`} style={{ background: palette.at(-1) }}>
            {
                sprites &&
                Object.keys(sprites.versions).concat([OTHERS]).map((gen: string, i: number, ref: string[]) => {
                    const pickGen = () => { if (active !== gen) setActive(gen); }
                    const num = gen.split("-").pop()?.toUpperCase();

                    return (
                        <div key={i} className={`${i === 0 ? "rounded-tl-[10px]" : ""} ${i === ref.length - 1 ? "rounded-bl-[10px]" : ""} ${active === gen ? "px-2" : "hover:translate-x-[4px] px-[6px]"} transition-transform w-full h-[28px] flex items-center justify-end overflow-hidden leading-4 cursor-pointer`}
                            style={{ background: active !== gen ? palette.at(-1) : palette[0], border: active !== gen ? `2px solid ${palette[0]}` : "", color: active !== gen ? lFont : font }} onClick={pickGen}>
                            {i < ref.length - 1 ? `GEN ${num}` : num}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Navigation;
