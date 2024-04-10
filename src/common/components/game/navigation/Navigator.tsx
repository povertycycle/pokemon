import { useContext } from "react";
import { DatabaseContext } from "../contexts";

export enum Tab {
    Pokemon = "Pokemon",
    Evolution = "Evolution",
    Encounters = "Encounters",
    Machines = "Machines",
    Moves = "Moves",
    Items = "Items",
    Berries = "Berries",
    Locations = "Locations",
    Games = "Games",
}

const Navigator: React.FC = () => {
    const { tab, setTab } = useContext(DatabaseContext);

    return (
        <div className="flex flex-col py-1 text-[1.25rem] gap-1 relative shrink-0 w-[40px]">
            {
                Object.entries(Tab).map((entries: [string, Tab], i: number) => (
                    <div key={i} className="flex items-center h-[36px] cursor-pointer" onClick={() => { tab !== entries[1] && setTab(entries[1]) }}>
                        <div className={`peer/navs z-[1] relative aspect-square h-full flex items-center justify-center rounded-r-[4px] hover:rounded-r-[0px] text-base-white transition-colors ${tab === entries[1] ? "bg-base-white border-base-red-dark border-y-2 border-r-2 text-base-red-dark" : "bg-base-red-dark"}`}><i className="ri-question-mark" /></div>
                        <span className={`text-base z-[0] relative px-2 h-full flex items-center justify-center ${tab === entries[1] ? "text-base-white border-base-white bg-base-red-dark" : "text-base-red-dark"} border-base-red-dark border-y-2 border-r-2 transition-[transform,colors] translate-x-[-100%] peer-hover/navs:translate-x-0 rounded-r-[4px]`}>{entries[0]}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Navigator;