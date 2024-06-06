import { useContext } from "react";
import { DatabaseContext } from "../../contexts";
import { BerryTabIcon, EvolutionTabIcon, ItemTabIcon, MachineTabIcon, MovesTabIcon, PokemonTabIcon, UnknownTabIcon } from "../Icons";
import { Tab } from "../pokemon/details/constants";
import styles from "./animation.module.scss";

const Icons: { [key in Tab]: React.ReactElement } = {
    [Tab.Pokemon]: <PokemonTabIcon />,
    [Tab.Items]: <ItemTabIcon />,
    [Tab.Berries]: <BerryTabIcon />,
    [Tab.Moves]: <MovesTabIcon />,
    [Tab.Evolution]: <EvolutionTabIcon />,
    [Tab.Machines]: <MachineTabIcon />,



    [Tab.X]: <UnknownTabIcon />,
    [Tab.Y]: <UnknownTabIcon />
}

const Navigator: React.FC = () => {
    const COLORS = [
        { bg: "bg-sp-def-dark", text: "text-sp-def-dark", border: "border-sp-def-dark", transition: "translate-x-0 group-hover/selector:translate-x-[-105%]" },
        { bg: "bg-x-dark", text: "text-x-dark", border: "border-x-dark", transition: "translate-y-0 group-hover/selector:translate-y-[-105%]" },
        { bg: "bg-sp-atk-dark", text: "text-sp-atk-dark", border: "border-sp-atk-dark", transition: "translate-x-0 group-hover/selector:translate-x-[105%]" },
        { bg: "bg-hp-dark", text: "text-hp-dark", border: "border-hp-dark", transition: "translate-y-0 group-hover/selector:translate-y-[105%]" },
        { bg: "bg-atk-dark", text: "text-atk-dark", border: "border-atk-dark", transition: "translate-y-0 group-hover/selector:translate-y-[105%]" },
        { bg: "bg-def-dark", text: "text-def-dark", border: "border-def-dark", transition: "translate-x-0 group-hover/selector:translate-x-[105%]" },
        { bg: "bg-spd-dark", text: "text-spd-dark", border: "border-spd-dark", transition: "group-hover/selector:translate-y-[-105%]" },
        { bg: "bg-y-dark", text: "text-y-dark", border: "border-y-dark", transition: "group-hover/selector:translate-x-[-105%]" }
    ]
    const SIZE = 48;
    const COLUMNS = 4;
    const ROWS = 2;
    const { tab, setTab } = useContext(DatabaseContext);

    return (
        <>
            <div className={`fixed z-[1] left-0 top-0 text-[1.25rem]`}>
                {
                    Object.entries(Tab).map((entries: [string, Tab], i: number) => (
                        <div className={`${styles.entryAnimation} ${tab && tab !== entries[1] ? "brightness-[75%] hover:brightness-[85%]" : "brightness-100"} group/selector absolute flex items-center transition-all duration-300 cursor-pointer ${!tab ? "overflow-hidden border-2" : "left-[-40px] hover:left-[0]"}`} style={{
                            width: !tab ? `${100 / COLUMNS}vw` : `${SIZE}px`,
                            height: !tab ? `${100 / ROWS}vh` : `${SIZE}px`,
                            top: !tab ? `${Math.floor(i / COLUMNS) * 100 / ROWS}vh` : `${(SIZE + 8) * i}px`,
                            left: !tab ? `${(100 / COLUMNS * (i % COLUMNS))}vw` : "",
                        }} key={i} onClick={() => { tab !== entries[1] && setTab(entries[1]) }}>
                            <div className={`shrink-0 z-[2] relative h-full flex items-center justify-center transition-all duration-300 overflow-hidden ${!tab ? "w-full" : `${COLORS[i].bg} aspect-square rounded-r-[4px] hover:rounded-r-[0px]`}`}>
                                <div className={`z-[1] relative duration-300 transition-[transform,padding] max-h-[192px] h-full w-full flex items-center justify-center text-base-white ${!tab ? "text-[5rem] group-hover/selector:translate-y-[-30%] p-8" : `p-1`}`}>
                                    {Icons[entries[1]]}
                                </div>
                            </div>
                            <div className={`${!tab ? `${COLORS[i].transition} ${COLORS[i].bg}` : `${tab && tab !== entries[1] ? "opacity-25" : "opacity-0"}" bg-black rounded-r-[4px]`} h-full w-full top-0 absolute z-[1] transition-transform duration-300`} />
                            <div className={`relative duration-300 z-[0] px-2 h-full flex items-center justify-center transition-[transform,colors] ${COLORS[i].border} ${!tab ? `translate-x-[-100%] shrink-0 w-full text-[4rem] translate-y-[20%] ${COLORS[i].text}` : `${tab === entries[1] ? `` : ``} ${COLORS[i].bg} text-base-white text-base border-y-2 border-r-2 translate-x-[-100%] group-hover/selector:translate-x-0 rounded-r-[4px]`}`}>{entries[0]}</div>
                        </div>
                    ))
                }
            </div>




            {/* <div className="fixed top-[50vh] z-[20] right-[50vw] w-[50px] h-[50px] bg-black" onClick={() => { setTab(null) }} /> */}
        </>
    )
}

export default Navigator;