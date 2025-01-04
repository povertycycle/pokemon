import Input from "@/common/components/_utils/Input";
import { TAB_COLORS } from "@/common/constants/colors";
import { Tab } from "@/common/constants/enums";

type FilterProps = {
    back: (source: Tab) => void;
    filterByName: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ back, filterByName }) => {
    return (
        <div className="z-10 w-full h-[48px] sm:h-[64px] flex justify-between items-center max-sm:p-2 sm:p-4 gap-2 sm:gap-4 shadow-md" style={{ background: TAB_COLORS[Tab.Berries] }}>
            <div className="h-full flex gap-2 sm:gap-4">
                <div className="h-full sm:w-[360px]">
                    <Input clearButton placeholder="Find Berries..." onChangeHandler={filterByName} />
                </div>
            </div>
            <button className="hover:brightness-90 transition-[filter] flex items-center justify-center px-2 sm:px-4 h-full bg-white rounded-[4px] gap-4" onClick={() => { back(Tab.Berries); }}>
                <i className="text-[1.5rem] ri-reply-fill" /> <span className="max-sm:hidden text-[1.125rem]">Return</span>
            </button>
        </div>
    )
}

export default Filter;
