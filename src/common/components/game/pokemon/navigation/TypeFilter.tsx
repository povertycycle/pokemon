import { Dispatch, SetStateAction, useState, useRef, MutableRefObject, useEffect } from "react";
import { isDark } from "@/common/utils/colors";
import { FILTER_TYPE_COLORS } from "../constants";

const TypeFilter: React.FC<{ filterByType: (type: string | null, section: 0 | 1) => void }> = ({ filterByType }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [typeOne, setTypeOne] = useState<string | null>(null);
    const [typeTwo, setTypeTwo] = useState<string | null>(null);
    const pool = Object.entries(FILTER_TYPE_COLORS).filter(entries => (entries[0] !== typeOne && entries[0] !== typeTwo));

    const setFirst = (type: string | null) => {
        filterByType(type, 0);
        setTypeOne(type);
    }

    const setSecond = (type: string | null) => {
        filterByType(type, 1);
        setTypeTwo(type);
    }

    return (
        <div ref={containerRef} className="flex gap-2 justify-between w-full text-[1.25rem] leading-[1.25rem]">
            <Dropdown left type={typeOne} setType={setFirst} containerRef={containerRef} pool={pool} />
            <Dropdown type={typeTwo} setType={setSecond} containerRef={containerRef} pool={pool} />
        </div>
    )
}

type DropdownProps = {
    left?: boolean,
    type: string | null,
    setType: (type: string | null) => void,
    containerRef: MutableRefObject<HTMLDivElement | null>,
    pool: [string, string][]
}

const Dropdown: React.FC<DropdownProps> = ({ left, type, setType, containerRef, pool }) => {
    const [menu, setMenu] = useState<boolean>(false);
    const initPool = type ? [["ALL", "#F0F0F0"] as [string, string]].concat(pool) : pool;
    const color = type ? (isDark(FILTER_TYPE_COLORS[type]) ? "text-white" : "text-black") : "text-base-red-dark";
    const background = type ? FILTER_TYPE_COLORS[type] : "#F0F0F0";

    const handleOffClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOffClick);
        return () => { document.removeEventListener('mousedown', handleOffClick) }
    }, []);

    const openMenu = () => {
        setMenu(prev => !prev);
    }

    return (
        <div onClick={openMenu} className={`${left ? "rounded-l-full rounded-tr-full" : "rounded-r-full rounded-bl-full"} ${type ? "border-black" : "border-base-red-dark"} border-2 hover:shadow-[0_0_4px_black] transition-[box-shadow] flex items-center select-none relative cursor-pointer w-full h-full`} style={{ background: background }}>
            <div className={`h-full w-full flex items-center justify-center gap-2 ${color}`}>
                <i className="absolute left-[16px] ri-filter-3-line" />
                {
                    type ?
                        <span>{type.toUpperCase()}</span> :
                        <span>Type {left ? 1 : 2}</span>
                }
            </div>
            <div className={`shadow-[0_0_4px_black] absolute w-full overflow-hidden flex flex-col bg-default-white top-full mt-2 transition-height rounded-[4px] overflow-hidden text-base leading-4`} style={{ height: menu ? `${24 * pool.length}px` : 0 }}>
                {
                    initPool.map((entries: [string, string], i: number) => (
                        <div key={i} onClick={() => { entries[0].startsWith("ALL") ? setType(null) : setType(entries[0]) }} className={`cursor-pointer h-[24px]`} style={{ background: entries[1] }}>
                            <div className={`w-full h-full flex items-center justify-center ${isDark(entries[1]) ? "text-white" : "hover:text-black text-white"} bg-black/25 transition-colors \hover:bg-black/0`}>{entries[0] === "ALL" ? `Type ${left ? 1 : 2}` : entries[0].toUpperCase()}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


// {/* <div className="flex flex-wrap gap-2 text-base leading-4">
//             
//         </div> */}

export default TypeFilter;