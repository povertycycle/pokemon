import Dropdown from "@/common/components/_utils/Dropdown";
import Input from "@/common/components/_utils/Input";
import { capitalize } from "@/common/utils/string";
import { isDark } from "@/common/utils/colors";
import { TAB_COLORS } from "@/common/constants/colors";
import { Tab } from "@/common/constants/enums";
import { TYPE_COLORS } from "@/common/constants/colors";
import React, { SyntheticEvent, useState } from "react";

type FilterProps = {
    filterByName: (value: string) => void;
    filterByType: (type: string) => void;
    back: (source: Tab) => void;
    defaultQuery?: { name?: string | null };
}

const Filter: React.FC<FilterProps> = ({ filterByName, filterByType, back, defaultQuery }) => {
    return (
        <div className="z-10 w-full h-[48px] sm:h-[64px] flex justify-between items-center max-sm:p-2 sm:p-4 gap-2 sm:gap-4 shadow-md" style={{ background: TAB_COLORS[Tab.Pokemon] }}>
            <div className="h-full flex gap-2 sm:gap-4">
                <div className="h-full sm:w-[360px]">
                    <Input defaultValue={defaultQuery?.name} clearButton placeholder="Find Pokemon..." onChangeHandler={filterByName} />
                </div>
                <TypeFilter filterByType={filterByType} />
            </div>
            <button className="hover:brightness-90 transition-[filter] flex items-center justify-center px-2 sm:px-4 h-full bg-white rounded-[4px] gap-4" onClick={() => { back(Tab.Pokemon); }}>
                <i className="text-[1.5rem] ri-reply-fill" /> <span className="max-sm:hidden text-[1.125rem]">Return</span>
            </button>
        </div>
    )
}

export default Filter;

const TypeFilter: React.FC<{ filterByType: (type: string) => void }> = ({ filterByType }) => {
    const [type, setType] = useState<string | null>(null);
    const pool = Object.entries(TYPE_COLORS).filter(([t, _]) => (t !== type));
    const color = !!type ? TYPE_COLORS[type] : "#ffffff";

    const clearInput = (e: SyntheticEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setType(null);
        filterByType("");
    }

    return (
        <Dropdown
            Toggle={
                <button className={`${!!!type ? "sm:hover:brightness-90" : ""} h-[32px] transition-[filter] text-[1rem] sm:text-[1.125rem] sm:leading-5 text-white pl-2 sm:pl-4 pr-2 flex gap-2 sm:gap-6 items-center rounded-[4px]`} style={{ background: color, color: isDark(color) ? "white" : "black" }}>
                    {
                        !!type ?
                            <span>{type?.toUpperCase()}</span> :
                            <span className="max-sm:hidden">Type</span>
                    }
                    {
                        !!type ?
                            <div onClick={clearInput} className="h-[24px] aspect-square flex items-center justify-center rounded-full bg-black text-white cursor-pointer hover:scale-105 text-[1.25rem]"><i className="ri-close-line" /></div> :
                            <i className="text-[1.5rem] ri-filter-3-line" />
                    }
                </button>
            }
            MobileTitle={
                <div className="w-full flex items-center pl-6 py-[14px] text-[1.25rem] leading-6 text-white" style={{ background: TAB_COLORS[Tab.Pokemon] }}>
                    Type
                </div>
            }>
            <div className="flex max-sm:flex-wrap sm:flex-col sm:pr-1 sm:min-w-[256px] max-sm:gap-2 max-sm:max-h-[276px] max-sm:overflow-y-scroll max-sm:text-[0.875rem]">
                {
                    pool.map(([type, color], i) => (
                        <div className="max-sm:shrink-0 px-3 sm:px-2 py-1 rounded-[24px] sm:rounded-[4px] max-sm:text-center whitespace-nowrap cursor-pointer group/text overflow-hidden relative" key={i} onClick={() => { setType(type); filterByType(type); }} style={{ background: color }}>
                            <div className="max-sm:opacity-75 w-full h-full sm:group-hover/text:opacity-65 bg-white sm:opacity-100 absolute left-0 top-0 z-0" />
                            <span className="relative z-1">{capitalize(type)}</span>
                        </div>
                    ))
                }
            </div>
        </Dropdown>
    )
}

