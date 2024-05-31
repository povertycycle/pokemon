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
    let GAP = 8;
    let HEIGHT = 28;
    const { palette, colors } = useContext(DetailsContext);
    const h = `${(Object.keys(sprites?.versions ?? {}).length + 1) * (HEIGHT + GAP) - GAP + 22}px`;

    return (
        <div className={`relative z-[1] transition-height w-[112px] max-h-full flex flex-col py-2 pl-2 pr-[6px] rounded-l-[12px] bg-black/50 border-y-2 border-l-2 overflow-hidden shadow-base-black`} style={{ borderColor: palette[0], height: h, gap: `${GAP}px` }}>
            {
                sprites &&
                Object.keys(sprites.versions).concat([OTHERS]).map((gen: string, i: number, ref: string[]) => {
                    const pickGen = () => { if (active !== gen) setActive(gen); }
                    const num = gen.split("-").pop()?.toUpperCase();

                    return (
                        <div key={i} className={`${i === 0 ? "rounded-tl-[8px]" : ""} ${i === ref.length - 1 ? "rounded-bl-[8px]" : ""} ${active === gen ? "px-2" : "hover:translate-x-[-4px] hover:translate-y-[-4px] px-[6px]"} shrink-0 overflow-hidden transition-transform w-full flex items-center justify-end overflow-hidden leading-4 cursor-pointer`}
                            style={{ height: `${HEIGHT}px`, background: active !== gen ? `transparent` : palette[0], border: `2px solid ${palette[0]}80`, color: active !== gen ? "#f0f0f0" : colors[0] }} onClick={pickGen}>
                            {i < ref.length - 1 ? `GEN ${num}` : num}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Navigation;
