import { usePalette } from "@/common/hooks/usePalette";
import { PokemonData } from "@/common/interfaces/pokemon";
import { isDark } from "@/common/utils/colors";
import Image from "next/image";
import { PaletteContext } from "./_utils";
import Header from "./header/Header";
import Navigation from "./header/Navigation";
import SpriteViewer from "./sprites/SpriteViewer";

type PokemonProps = {
    data: PokemonData;
}

const Pokemon: React.FC<PokemonProps> = ({ data }) => {
    const { palette } = usePalette(data.mainSprites.default);

    return (
        <div className="flex flex-col w-full h-full pt-[64px]">
            <Navigation palette={palette} />
            {/* {
                !!palette ?
                    <Display data={data} palette={palette} /> :
                    <div className="w-full h-[96px] flex items-center justify-center m-auto">
                        <Image className="text-white w-[48px] sm:w-[64px] aspect-square" src={"/img/spinner.svg"} alt="" width={48} height={48} />
                    </div>
            } */}
        </div>
    )
}

export default Pokemon;

const Display: React.FC<{ data: PokemonData; palette: string[] }> = ({ data, palette }) => {
    return (
        <PaletteContext.Provider value={{ palette, text: palette.map(color => isDark(color) ? "#ffffff" : "#000000") }}>
            <div className="w-full h-full flex flex-col overflow-y-auto" style={{ background: palette[1] }}>
                <Header index={data.index} name={data.name} species={data.species} types={data.types} />
                <div className="flex max-sm:flex-col w-full max-sm:items-center">
                    <SpriteViewer defaultSprite={data.mainSprites.default} sprites={data.sprites} cries={data.metaData.cries} />
                </div>
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
//     speciesData: {
//         genera?: string | null;
//         habitat?: string | null;
//         shape?: string | null;
//         isBaby: boolean;
//         isLegendary: boolean;
//         isMythical: boolean;
//         flavorText?: string | null;
//     }
//     evolutions: {
//         chain: string;
//         variants: string[];
//         formDescription?: string | null;
//         formSwitchable: boolean;
//     }
//     encounters: {
//         palPark: PalParkEncounter[];
//     }
//     metaData: {
//         baseExperience: number;
//         height: number;
//         weight: number;
//         details: {
//             baseHappiness: number;
//             captureRate: number;
//             growthRate: string;
//             eggGroups: string[];
//             genderRate: number;
//             hatchCounter: number;
//         } | null;
//     }
//     heldItemIDs: string[];
//     moves: {
//         [name: string]: {
//             [method: string]: string[];
//         }
//     };
//     stats: Stats;
// }