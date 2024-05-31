import { getColorBetween, isDark } from "@/common/utils/colors";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { FILTER_TYPE_COLORS } from "../constants";
import Logic from "./Logic";
import { useDropdown } from "../../../hooks/useDropdown";

type TypeFilterProps = {
    filter: (type: string | null, section: 0 | 1) => void
    toggle: (logic: boolean) => void
}

const TypeFilter: React.FC<TypeFilterProps> = ({ filter, toggle }) => {
    const [typeOne, setTypeOne] = useState<string | null>(null);
    const [typeTwo, setTypeTwo] = useState<string | null>(null);
    const pool = Object.entries(FILTER_TYPE_COLORS).filter(entries => (entries[0] !== typeOne && entries[0] !== typeTwo));
    const firstColor = typeOne ? FILTER_TYPE_COLORS[typeOne] : "#d9d9d9";
    const secondColor = typeTwo ? FILTER_TYPE_COLORS[typeTwo] : "#d9d9d9";

    const setFirst = (type: string | null) => {
        filter(type, 0);
        setTypeOne(type);
    }

    const setSecond = (type: string | null) => {
        filter(type, 1);
        setTypeTwo(type);
    }

    return (
        <div className="flex items-center justify-between w-full text-base leading-4 rounded-full transition-colors" style={{ background: `linear-gradient(90deg,${firstColor},${secondColor})` }}>
            <Dropdown type={typeOne} setType={setFirst} pool={pool} left />
            <Logic toggle={toggle} isDark={isDark(getColorBetween(firstColor, secondColor))} />
            <Dropdown type={typeTwo} setType={setSecond} pool={pool} />
        </div>
    )
}

type DropdownProps = {
    type: string | null,
    setType: (type: string | null) => void,
    pool: [string, string][],
    left?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({ type, setType, pool, left }) => {
    const color = (type && isDark(FILTER_TYPE_COLORS[type])) ? "text-white" : "text-black";
    const { menu, toggle, closeMenu, ref } = useDropdown();

    return (
        <div ref={ref} className={`flex items-center select-none relative cursor-pointer w-full h-full`}>
            <div className={`h-full w-full flex items-center justify-center gap-2 ${left ? "rounded-l-full" : "rounded-r-full"} hover:border-black border-2 transition-colors  ${color}`} onClick={toggle}>
                {
                    type ?
                        <span>{type.toUpperCase()}</span> :
                        <span>Type {left ? 1 : 2}</span>
                }
            </div>
            <div className={`shadow-[0_0_4px_black] absolute w-full overflow-hidden flex flex-col bg-default-white top-full mt-2 transition-height rounded-[4px] overflow-hidden text-base leading-4`} style={{ height: menu ? `${24 * pool.length}px` : 0 }}>
                {
                    pool.map((entries: [string, string], i: number) => (
                        <div key={i} data-type={`${entries[0]}-${left ? "1" : "2"}`} onClick={() => { setType(entries[0]); closeMenu(); }} className={`group/type shrink-0 cursor-pointer h-[24px] flex items-center justify-center relative`}>
                            <div className="transition-[filter] group-hover/type:brightness-100 brightness-50 w-full h-full absolute z-[0] top-0 left-0" style={{ background: entries[1] }} />
                            <span className={`z-[1] ${isDark(entries[1]) ? "group-hover/type:text-base-white" : "group-hover/type:text-black"} text-base-white-dark`}>{entries[0].toUpperCase()}</span>
                        </div>
                    ))
                }
            </div>
            {
                !!type && <div onClick={() => { setType(null) }} className={`absolute hover:scale-[1.2] transition-transform text-[0.875rem] bg-base-white border border-black rounded-full z-[1] flex items-center justify-center h-[18px] w-[18px] text-black ${left ? "left-[6px]" : "right-[6px]"}`}>
                    <i className="ri-close-line" />
                </div>
            }
        </div>
    )
}

export default TypeFilter;