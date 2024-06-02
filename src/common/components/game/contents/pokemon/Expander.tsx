import { useState } from "react";
import { DISPLAY_ID, NAV_WIDTH, SHORTCUT_WIDTH } from "./constants";

const Expander: React.FC = () => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const expand = () => {
        setExpanded(prev => {
            const display: HTMLElement | null = document.getElementById(DISPLAY_ID);
            if (display) display.style.width = prev ? `${100 - NAV_WIDTH}%` : "100%";
            return !prev;
        });
    }

    return (
        <div className={`z-[2] absolute h-full bottom-0 transition-[right] duration-[500ms]`} style={{ right: expanded ? "0%" : `${NAV_WIDTH}%` }}>
            <i onClick={expand} className={`${expanded ? "ri-arrow-left-s-line" : "ri-arrow-right-s-line"} absolute bottom-[8px] right-0 text-[2rem] h-[32px] w-[32px] cursor-pointer hover:w-[40px] transition-width bg-base-white flex items-center justify-center rounded-l-[6px]`} />
        </div>
    )
}

export default Expander;