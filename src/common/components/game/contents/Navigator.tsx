import { useContext } from "react";
import { DatabaseContext } from "../contexts";
import { PokemonTabIcon, UnknownTabIcon } from "./Icons";

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

const Icons: { [key in Tab]: React.ReactElement } = {
    [Tab.Pokemon]: <PokemonTabIcon />,

    [Tab.Evolution]: <UnknownTabIcon />,
    [Tab.Encounters]: <UnknownTabIcon />,
    [Tab.Machines]: <UnknownTabIcon />,
    [Tab.Moves]: <UnknownTabIcon />,
    [Tab.Items]: <UnknownTabIcon />,
    [Tab.Berries]: <UnknownTabIcon />,
    [Tab.Locations]: <UnknownTabIcon />,
    [Tab.Games]: <UnknownTabIcon />,
}

const Navigator: React.FC = () => {
    const { tab, setTab } = useContext(DatabaseContext);

    return (
        <div className="z-[1] flex flex-col py-1 text-[1.25rem] gap-1 relative shrink-0 w-[46px]">
            {
                Object.entries(Tab).map((entries: [string, Tab], i: number) => (
                    <div key={i} className="flex items-center h-[42px] cursor-pointer" onClick={() => { tab !== entries[1] && setTab(entries[1]) }}>
                        <div className={`peer/navs p-1 z-[1] relative aspect-square h-full flex items-center justify-center rounded-r-[4px] hover:rounded-r-[0px] transition-colors ${tab === entries[1] ? "bg-base-white border-y-2 border-r-2 text-base-red-dark" : "bg-base-red-dark text-base-white"}`}>
                            {tab !== entries[1] && <div className="absolute left-0 top-0 h-full w-full bg-black/25" />}
                            {Icons[entries[1]]}
                        </div>
                        <span className={`text-base z-[0] relative px-2 h-full flex items-center justify-center ${tab === entries[1] ? "text-base-white border-base-white bg-base-red-dark" : "bg-base-white text-base-red-dark"} border-base-red-dark border-y-2 border-r-2 transition-[transform,colors] translate-x-[-100%] peer-hover/navs:translate-x-0 rounded-r-[4px]`}>{entries[0]}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Navigator;