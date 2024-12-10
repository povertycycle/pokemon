import { isDark } from "@/common/utils/colors";
import { TYPE_COLORS } from "../../../../../constants/types";
import { TABLE_ID } from "./constants";

const TypeScroller: React.FC = () => {
    return (
        <div className="h-full fixed z-[5] right-0 text-[1.25rem] top-0 flex flex-col justify-between pt-16 pb-4 items-end">
            <div className="text-base px-8 bg-hp-dark text-base-white rounded-l-[4px] hover:brightness-[85%] transition-[filter] cursor-pointer" onClick={() => { let table = document.getElementById(TABLE_ID) as HTMLElement; table.scrollTo({ top: 0, behavior: "smooth" }) }}>Back to top</div>
            {
                Object.entries(TYPE_COLORS).map(([type, color], i) => (
                    <div key={i} className="overflow-hidden group/type" onClick={() => {
                        let table = document.getElementById(TABLE_ID) as HTMLElement;
                        let elem = document.querySelector(`[data-type='move-table-${type}']`) as HTMLElement;
                        table?.scrollTo({
                            top: (elem.getBoundingClientRect().top + table.scrollTop - 156),
                            behavior: "smooth"
                        });
                    }}>
                        <div className="px-8 transition-transform hover:translate-x-[8px] translate-x-[calc(100%-16px)] cursor-pointer" style={{ color: isDark(color) ? "#f0f0f0" : "#000000" }}>
                            <div className="w-full h-full absolute top-0 left-0 skew-x-[-15deg] rounded-l-[4px] z-[0]" style={{ background: color }} />
                            <span className="relative z-[1]">{type.toUpperCase()}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TypeScroller;