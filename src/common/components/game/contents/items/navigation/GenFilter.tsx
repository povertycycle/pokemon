import { SyntheticEvent, useState } from "react";
import { useDropdown } from "../../../hooks/useDropdown";
import { getGameColors } from "../../pokemon/details/_utils/getGameColors";
import { getGameName } from "../../pokemon/details/_utils/getGameName";
import { VERSIONS } from "../constants";

type GenFilterProps = {
    filter: (gen: string | null) => void
}

const GenFilter: React.FC<GenFilterProps> = ({ filter }) => {
    const HEIGHT = 28;
    const [gen, setGen] = useState<string | null>(null);
    const { menu, toggle, closeMenu, ref } = useDropdown();

    function clear(e: SyntheticEvent) {
        e.stopPropagation();
        setGen(null);
        filter(null);
    }

    return (
        <div ref={ref} className="text-[1.25rem] h-[48px] flex flex-col">
            <div onClick={toggle} className="relative group/selector flex items-center justify-center cursor-pointer transition-width text-base-white border h-[48px] shrink-0" style={{ background: `${gen ? getGameColors(gen) : "#4b0478"}` }}>
                <span className="drop-shadow-[0_0_2px_black] flex gap-4">
                    {gen ? getGameName(gen) : "Select Generation"}
                    {!!gen && <i className="ri-close-line cursor-pointer hover:text-base-white-dark" onClick={clear} />}
                </span>
                <i className="drop-shadow-[0_0_2px_black] text-[1.5rem] absolute right-[8px] ri-arrow-down-s-line" />
            </div>
            {
                <div className={`w-full flex flex-col shrink-0 transition-height overflow-hidden mt-4 text-base-white shadow-[0_0_4px_black]`} style={{ height: menu ? `${VERSIONS.length * HEIGHT}px` : 0 }}>
                    {
                        VERSIONS.map((v: string, i: number) => {
                            function click() {
                                if (gen !== v) {
                                    setGen(v);
                                    closeMenu();
                                    filter(v.split("-").map(s => s.charAt(0)).join(""))
                                };
                            }
                            return (
                                <div key={i} onClick={click} className={`px-[48px] items-center whitespace-nowrap flex justify-center overflow-hidden shrink-0 transition-[filter] ${gen !== v ? "cursor-pointer hover:brightness-100 brightness-[65%]" : "brightness-100"}`} style={{ background: getGameColors(v), height: `${HEIGHT}px` }}>
                                    <span className="drop-shadow-[0_0_2px_black]">{getGameName(v)}</span>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default GenFilter;