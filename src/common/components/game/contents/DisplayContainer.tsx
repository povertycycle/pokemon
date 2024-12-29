import { Tab } from "@/common/constants/enums";
import PokemonDatabase from "./databases/poke-card/PokemonDatabase";
import { TAB_COLORS } from "@/common/constants/colors";

type DisplayContainerProps = {
    tab: Tab | null;
    returnToSelection: () => void;
}

const DisplayContainer: React.FC<DisplayContainerProps> = ({ tab, returnToSelection }) => {
    return (
        <div className="w-full h-full relative z-0">
            {
                (() => {
                    switch (tab) {
                        case Tab.Pokemon:
                            return <PokemonDatabase back={returnToSelection} />;
                        case Tab.Items:
                        case Tab.Berries:
                        case Tab.Evolution:
                        case Tab.Machines:
                        case Tab.Moves:
                        case Tab.Calculator:
                            return (
                                <div className="w-screen text-center font-default flex-col h-screen flex items-center justify-center bg-white">
                                    <span className="text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[5rem]" style={{ color: TAB_COLORS[tab] }}>Construction in progress for {tab} page</span>
                                    <span className="text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] mt-8" style={{ color: TAB_COLORS[tab] }}>Currently migrating to v2.0</span>
                                    <span className="text-[1.25rem] sm:text-[1.5rem] md:text-[2rem]" style={{ color: TAB_COLORS[tab] }}>Please come back later</span>
                                    <button className="absolute right-2 top-2 hover:brightness-90 transition-[filter] flex items-center justify-center px-2 sm:px-4 rounded-[4px] gap-4 text-white" onClick={returnToSelection} style={{ background: TAB_COLORS[tab] }}>
                                        <i className="text-[1.5rem] ri-reply-fill" /> <span className="max-sm:hidden text-[1.125rem]">Return</span>
                                    </button>
                                </div>
                            )
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