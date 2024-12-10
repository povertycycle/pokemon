import { Tab } from "@/constants/enums"
import React from "react"
import NaviTab from "../game/contents/navigator/_utils"

type ShortcutsProps = {
    current: Tab;
}

const Shortcuts: React.FC<ShortcutsProps> = ({ current }) => {
    return (
        <div className="flex gap-2 h-full">
            <button className="sm:hidden">
            </button>
            <div className="sm:h-full flex max-sm:flex-col gap-2 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:w-screen">
                {
                    Object.values(Tab).filter(t => t !== current).map((tab, i) => (
                        <div className="sm:rounded-[4px] sm:h-full sm:aspect-square p-1 shrink-0 flex sm:bg-white items-center justify-end cursor-pointer overflow-hidden" key={i}>
                            <NaviTab tab={tab} size={32} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Shortcuts;