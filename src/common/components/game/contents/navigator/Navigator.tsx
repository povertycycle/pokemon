import { Dispatch, SetStateAction } from "react";
import { BerryTab, CalculatorTab, EvolutionTab, ItemsTab, MachineTab, MovesTab, PokemonTab } from "./Tabs";
import { Tab } from "@/constants/enums";
import NaviTab from "./_utils";

const COLORS: { [key in Tab]: string } = {
    [Tab.Pokemon]: "bg-sp-def-dark",
    [Tab.Items]: "bg-x-dark",
    [Tab.Berries]: "bg-sp-atk-dark",
    [Tab.Moves]: "bg-hp-dark",
    [Tab.Evolution]: "bg-atk-dark",
    [Tab.Machines]: "bg-def-dark",
    [Tab.Calculator]: "bg-y-dark",
    [Tab.Return]: "bg-spd-dark",
}

type NavigatorProps = {
    tab: Tab | null;
    setTab: Dispatch<SetStateAction<Tab | null>>;
    returnToMain: () => void;
}

const Navigator: React.FC<NavigatorProps> = ({ tab, setTab, returnToMain }) => {
    return (
        <div className={`w-full z-[5] absolute max-sm:right-full max-sm:top-0 sm:bottom-full sm:left-0 h-full flex max-sm:flex-col duration-400 bg-black`}>
            {
                (Object.values(Tab).map((t, i, arr) => (
                    <div className={`${!!tab ? "group/tab max-sm:translate-x-0 sm:translate-y-0" : "max-sm:translate-x-full sm:translate-y-full"} transition-transform duration-400 w-full h-full text-white text-[1.5rem] cursor-pointer`}
                        style={{ transitionDelay: `${(arr.length - i) * 50}ms` }} onClick={() => { if (t === Tab.Return) { returnToMain(); } else { setTab(t); } }} key={i}>
                        <div className={`w-full h-full flex sm:flex-col gap-4 sm:gap-8 p-4 items-center justify-center max-sm:brightness-75 sm:brightness-50 sm:hover:brightness-95 transition-[filter] ${COLORS[t]}`}>
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