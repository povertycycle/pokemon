import { Unavailable } from "@/components/errors/Unavailable";
import { Spinner } from "@/components/loaders/Spinner";
import { Typewriter } from "@/components/loaders/Typewriter";
import { BASE_API_URL_POKEMON } from "@/constants/game/urls";
import { GAME_DATABASE } from "@/constants/routes";
import { useInView } from "@/utils/hooks";
import Link from "next/link";
import { useState } from "react";
import { getPokemonData } from "../database/pokemon";
import { usePalette } from "../hooks/usePalette";
import { PokeData, PokemonBase, PokeRequest } from "../interfaces/pokemon";
import { getSprite } from "../utils/sprites";
import { getIdentifiers } from "../utils/strings";
import styles from "./animate.module.scss";
import { PokeType } from "../../../../components/icons/PokeType";

/**
 * Card display on database list
 * @param pokemon Pokemon data
 */
export const PokemonCard: React.FC<PokeRequest> = (pokemon) => {
    const [data, setData] = useState<PokeData | null | undefined>(pokemon.data);

    const ref = useInView({
        onIntoView: () => {
            if (data === undefined) {
                getPokemonData(pokemon.id)
                    .then((res) => {
                        setData(res.data);
                    })
                    .catch((err) => {
                        setData(null);
                    });
            }
        },
    });
    return (
        <div
            ref={ref}
            className="h-20 sm:h-40 flex flex-col items-center justify-center relative overflow-hidden"
        >
            {data === undefined ? (
                <Spinner size={24} />
            ) : data === null ? (
                <Unavailable url={BASE_API_URL_POKEMON} />
            ) : (
                <Card id={pokemon.id} name={pokemon.name} data={data} />
            )}
        </div>
    );
};

/**
 * Card display component
 */
const Card: React.FC<Required<PokemonBase>> = (props) => {
    const mainSprite = getSprite(props.data.sprites);
    const { palette } = usePalette(mainSprite);

    return (
        <div className={`w-full h-full flex`}>
            {!!palette ? (
                <Link
                    href={`${GAME_DATABASE}/pokemon/p?id=${props.id}`}
                    className={`${styles.card_render} group max-sm:border-b max-sm:border-black overflow-hidden h-full w-full bg-black relative sm:rounded-semi`}
                >
                    <div
                        className="w-full h-full absolute top-0 left-0 z-0"
                        style={{
                            background: `linear-gradient(90deg,${palette.at(
                                1
                            )}80,${palette.at(0)}80)`,
                        }}
                    />
                    <div className="w-full h-full absolute top-0 left-0 z-1 flex items-center justify-end bg-gradient-to-r from-black/35">
                        {mainSprite && (
                            <img
                                className="sm:group-hover:scale-105 transition-transform aspect-square w-28 sm:w-48 object-cover"
                                src={mainSprite}
                                alt=""
                            />
                        )}
                    </div>
                    <div
                        className={`text-white h-full py-1 px-2 sm:py-2 sm:px-4 flex flex-col justify-end z-1 relative w-full sm:hover:bg-black/0 bg-black/15 cursor-pointer`}
                    >
                        <div className="text-xxs sm:text-sm absolute flex top-0 left-0 rounded-br-semi overflow-hidden max-w-full">
                            {props.data.types.map((type) => (
                                <PokeType type={type} key={type} />
                            ))}
                        </div>
                        <span className="text-sm sm:text-base text-white/75">
                            #{`${props.data.index}`.padStart(4, "0")}
                        </span>
                        <Name name={props.name} species={props.data.species} />
                    </div>
                </Link>
            ) : (
                <Spinner />
            )}
        </div>
    );
};

/**
 * Name display
 */
const Name: React.FC<{ name: string; species: string }> = ({
    name,
    species,
}) => {
    const identifiers = getIdentifiers(name, species);

    return (
        <div className="flex items-center text-base sm:text-lg font-medium">
            <span className="capitalize">
                <Typewriter text={species} duration={500} />
            </span>
            {!!identifiers && (
                <div
                    className={`ml-2 sm:ml-3 text-xs/3 sm:text-sm/4 text-white/75`}
                >
                    {identifiers.toUpperCase()}
                </div>
            )}
        </div>
    );
};
