import { DatabaseContext } from "../contexts";
import Navigator from "./navigator/Navigator";
import { useState, useEffect } from "react";
import PokemonDatabase from "./pokemon/PokemonDatabase";
import EvolutionDatabase from "../evolution/EvolutionDatabase";
import EncounterDatabase from "../encounter/EncounterDatabase";
import MachineDatabase from "../machine/MachineDatabase";
import MovesDatabase from "./moves/MovesDatabase";
import ItemsDatabase from "./items/ItemsDatabase";
import BerryDatabase from "./berries/BerryDatabase";
import LocationDatabase from "../location/LocationDatabase";
import GameDatabase from "../game/GameDatabase";
import { Tab } from "./pokemon/details/constants";

const DatabaseDisplay: React.FC = () => {
    const [tab, setTab] = useState<Tab | null>(null);

    return (
        <div className="w-full h-full relative z-[1] flex">
            <DatabaseContext.Provider value={{ tab, setTab }}>
                <Navigator />
                <DisplayContainer tab={tab} />
            </DatabaseContext.Provider>
        </div>
    )
}

const DisplayContainer: React.FC<{ tab: Tab | null }> = ({ tab }) => {
    const [sel, setSel] = useState<Tab | null>(null);

    useEffect(() => {
        if (!sel) {
            setTimeout(() => {
                setSel(tab);
            }, 500)
        } else {
            setSel(tab);
        }
    }, [tab]);

    return (
        (() => {
            switch (sel) {
                case Tab.Pokemon:
                    return <PokemonDatabase />;
                case Tab.Items:
                    return <ItemsDatabase />;
                case Tab.Berries:
                    return <BerryDatabase />;




                case Tab.Evolution:
                    return <EvolutionDatabase />;
                case Tab.Machines:
                    return <MachineDatabase />;
                case Tab.Moves:
                    return <MovesDatabase />;
                case Tab.X:
                    return <LocationDatabase />;
                case Tab.Y:
                    return <GameDatabase />;
                default:
                    return null;
            }
        })()
    )
}

export default DatabaseDisplay;