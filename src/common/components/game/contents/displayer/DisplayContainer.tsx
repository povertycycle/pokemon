import { Tab } from "@/constants/enums";
import PokemonDatabase from "../databases/poke-card/PokemonDatabase";

type DisplayContainerProps = {
    tab: Tab | null;
    returnToSelection: () => void;
}

const DisplayContainer: React.FC<DisplayContainerProps> = ({ tab, returnToSelection }) => {
    return (
        <div className="w-full h-full relative z-[0]">
            {
                (() => {
                    switch (tab) {
                        case Tab.Pokemon:
                            return <PokemonDatabase back={returnToSelection} />;
                        case Tab.Items:
                        // return <ItemsDatabase />;
                        case Tab.Berries:
                        // return <BerryDatabase />;
                        case Tab.Evolution:
                        // return <EvolutionDatabase />;
                        case Tab.Machines:
                        // return <MachineDatabase />;
                        case Tab.Moves:
                        // return <MovesDatabase />;
                        case Tab.Calculator:
                        // return <LocationDatabase />;
                        case Tab.Return:
                        default:
                            return null;
                    }
                })()
            }
        </div>
    )
}

export default DisplayContainer;