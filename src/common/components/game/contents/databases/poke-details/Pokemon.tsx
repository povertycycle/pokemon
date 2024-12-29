import { TYPE_COLORS } from "@/common/constants/colors";
import { usePalette } from "@/common/hooks/usePalette";
import { PokemonData } from "@/common/interfaces/pokemon";
import { isDark } from "@/common/utils/colors";
import { PaletteContext } from "./_utils";
import Abilities from "./abilities/Abilities";
import Details from "./details/Details";
import BugReporting from "./feedback/BugReporting";
import Header from "./header/Header";
import Moves from "./moves/Moves";
import Genera from "./species/Genera";
import HeldItems from "./species/HeldItems";
import SpriteViewer from "./sprites/SpriteViewer";
import Effectiveness from "./stats/Effectiveness";
import Stats from "./stats/Stats";
import Evolutions from "./evolutions/Variations";
import Locations from "./encounters/Locations";
import Spinner from "@/common/components/_utils/loading/Spinner";
import Bookmarks from "../bookmarks/Bookmarks";
import FlavorText from "./details/FlavorText";

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
    const value = { palette, text: palette.map(color => isDark(color) ? "#ffffff" : "#000000") }
    return (
        <PaletteContext.Provider value={value}>
            <div className="w-full flex flex-col items-center" style={{ background: `${palette[0]}f2` }}>
                <Header index={data.index} name={data.name} species={data.species} icon={data.mainSprites.icon} />
                <div className="flex flex-col w-full max-sm:items-center max-w-[1280px] relative grow">
                    <div className="flex max-sm:flex-col gap-4 w-full relative">
                        <div className="absolute left-0 sm:left-3 top-0 text-white flex sm:max-w-[400px] py-2 max-sm:px-2 gap-2 z-1">
                            {
                                data.types.map((type, i) => (
                                    <div key={i} className={`px-8 rounded-full flex items-center justify-center shadow-md`} style={{ background: TYPE_COLORS[type] }}>
                                        <span className="drop-shadow-[0_0_1px_black] sm:drop-shadow-[0_0_2px_black]">{type.toUpperCase()}</span>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="shrink-0 sm:max-w-[400px] w-full relative overflow-hidden p-6 shadow-lg sm:border-x border-b bg-white/75" style={{ borderColor: palette[1] }}>
                            <SpriteViewer defaultSprite={data.mainSprites.default} sprites={data.sprites} cries={data.metaData.cries} />
                        </div>
                        <div className="sm:h-[400px] flex flex-col sm:flex-col-reverse bg-white/75 w-full overflow-y-auto shadow-lg max-sm:border-t border-b sm:border-x" style={{ borderColor: palette[1] }}>
                            <Genera genera={data.speciesData.genera} category={{ isBaby: data.speciesData.isBaby, isLegendary: data.speciesData.isLegendary, isMythical: data.speciesData.isMythical }} />
                            <div className="w-full flex flex-col grow">
                                <FlavorText flavorText={data.speciesData.flavorText} />
                                <div className="w-full flex max-sm:flex-col gap-2 sm:items-end">
                                    <Effectiveness types={data.types} />
                                    {
                                        data.heldItemIDs.length > 0 && <HeldItems itemIDs={data.heldItemIDs} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex max-sm:flex-col sm:gap-4">
                        <div className="max-sm:w-full bg-white/75 mt-4 border-y sm:border-x pb-2 pt-1 shadow-lg flex flex-col" style={{ borderColor: palette[1] }}>
                            <Stats stats={data.stats} />
                        </div>
                        <div className="max-sm:w-full sm:w-[400px] sm:h-[400px] shrink-0 bg-white/75 mt-4 border-y sm:border-x pt-1 shadow-lg" style={{ borderColor: palette[1] }}>
                            <Details metaData={{ ...data.metaData, habitat: data.speciesData.habitat, shape: data.speciesData.shape }} />
                        </div>
                    </div>
                    <div className="w-full flex pt-2 flex-col bg-white/75 mt-4 border-y sm:border-x shadow-lg" style={{ borderColor: palette[1] }}>
                        <Abilities abilities={data.abilities} pokeId={data.id} />
                    </div>
                    <div className="w-full flex flex-col pt-2 bg-white/75 mt-4 border-y sm:border-x shadow-lg" style={{ borderColor: palette[1] }}>
                        <Evolutions evolutions={data.evolutions} current={{
                            id: data.id,
                            abilities: data.abilities,
                            index: data.index,
                            name: data.name,
                            mainSprites: data.mainSprites,
                            species: data.species,
                            types: data.types,
                        }} />
                    </div>
                    <div className="w-full flex flex-col bg-white/75 mt-4 border-y sm:border-x shadow-lg" style={{ borderColor: palette[1] }}>
                        <Moves moves={data.moves} />
                    </div>
                    <div className="w-full flex flex-col pt-2 bg-white/75 mt-4 border-y sm:border-x shadow-lg" style={{ borderColor: palette[1] }}>
                        <Locations id={data.id} palPark={data.encounters.palPark} data={data.encounters.data} />
                    </div>
                </div>
                <BugReporting name={data.name} species={data.species} />
            </div>
        </PaletteContext.Provider>
    )
}