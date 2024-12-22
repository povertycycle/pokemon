import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { PaletteContext } from "../_utils";
import { MoveIdData } from "./_utils";

type SorterProps = {
    method: string;
    version: string;
    setMoves: Dispatch<SetStateAction<MoveIdData[]>>;
}

const Sorter: React.FC<SorterProps> = ({ method, version, setMoves }) => {
    const { palette, text } = useContext(PaletteContext);
    const [show, setShow] = useState<boolean>(false);

    const sortName = () => {
        setMoves(prev => [...prev].sort((a, b) => {
            const valA = a.name;
            const valB = b.name;
            return !!valA && !!valB ? valA.localeCompare(valB) : 1;
        }))
    }

    const sortMachine = () => {
        setMoves(prev => [...prev].sort((a, b) => {
            const valA = a.data?.machines?.[version];
            const valB = b.data?.machines?.[version];
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
        <div className="flex sm:justify-end">
            <button onClick={() => { setShow(true) }} className={`focus:outline-none sm:hidden h-[42px] px-3 flex items-center justify-center`} style={{ background: palette[1], color: text[1] }}>
                <i className="ri-sort-desc text-[1.5rem]" />
            </button>
            <div onClick={() => { setShow(false) }} className={`${show ? "max-sm:max-h-dvh" : "max-sm:max-h-0 max-sm:delay-500"} max-sm:fixed max-sm:bottom-0 max-sm:left-0 h-dvh sm:h-full max-sm:z-50 w-full max-sm:flex max-sm:flex-col max-sm:justify-end max-sm:overflow-hidden`}>
                <div className={`${show ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in sm:hidden absolute w-full h-full bg-black/65 top-0 left-0 z-[0]`} />
                <div className={`relative z-[1] w-full flex flex-col max-sm:bg-white sm:h-full max-sm:rounded-t-[16px] max-sm:overflow-hidden ease-in transition-max-height duration-400 ${show ? "max-sm:max-h-dvh" : "max-sm:max-h-0"}`}>
                    <div className="sm:hidden w-full flex items-center pl-6 py-[14px] text-[1.25rem] leading-6" style={{ background: palette[1], color: text[1] }}>
                        <span>Sort By</span>
                        <div className="absolute right-4">
                            <i className="text-[1.5rem] ri-close-line" />
                        </div>
                    </div>
                    <div className="sm:h-full w-full flex sm:justify-end max-sm:flex-col gap-2 max-sm:px-4 max-sm:py-6">
                        {
                            [
                                { title: "Name", icon: "ri-sort-alphabet-asc", handler: sortName },
                                ...(method === "level-up" ? [{ title: "Level", icon: "ri-sort-number-asc", handler: sortLevel }] : []),
                                // ...(method === "machine" ? [{ title: "Method", icon: "ri-sort-alphabet-asc", handler: sortMachine }] : []),
                                { title: "PP", icon: "ri-sort-number-asc", handler: sortPP },
                                { title: "Power", icon: "ri-sort-number-asc", handler: sortPower },
                                { title: "Accuracy", icon: "ri-sort-number-asc", handler: sortAccuracy },
                                { title: "Type", icon: "ri-sort-alphabet-asc", handler: sortType },
                                { title: "Category", icon: "ri-sort-alphabet-asc", handler: sortCategory },
                            ].concat().map(({ title, icon, handler }, i) => (
                                <div key={i} onClick={handler} className="max-sm:text-[1.125rem] gap-2 px-4 cursor-pointer flex items-center max-sm:py-1 max-sm:rounded-[6px] overflow-hidden transition-transform sm:hover:-translate-y-1 relative" style={{ color: text[1] }}>
                                    <div className="absolute left-0 top-0 w-full h-full max-sm:opacity-10 z-0" style={{ background: palette[1] }} />
                                    <span className="relative z-[1] max-sm:text-black">{title} <i className={icon} /></span>
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
