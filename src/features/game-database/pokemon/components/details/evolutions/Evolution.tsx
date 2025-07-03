import { Spinner } from "@/components/loaders/Spinner";
import { MAIN_ICON } from "@/constants/game/main";
import { GAME_DATABASE } from "@/constants/routes";
import { PaletteContext } from "@/stores/contexts";
import { useInView } from "@/utils/hooks";
import Link from "next/link";
import { useContext, useState } from "react";
import { IEvolution } from "../../../database/evolutions";
import { getPokemonData } from "../../../database/pokemon";
import { usePalette } from "../../../hooks/usePalette";
import { PokemonBase } from "../../../interfaces/pokemon";
import { getSprite } from "../../../utils/sprites";
import { getIdentifiers } from "../../../utils/strings";
import { PokeType } from "../../../../../../components/icons/PokeType";
import { Conditions, EVOLUTION_HTML_ID } from "./Conditions";

type EvolutionProps = {
    stage: number;
    data: IEvolution;
    defaultData?: PokemonBase;
};

/**
 * Evolution display details
 */
export const Evolution: React.FC<EvolutionProps> = ({
    stage,
    data,
    defaultData,
}) => {
    const palette = useContext(PaletteContext);
    const [pokemon, setPokemon] = useState<PokemonBase | null | undefined>(
        defaultData
    );

    const ref = useInView({
        onIntoView: () => {
            if (pokemon === undefined) {
                getPokemonData(data.pokemon)
                    .then((res) => {
                        setPokemon(res);
                    })
                    .catch((err) => {
                        setPokemon(null);
                    });
            }
        },
    });

    return (
        <div ref={ref} className={`min-h-[72px] flex grow`}>
            {!pokemon ? (
                <Spinner size={24} />
            ) : (
                <Display
                    stage={stage}
                    data={data}
                    pokemon={pokemon}
                    defaultPalette={
                        !!defaultData
                            ? [
                                  palette.light.background,
                                  palette.dark.background,
                              ]
                            : undefined
                    }
                />
            )}
        </div>
    );
};

/**
 * Pokemon display data
 */
const Display: React.FC<{
    stage: number;
    data: IEvolution;
    pokemon: PokemonBase;
    defaultPalette?: string[];
}> = ({ stage, data, pokemon, defaultPalette }) => {
    const mainSprite = getSprite(pokemon.data.sprites);
    const mainIcon = getSprite(pokemon.data.sprites, MAIN_ICON);
    const { palette } = usePalette(mainSprite, defaultPalette);
    const identifiers = getIdentifiers(pokemon.name, pokemon.data.species);

    return !palette ? (
        <Spinner />
    ) : (
        <div
            className={`flex flex-col items-center relative overflow-hidden grow bg-black group`}
            style={{ color: palette?.[0] }}
        >
            {!defaultPalette && (
                <Link
                    target="_blank"
                    href={`${GAME_DATABASE}/pokemon/p?id=${pokemon.id}`}
                    className="peer w-full h-full absolute z-10 top-0 left-0"
                />
            )}
            <div
                className="w-full h-full absolute top-0 left-0"
                style={{
                    background: `linear-gradient(90deg,${palette?.[1]}b3,${palette?.[0]}b3)`,
                }}
            />
            <div className="w-full h-full flex bg-gradient-to-r from-black/35 relative sm:max-xl:px-8">
                <div className="mx-auto flex max-md:flex-col w-full h-full relative">
                    <div
                        className={`absolute w-28 right-0 aspect-square top-1/2 -translate-y-1/2 md:left-96 md:-translate-x-full`}
                    >
                        {mainSprite && (
                            <img
                                className={`h-full w-full object-cover z-0 ${
                                    !defaultPalette
                                        ? "sm:group-hover:scale-125 transition-transform"
                                        : ""
                                }`}
                                src={mainSprite}
                                alt=""
                            />
                        )}
                    </div>
                    <div
                        className={`w-full h-[72px] flex relative md:max-w-screen-sm md:shrink-0`}
                    >
                        <div className="h-full aspect-square flex items-center justify-center">
                            {!!mainIcon ? (
                                <img
                                    alt=""
                                    src={mainIcon}
                                    className="object-contain w-full h-full"
                                />
                            ) : (
                                <i
                                    className="ri-question-mark text-xl"
                                    style={{ color: palette?.[1] }}
                                />
                            )}
                        </div>
                        <div className="w-full flex flex-col justify-center relative">
                            <div className="text-white absolute flex top-0 left-0 text-xxs sm:text-xs rounded-b-semi overflow-hidden max-w-full">
                                {pokemon.data.types.map((type) => (
                                    <PokeType key={type} type={type} />
                                ))}
                            </div>
                            <div className="w-full h-full flex flex-col justify-end pb-1">
                                <span className="text-xs sm:text-sm brightness-110">
                                    #{`${pokemon.data.index}`.padStart(4, "0")}
                                </span>
                                <div className="flex items-center brightness-110">
                                    <span
                                        id={`${EVOLUTION_HTML_ID}-${stage}`}
                                        data-color={palette?.[0]}
                                        className="font-medium text-sm sm:text-base capitalize"
                                    >
                                        {pokemon.data.species}
                                    </span>
                                    {!!identifiers && (
                                        <span
                                            className={`ml-2 sm:ml-3 text-xs/3 sm:text-sm/4`}
                                        >
                                            {identifiers.toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {((data.conditions && data.conditions.length > 0) ||
                        data.isBaby) && (
                        <Conditions
                            isBaby={data.isBaby}
                            babyItemId={data.babyItemId}
                            conditions={data.conditions}
                            stage={stage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
