import { useContext } from "react";
import { DetailsContext } from "../contexts";
import { GenerationContext } from "./contexts";
import { getGameColors } from "../_utils/getGameColors";
import { getGameName } from "../_utils/getGameName";

type GenerationsProps = {
    versions: string[]
}

const Generations: React.FC<GenerationsProps> = ({ versions }) => {
    const HEIGHT = 28;
    const { palette } = useContext(DetailsContext);
    const { gen, setGen } = useContext(GenerationContext);
    const list = versions.filter(v => v !== gen);

    return (
        <div className="absolute text-base top-[6px] h-[36px]">
            {/* <div onClick={toggle} className="flex items-center justify-center cursor-pointer transition-width text-base-white border" style={{ borderColor: palette[0], background: `${gen ? getGameColors(gen) : palette[0]}` }}>
                <span className="drop-shadow-[0_0_2px_black]">
                    {gen ? getGameName(gen) : "Select Game version"}
                </span>
                <i className="drop-shadow-[0_0_2px_black] text-[1.5rem] absolute right-[8px] ri-arrow-down-s-line" />
            </div>
            {
                <div className={`w-full flex flex-col transition-height overflow-hidden mt-4 text-base-white shadow-[0_0_4px_black]`} style={{ height: menu ? `${list.length * HEIGHT}px` : 0 }}>
                    {
                        list.map((v: string, i: number) => (
                            <div key={i} onClick={() => { setGen(v); closeMenu(); }} className={`px-[48px] items-center whitespace-nowrap flex justify-center overflow-hidden shrink-0 transition-[filter] ${gen !== v ? "cursor-pointer hover:brightness-100 brightness-[65%]" : "brightness-100"}`} style={{ background: getGameColors(v), height: `${HEIGHT}px` }}>
                                <span className="drop-shadow-[0_0_2px_black]">{getGameName(v)}</span>
                            </div>
                        ))
                    }
                </div>
            } */}
        </div>
    )
}

export default Generations;