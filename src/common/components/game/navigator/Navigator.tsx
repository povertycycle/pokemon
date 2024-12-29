import { Tab } from "@/common/constants/enums";
import { Dispatch, SetStateAction } from "react";
import NaviTab from "./_utils";
import { TAB_COLORS } from "@/common/constants/colors";



type NavigatorProps = {
    tab: Tab | null;
    setTab: Dispatch<SetStateAction<Tab | null>>;
    returnToMain: () => void;
}

const Navigator: React.FC<NavigatorProps> = ({ tab, setTab, returnToMain }) => {
    return (
        <div className={`w-full z-10 absolute max-sm:right-full max-sm:top-0 sm:bottom-full sm:left-0 h-full flex max-sm:flex-col duration-400 bg-black`}>
            {
                (Object.values(Tab).map((t, i, arr) => (
                    <div className={`${!!tab ? "group/tab max-sm:translate-x-0 sm:translate-y-0" : "max-sm:translate-x-full sm:translate-y-full"} transition-transform duration-400 w-full h-full text-white text-[1.5rem] cursor-pointer`}
                        style={{ transitionDelay: `${(arr.length - i) * 50}ms` }} onClick={() => { if (t === Tab.Return) { returnToMain(); } else { setTab(t); } }} key={i}>
                        <div className={`w-full h-full flex sm:flex-col gap-4 sm:gap-8 p-4 items-center justify-center max-sm:brightness-75 sm:brightness-50 sm:hover:brightness-95 transition-[filter]`} style={{ background: TAB_COLORS[t] }}>
                            <div className="sm:scale-[2] text-[2rem]">
                                <NaviTab tab={t} />
                            </div>
                            {t}
                        </div>
                    </div>
                )))
            }
        </div>
    )
}

export default Navigator;