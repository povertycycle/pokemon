import { DatabaseContext } from "../contexts";
import Navigator, { Tab } from "./Navigator";
import { useState } from "react";
import PokemonDatabase from "./pokemon/PokemonDatabase";
import EvolutionDatabase from "../evolution/EvolutionDatabase";
import EncounterDatabase from "../encounter/EncounterDatabase";
import MachineDatabase from "../machine/MachineDatabase";
import MovesDatabase from "../moves/MovesDatabase";
import ItemsDatabase from "../items/ItemsDatabase";
import BerryDatabase from "../berry/BerryDatabase";
import LocationDatabase from "../location/LocationDatabase";
import GameDatabase from "../game/GameDatabase";

const DatabaseDisplay: React.FC = () => {
    const [tab, setTab] = useState<Tab | null>(null);

    return (
        <div className="w-full h-full relative z-[1] flex ">
            <DatabaseContext.Provider value={{ tab, setTab }}>
                <Navigator />
                {
                    (() => {
                        switch (tab) {
                            case Tab.Pokemon:
                                return <PokemonDatabase />;



                            case Tab.Evolution:
                                return <EvolutionDatabase />;
                            case Tab.Encounters:
                                return <EncounterDatabase />;
                            case Tab.Machines:
                                return <MachineDatabase />;
                            case Tab.Moves:
                                return <MovesDatabase />;
                            case Tab.Items:
                                return <ItemsDatabase />;
                            case Tab.Berries:
                                return <BerryDatabase />;
                            case Tab.Locations:
                                return <LocationDatabase />;
                            case Tab.Games:
                                return <GameDatabase />;
                            default:
                                return null;
                        }
                    })()
                }
            </DatabaseContext.Provider>
        </div>
    )
}

export default DatabaseDisplay;