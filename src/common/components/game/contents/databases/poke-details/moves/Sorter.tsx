import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { PaletteContext } from "../_utils";
import { MoveIdData } from "./_utils";
import Dropdown from "@/common/components/_utils/Dropdown";

type SorterProps = {
    method: string;
    setMoves: Dispatch<SetStateAction<MoveIdData[]>>;
}

const Sorter: React.FC<SorterProps> = ({ method, setMoves }) => {
    const { palette, text } = useContext(PaletteContext);
    const [show, setShow] = useState<boolean>(false);

    const sortName = () => {
        setMoves(prev => [...prev].sort((a, b) => {
            const valA = a.name;
            const valB = b.name;
            return !!valA && !!valB ? valA.localeCompare(valB) : 1;
        }))
    }

    const sortLevel = () => {
        setMoves(prev => [...prev].sort((a, b) => {
            const valA = a.level;
            const valB = b.level;
            return !!valA && !!valB ? valA - valB : 1;
        }))
    }

    const sortPP = () => {
        setMoves(prev => [...prev].sort((a, b) => {
            const valA = a.data?.pp ?? 0;
            const valB = b.data?.pp ?? 0;
            return valA - valB;
        }))
    }

    const sortPower = () => {
        setMoves(prev => [...prev].sort((a, b) => {
            const valA = a.data?.power ?? 251;
            const valB = b.data?.power ?? 251;
            return valA - valB
        }))
    }

    const sortAccuracy = () => {
        setMoves(prev => [...prev].sort((a, b) => {
            const valA = a.data?.accuracy ?? 101;
            const valB = b.data?.accuracy ?? 101;
            return valA - valB
        }))
    }

    const sortType = () => {
        setMoves(prev => [...prev].sort((a, b) => {
            const valA = a.data?.type;
            const valB = b.data?.type;
            return !!valA && !!valB ? valA.localeCompare(valB) : 1;
        }))
    }

    const sortCategory = () => {
        setMoves(prev => [...prev].sort((a, b) => {
            const valA = a.data?.category;
            const valB = b.data?.category;
            return !!valA && !!valB ? valA.localeCompare(valB) : 1;
        }))
    }


    return (
        <div className="flex justify-end">
            <button onClick={() => { setShow(true) }} className={`focus:outline-none sm:hidden h-[28px] px-3 flex gap-2 items-center justify-center rounded-[28px]`} style={{ background: `${palette[1]}1a` }}>
                <span className="sm:hidden text-[0.875rem]">Sort by</span> <i className="ri-sort-desc text-[1.125rem] sm:text-[1.5rem]" />
            </button>
            <div onClick={() => { setShow(false) }} className={`${show ? "max-sm:max-h-dvh" : "max-sm:max-h-0 max-sm:delay-500"} max-sm:fixed max-sm:bottom-0 max-sm:left-0 h-dvh sm:h-full max-sm:z-50 w-full max-sm:flex max-sm:flex-col max-sm:justify-end max-sm:overflow-hidden`}>
                <div className={`${show ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in sm:hidden absolute w-full h-full bg-black/65 top-0 left-0 z-0`} />
                <div className={`mobile__template--card ${show ? "max-sm:max-h-dvh" : "max-sm:max-h-0"}`}>
                    <div className="sm:hidden w-full flex items-center pl-6 py-[14px] text-[1.25rem] leading-6" style={{ background: palette[1], color: text[1] }}>
                        <span>Sort By</span>
                        <div className="absolute right-4">
                            <i className="text-[1.5rem] ri-close-line" />
                        </div>
                    </div>
                    <div className="max-sm:bg-white sm:h-full w-full flex sm:justify-end max-sm:flex-col gap-2 max-sm:px-4 max-sm:py-6 sm:items-end">
                        {
                            [
                                ...(method === "level-up" ? [{ title: "Lv", icon: "ri-sort-number-asc", handler: sortLevel }] : []),
                                { title: "Name", icon: "ri-sort-alphabet-asc", handler: sortName },
                                { title: "PP", icon: "ri-sort-number-asc", handler: sortPP },
                                { title: "Pwr", icon: "ri-sort-number-asc", handler: sortPower },
                                { title: "Acc", icon: "ri-sort-number-asc", handler: sortAccuracy },
                                { title: "Type", icon: "ri-sort-alphabet-asc", handler: sortType },
                                { title: "Cat", icon: "ri-sort-alphabet-asc", handler: sortCategory },
                            ].concat().map(({ title, icon, handler }, i) => (
                                <div key={i} onClick={handler} className="group/sort max-sm:text-[1.125rem] gap-2 px-3 cursor-pointer flex items-center max-sm:py-1 max-sm:rounded-[6px] sm:rounded-full overflow-hidden h-fit relative" style={{ background: `${palette[1]}1a` }}>
                                    <span className="group-hover/sort:scale-110 relative z-1 max-sm:text-black">{title} <i className={icon} /></span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sorter;
