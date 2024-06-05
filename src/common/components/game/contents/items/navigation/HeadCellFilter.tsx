import styles from "@/common/styles/custom.module.scss";
import { capitalize } from "@/common/utils/capitalize";
import { useState } from "react";
import { useDropdown } from "../../../hooks/useDropdown";
import { CATEGORIES, POCKETS } from "../constants";
import CateogrySearch from "./HeadSearch";
import HeadSearch from "./HeadSearch";

type Filter = "category" | "pocket";
const FILTER_DATA: { [key in Filter]: {
    list: string[], child: number, compare: (a: string, b: string | null) => boolean
} } = {
    "category": {
        list: Object.entries(CATEGORIES).map((c => (c[1].name))),
        child: 1,
        compare: (value: string, name: string | null) => (!!name && !name.toLowerCase().includes(value.toLowerCase()))
    },
    "pocket": {
        list: POCKETS,
        child: 2,
        compare: (value: string, name: string | null) => (!!name && name.toLowerCase() !== value.toLowerCase())
    }
};

const HeadCellFilter: React.FC<{ listId: string, id: string, type: Filter }> = ({ listId, id, type }) => {
    const HEIGHT = 28;
    let { list, child, compare } = FILTER_DATA[type];
    const { ref, menu, toggle, closeMenu } = useDropdown();
    const [active, setActive] = useState<string | null>(null);

    function filterCategory(value: string | null) {
        if (value !== active) {
            setActive(value);
            closeMenu();
            document.getElementById(listId)?.childNodes.forEach(tr => {
                let disp = "";
                if (value) {
                    let name = (tr.childNodes[child])?.textContent;
                    if (compare(value, name)) disp = "none"
                }
                (tr as HTMLTableRowElement).style.display = disp;
            })
        }
    }

    return (
        <th className="relative" style={{ background: active ? "#4b0478" : "", color: active ? "#f0f0f0" : "#4b0478" }}>
            <span className={`relative z-[1] whitespace-nowrap pr-8 flex gap-2 ${active ? "text-base-white" : "text-x-dark"}`}>
                {active ?? capitalize(type)}
                {active && <i onClick={() => { filterCategory(null) }} className="ri-close-line cursor-pointer hover:text-base-white-dark" />}
            </span>
            <div ref={ref} className="z-[0] left-0 absolute w-full flex justify-end top-[50%] translate-y-[-50%] pr-1">
                <i onClick={toggle} className="ri-arrow-down-s-fill hover:text-base-white-dark cursor-pointer text-[1.5rem]" />
                {
                    <div className={`${menu ? "h-[256px]" : "h-0"} top-full min-w-[256px] absolute left-[50%] translate-x-[-50%] mt-4 transition-height overflow-hidden`}>
                        <div className={`border-2 border-x-dark flex flex-col overflow-hidden text-base bg-base-white h-full`}>
                            <HeadSearch title={capitalize(type)} id={id} />
                            <div id={id} className={`w-full flex flex-col h-0 grow overflow-y-scroll ${styles.overflowPurple}`} style={{ color: "#4b0478" }}>
                                {
                                    list.map((c, i) => {
                                        return (
                                            <div key={i} onClick={() => { filterCategory(c) }} className="shrink-0 px-[12px] cursor-pointer hover:bg-x-dark/25 flex items-center whitespace-nowrap normal-case" style={{ height: `${HEIGHT}px` }}>
                                                {c}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </th>
    )
}

export default HeadCellFilter;