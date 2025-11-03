import { Unavailable } from "@/components/errors/Unavailable";
import { InputDebounced } from "@/components/internal/InputDebounced";
import { Spinner } from "@/components/loaders/Spinner";
import { MAIN_ICON, NAME_QUERY } from "@/constants/game/main";
import { BASE_API_URL_POKEMON } from "@/constants/game/urls";
import { GAME_DATABASE } from "@/constants/routes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getAllPokemons, getPokemonData } from "../../../database/pokemon";
import { usePalette } from "../../../hooks/usePalette";
import {
    PokeData,
    PokemonBase,
    PokeRequest,
} from "../../../interfaces/pokemon";
import { getSprite } from "../../../utils/sprites";
import { getIdentifiers } from "../../../utils/strings";
import { PokeType } from "../../../../../../components/icons/PokeType";

/**
 * Search bar component
 */
export const Searchbar: React.FC = () => {
    const pools = useRef<PokeRequest[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [data, setData] = useState<PokeRequest[] | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const valueRef = useRef<string>("");

    useEffect(() => {
        getAllPokemons().then((res) => {
            pools.current = res?.sort((a, b) => a.id - b.id) ?? [];
        });
    }, []);

    const filterByName = (value: string) => {
        let _data: PokeRequest[] = [];
        let _hasMore = false;
        valueRef.current = value;
        if (!!value && pools.current) {
            for (let i = 0; i < pools.current.length; i++) {
                if (
                    pools.current[i].name
                        .toLowerCase()
                        .replaceAll("-", "")
                        .includes(value.toLowerCase().replaceAll(" ", ""))
                ) {
                    if (_data.length === 5) {
                        _hasMore = true;
                        break;
                    }
                    _data.push(pools.current[i]);
                }
            }
            setHasMore(_hasMore);
            setData(_data);
        } else {
            setData(null);
        }
    };

    function hide() {
        if (ref.current) ref.current.style.display = "none";
    }

    function show() {
        if (ref.current) ref.current.style.display = "flex";
    }

    return (
        <div className="sm:order-1 flex flex-col relative max-sm:h-8 sm:h-full max-sm:w-1/2 z-2 max-sm:grow sm:w-full">
            <InputDebounced
                onChange={filterByName}
                placeholder="Find Pokemon..."
                menu={{
                    ref,
                    show,
                    hide,
                }}
            />
            <div
                ref={ref}
                className="z-0 hidden absolute max-sm:w-[calc(100vw-16px)] top-full left-0"
            >
                <div
                    className="z-1 sm:hidden fixed left-0 top-0 bg-black/65 w-full h-full"
                    onClick={hide}
                />
                <div
                    className={`z-2 flex-col bg-base-white sm:w-full sm:min-w-[480px] rounded-md max-sm:w-screen translate-y-2 sm:shadow-xl overflow-hidden`}
                >
                    {data?.map((dat) => (
                        <PokeMiniCard data={dat} key={dat.name} />
                    ))}
                    {!!data && (hasMore || data.length === 0) && (
                        <div className="w-full flex text-xs py-2 font-medium">
                            <Link
                                className="mx-auto"
                                target="_blank"
                                href={`${GAME_DATABASE}/pokemon?${NAME_QUERY}=${valueRef.current}`}
                            >
                                {data.length === 0 ? (
                                    <NoResultFound
                                        suggestion={suggestion(
                                            pools.current,
                                            valueRef.current
                                        )}
                                    />
                                ) : (
                                    "See More"
                                )}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * Mini pokemon card display
 */
const PokeMiniCard: React.FC<{ data: PokeRequest }> = ({ data }) => {
    const [pokemon, setPokemon] = useState<PokeData | null | undefined>(
        data.data
    );

    useEffect(() => {
        if (pokemon === undefined) {
            getPokemonData(data.id)
                .then((res) => {
                    setPokemon(res.data);
                })
                .catch((err) => {
                    setPokemon(null);
                });
        }
    }, []);

    return (
        <div className="h-16 sm:h-[72px] flex flex-col items-center justify-center relative overflow-hidden">
            {pokemon === undefined ? (
                <Spinner />
            ) : pokemon === null ? (
                <Unavailable url={BASE_API_URL_POKEMON} />
            ) : (
                <MiniDisplay id={data.id} name={data.name} data={pokemon} />
            )}
        </div>
    );
};

/**
 * Card display
 */
const MiniDisplay: React.FC<PokemonBase> = (props) => {
    const mainSprite = getSprite(props.data.sprites);
    const mainIcon = getSprite(props.data.sprites, MAIN_ICON);

    const { palette } = usePalette(mainSprite);
    const identifiers = getIdentifiers(props.name, props.data.species);

    return !!!palette ? (
        <Spinner />
    ) : (
        <Link
            target="_blank"
            href={`${GAME_DATABASE}/pokemon/p?id=${props.id}`}
            className={`border-b border-black overflow-hidden h-full w-full bg-black relative`}
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
                {mainSprite ? (
                    <img
                        className="aspect-square w-20 object-cover"
                        src={mainSprite}
                        alt=""
                    />
                ) : (
                    <Spinner />
                )}
            </div>
            <div
                className={`text-white h-full flex z-2 relative w-full sm:hover:bg-black/0 bg-black/25 cursor-pointer`}
            >
                <div className="h-full aspect-square shrink-0 p-1.5">
                    {!!mainIcon && (
                        <img
                            alt=""
                            src={mainIcon}
                            className="object-contain w-full h-full"
                        />
                    )}
                </div>
                <div className="w-full h-full flex flex-col justify-end relative pb-1">
                    <div className="absolute flex top-0 left-0 rounded-b-semi text-xxs sm:text-xs overflow-hidden max-w-full">
                        {props.data.types.map((type) => (
                            <PokeType
                                className="w-16 sm:w-20"
                                type={type}
                                key={type}
                            />
                        ))}
                    </div>
                    <span className="text-xs sm:text-sm text-white/75">
                        #{`${props.data.index}`.padStart(4, "0")}
                    </span>
                    <div className="flex items-center">
                        <span className="font-medium text-sm sm:text-base capitalize">
                            {props.data.species}
                        </span>
                        {!!identifiers && (
                            <span
                                className={`ml-2 sm:ml-3 text-xs/3 sm:text-sm/4 text-white/75`}
                            >
                                {identifiers.toUpperCase()}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

const NoResultFound: React.FC<{ suggestion: string }> = ({ suggestion }) => {
    return !!suggestion ? (
        <>
            Did you mean <span className="capitalize">{suggestion}</span>
        </>
    ) : (
        "No Pokemon Found"
    );
};

function suggestion(pool: PokeRequest[], text: string): string {
    let str = "";
    let score = -Infinity;
    for (let i = 0; i < pool.length; i++) {
        const pokeName = pool[i].name.replaceAll("-", " ").toLowerCase();
        const _score = calculateScore(text, pokeName);
        if (_score > score) {
            score = _score;
            str = pokeName;
        }
    }

    return str.replaceAll("-", " ");
}

function calculateScore(str1: string, str2: string): number {
    let score = 0;
    let chainLength = 0;
    for (let i = 0; i < str1.length; i++) {
        if (!str2[i]) {
            break;
        }
        if (str2[i] != str1[i]) {
            score -= 1;
        }

        if (str2[i] == str1[chainLength]) {
            chainLength += 1;
        } else {
            chainLength = 0;
        }
    }
    return score - chainLength;
}
