import { Spinner } from "@/components/loaders/Spinner";
import { MAIN_ICON } from "@/constants/game/main";
import { PaletteContext } from "@/stores/contexts";
import { isDark } from "@/utils/colors";
import { usePalette } from "../../hooks/usePalette";
import { PokemonData } from "../../interfaces/pokemon";
import { getSprite } from "../../utils/sprites";
import { PokeType } from "../../../../../components/icons/PokeType";
import { Abilities } from "./abilities/Abilities";
import { Bio } from "./bio/Bio";
import { Details } from "./bio/Details";
import { Forms } from "./evolutions/Forms";
import { BugReporting } from "./feedback/BugReporting";
import { Header } from "./header/Header";
import { SpriteViewer } from "./sprites/SpriteViewer";
import { Stats } from "./stats/Stats";
import { Moves } from "./moves/Moves";
import { Encounters } from "./encounters/Encounters";

/**
 * Pokemon container
 */
export const Pokemon: React.FC<PokemonData> = (props) => {
    const mainSprite = getSprite(props.data.sprites);
    const { palette } = usePalette(mainSprite);

    return !!palette ? <Display data={props} palette={palette} /> : <Spinner />;
};

/**
 * Displayer component
 */
const Display: React.FC<{ data: PokemonData; palette: string[] }> = ({
    data: { data, details, name, id },
    palette,
}) => {
    const value = {
        light: {
            background: palette[0],
            color: isDark(palette[0]) ? "#ffffff" : "#000000",
        },
        dark: {
            background: palette[1],
            color: isDark(palette[1]) ? "#ffffff" : "#000000",
        },
    };

    return (
        <PaletteContext.Provider value={value}>
            <div
                className="w-full flex flex-col items-center grow"
                style={{ background: `${palette[0]}f2` }}
            >
                <Header
                    index={data.index}
                    name={name}
                    species={data.species}
                    icon={
                        data.sprites.find((sprite) => sprite.game === MAIN_ICON)
                            ?.url
                    }
                />
                <div className="flex flex-col w-full max-sm:items-center max-w-screen-xl relative grow">
                    <div className="flex max-sm:flex-col gap-4 w-full relative">
                        <PokeTypes types={data.types} />
                        <div
                            className="shrink-0 sm:max-w-box w-full relative overflow-hidden p-6 shadow-lg sm:border-x border-b bg-white/75"
                            style={{ borderColor: value.light.background }}
                        >
                            <SpriteViewer
                                sprites={data.sprites}
                                cries={data.metaData.cries}
                            />
                        </div>

                        <div
                            className="sm:h-box flex flex-col sm:flex-col-reverse bg-white/75 w-full overflow-y-auto shadow-lg max-sm:border-t border-b sm:border-x"
                            style={{ borderColor: value.light.background }}
                        >
                            <Bio
                                species={details.species}
                                types={data.types}
                                heldItems={data.heldItems}
                            />
                        </div>
                    </div>
                    <div className="w-full flex max-md:flex-col md:gap-4">
                        <div
                            className="max-sm:w-full bg-white/75 mt-4 border-y sm:border-x pb-2 pt-1 shadow-lg flex flex-col"
                            style={{ borderColor: value.dark.background }}
                        >
                            <Stats stats={data.stats} />
                        </div>
                        <div
                            className="max-sm:w-full md:w-box md:aspect-square shrink-0 bg-white/75 mt-4 border-y sm:border-x pt-1 shadow-lg"
                            style={{ borderColor: value.dark.background }}
                        >
                            <Details
                                {...details.metaData}
                                {...data.metaData}
                                habitat={details.species.habitat}
                                shape={details.species.shape}
                            />
                        </div>
                    </div>
                    <div
                        className="w-full flex pt-1 flex-col bg-white/75 mt-4 border-y sm:border-x shadow-lg"
                        style={{ borderColor: palette[1] }}
                    >
                        <Abilities abilities={data.abilities} />
                    </div>
                    <div
                        className="w-full flex flex-col bg-white/75 mt-4 border-y sm:border-x shadow-lg"
                        style={{ borderColor: palette[1] }}
                    >
                        <Forms
                            evolutions={details.evolutions}
                            current={{
                                id,
                                name,
                                data,
                            }}
                        />
                    </div>
                    <div
                        className="w-full flex flex-col bg-white/75 mt-4 border-y sm:border-x shadow-lg"
                        style={{ borderColor: palette[1] }}
                    >
                        <Moves moves={data.moves} />
                    </div>
                    <div
                        className="w-full flex flex-col bg-white/75 mt-4 border-y sm:border-x shadow-lg"
                        style={{ borderColor: palette[1] }}
                    >
                        <Encounters
                            id={id}
                            palPark={details.encounters.palPark}
                            encounters={details.encounters.data}
                        />
                    </div>
                </div>
                <BugReporting name={name} species={data.species} />
            </div>
        </PaletteContext.Provider>
    );
};

/**
 * Pokemon type display
 */
const PokeTypes: React.FC<{ types: string[] }> = ({ types }) => {
    return (
        <div className="absolute left-0 top-0 text-white flex sm:max-w-box py-2 px-2 sm:px-3 text-sm sm:text-base gap-2 z-1">
            {types.map((type) => (
                <PokeType
                    className="text-sm sm:text-base font-medium rounded-full px-3 sm:px-5"
                    type={type}
                    key={type}
                />
            ))}
        </div>
    );
};
