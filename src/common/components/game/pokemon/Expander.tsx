import { useState } from "react";
import { DISPLAY_ID, NAV_ID } from "./constants";

const Expander: React.FC = () => {
    const [expanded, setExpanded] = useState<boolean>(false);

    const expand = () => {
        setExpanded(prev => {
            const display: HTMLElement | null = document.getElementById(DISPLAY_ID);
            const nav: HTMLElement | null = document.getElementById(NAV_ID);
            if (display) display.style.width = prev ? "75%" : "25%";
            if (nav) nav.style.width = prev ? "25%" : "75%";
            return !prev;
        });
    }

    return (
        <div className={`z-[2] absolute h-full top-0 transition-[left] duration-500 ${expanded ? "left-[25%]" : "left-[75%]"}`}>
            <i onClick={expand} className={`${expanded ? "ri-arrow-right-s-line" : "ri-arrow-left-s-line"} absolute text-[2rem] h-[32px] w-[32px] cursor-pointer hover:w-[40px] transition-width top-[8px] right-0 top-0 bg-base-white flex items-center justify-center rounded-l-[6px]`} />
        </div>
    )
}

export default Expander;