import { TAB_COLORS } from "@/common/constants/colors";
import { Tab } from "@/common/constants/enums";
import React, { useState } from "react";
import NaviTab from "../game/navigator/_utils";
import Link from "next/link";

type ShortcutsProps = {
    source: Tab;
    title?: {
        headerColor?: string;
        textColor?: string;
    }
}

const Shortcuts: React.FC<ShortcutsProps> = ({ source, title }) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className="w-[32px] sm:order-3 sm:w-full flex sm:justify-end sm:h-full">
            <div onClick={() => { setShow(true) }} className="border border-black sm:hidden h-full aspect-square bg-white rounded-[4px] flex items-center justify-center">
                <i className="ri-menu-line text-[1.25rem]" />
            </div>
            <div onClick={() => { setShow(false) }} className={`${show ? "max-sm:max-h-dvh" : "max-sm:max-h-0 max-sm:delay-500"} max-sm:fixed max-sm:top-0 max-sm:left-0 h-dvh sm:h-full max-sm:z-50 w-full max-sm:flex max-sm:flex-col max-sm:justify-end max-sm:overflow-hidden`}>
                <div className={`${show ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in sm:hidden absolute w-full h-full bg-black/65 top-0 left-0 z-0`} />
                <div className={`mobile__template--card ${show ? "max-sm:max-h-dvh" : "max-sm:max-h-0"}`}>
                    <div className="sm:hidden w-full flex items-center pl-6 py-[14px] text-[1.25rem] leading-6" style={{ background: title?.headerColor, color: title?.textColor }}>
                        <span>Navigation</span>
                        <div className="absolute right-4">
                            <i className="text-[1.5rem] ri-close-line" />
                        </div>
                    </div>
                    <div className="max-sm:bg-white sm:py-4 sm:h-full w-full flex sm:justify-end max-sm:flex-col gap-4 max-sm:px-4 max-sm:py-5 text-[1.25rem] sm:text-[1.5rem]">
                        {
                            Object.values(Tab).filter(t => t !== source).map((tab, i) => {
                                const color = TAB_COLORS[tab];
                                return (
                                    <Link href={tab === Tab.Return ? `/${source.toLowerCase()}` : `/${tab.toLowerCase()}`} className="max-sm:w-full sm:h-full sm:aspect-square overflow-hidden rounded-[4px] sm:bg-white cursor-pointer sm:hover:scale-[1.5] relative border" key={i} style={{ borderColor: color, color }}>
                                        <div title={tab} className="w-full h-full relative z-1 max-sm:px-2 flex items-center sm:justify-center gap-2" style={{ background: `${color}40` }}>
                                            <NaviTab tab={tab} size={24} />
                                            <span className="sm:hidden text-[1rem]">{tab}</span>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shortcuts;