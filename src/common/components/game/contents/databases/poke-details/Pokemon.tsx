import { usePalette } from "@/common/hooks/usePalette";
import { PokemonData } from "@/common/interfaces/pokemon";
import { isDark } from "@/common/utils/colors";
import Image from "next/image";
import { PaletteContext } from "./_utils";
import Header from "./header/Header";
import SpriteViewer from "./sprites/SpriteViewer";
import { TYPE_COLORS } from "@/common/constants/colors";
import BugReporting from "./feedback/BugReporting";
import Details from "./details/Details";
import Genera from "./species/Genera";
import Effectiveness from "./stats/Effectiveness";
import Stats from "./stats/Stats";
import HeldItems from "./species/HeldItems";
import Abilities from "./abilities/Abilities";
import Spinner from "../../_utils/Spinner";

type PokemonProps = {
    data: PokemonData;
}

const Pokemon: React.FC<PokemonProps> = ({ data }) => {
    const { palette } = usePalette(data.mainSprites.default);

    return (
        !!palette ?
            <Display data={data} palette={palette} /> :
            <div className="w-full h-[96px] flex items-center justify-center m-auto">
                <Spinner />
            </div>
    )
}

export default Pokemon;

const Display: React.FC<{ data: PokemonData; palette: string[] }> = ({ data, palette }) => {
    return (
        <PaletteContext.Provider value={{ palette, text: palette.map(color => isDark(color) ? "#ffffff" : "#000000") }}>
            <div className="w-full flex flex-col items-center" style={{ background: `${palette[0]}f2` }}>
                <Header index={data.index} name={data.name} species={data.species} />
                <div className="z-[0] flex flex-col w-full max-sm:items-center max-w-[1280px] relative grow">
                    <div className="absolute left-0 sm:left-4 top-0 text-white z-[2] flex sm:max-w-[400px] p-2 gap-2">
                        {
                            data.types.map((type, i) => (
                                <div key={i} className={`px-8 rounded-full flex items-center justify-center shadow-md`} style={{ background: TYPE_COLORS[type] }}>
                                    <span className="drop-shadow-[0_0_1px_black]">{type.toUpperCase()}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex max-sm:flex-col gap-4 w-full">
                        <div className="shrink-0 sm:max-w-[400px] w-full relative z-[1] overflow-hidden p-6 shadow-lg sm:border-x border-b bg-white/75" style={{ borderColor: palette[1] }}>
                            <SpriteViewer defaultSprite={data.mainSprites.default} sprites={data.sprites} cries={data.metaData.cries} />
                        </div>
                        <div className="max-sm:pb-4 sm:h-[400px] flex flex-col sm:flex-col-reverse bg-white/75 w-full overflow-y-auto shadow-lg max-sm:border-t border-b sm:border-x" style={{ borderColor: palette[1] }}>
                            <Genera genera={data.speciesData.genera} category={{ isBaby: data.speciesData.isBaby, isLegendary: data.speciesData.isLegendary, isMythical: data.speciesData.isMythical }} />
                            <div className="w-full flex flex-col grow">
                                <span className="font-vcr-mono my-10 sm:my-auto w-full italic tracking-wider sm:text-[1.125rem] leading-6 px-8 text-center">{"\u201C"}{data.speciesData.flavorText}{"\u201D"}</span>
                                <Effectiveness types={data.types} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex max-sm:flex-col sm:gap-4">
                        <div className="max-sm:w-full bg-white/75 mt-4 border-y sm:border-x py-2 shadow-lg flex flex-col" style={{ borderColor: palette[1] }}>
                            <Stats stats={data.stats} />
                        </div>
                        <div className="max-sm:w-full sm:w-[400px] sm:h-[400px] shrink-0 bg-white/75 mt-4 border-y sm:border-x pt-2 shadow-lg" style={{ borderColor: palette[1] }}>
                            <Details metaData={{ ...data.metaData, habitat: data.speciesData.habitat, shape: data.speciesData.shape }} />
                        </div>
                    </div>
                    <div className="w-full flex max-sm:flex-col bg-white/75 mt-4 border-y sm:border-x shadow-lg" style={{ borderColor: palette[1] }}>
                        <Abilities abilities={data.abilities} pokeId={data.id} />
                    </div>

                    {
                        // data.heldItemIDs.length > 0 && <HeldItems itemIDs={data.heldItemIDs} />
                    }
                </div>
                <BugReporting name={data.name} species={data.species} />
            </div>
        </PaletteContext.Provider>
    )
}

// type PokemonCard = {
//     abilities: string[];
//     mainSprites: {
//         icon: string;
//     };
// }

// interface PokemonDetails {
//     evolutions: {
//         chain: string;
//         variants: string[];
//         formDescription?: string | null;
//         formSwitchable: boolean;
//     }
//     encounters: {
//         palPark: PalParkEncounter[];
//     }
//     heldItemIDs: string[];
//     moves: {
//         [name: string]: {
//             [method: string]: string[];
//         }
//     };
// }



