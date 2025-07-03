import { Unavailable } from "@/components/errors/Unavailable";
import { PokeType } from "@/components/icons/PokeType";
import { Spinner } from "@/components/loaders/Spinner";
import { CATEGORY_COLORS } from "@/constants/game/colors";
import { BASE_API_URL_MOVES } from "@/constants/game/urls";
import { SENTENCES_REGEX } from "@/constants/regex";
import { getMoveData } from "@/requests/moves";
import { getPokemonNameById } from "@/requests/pokemon";
import { useEffect, useState } from "react";
import { getVersionData } from "../pokemon/utils/versions";
import { IMove, MoveRequest } from "./interfaces/moves";
import Link from "next/link";
import { GAME_DATABASE } from "@/constants/routes";

interface DetailDisplayProps {
    details: MoveRequest | null;
    setDetails: (id: MoveRequest | null) => void;
}

/**
 * Item details display
 */
export const DetailDisplay: React.FC<DetailDisplayProps> = ({
    details,
    setDetails,
}) => {
    const [data, setData] = useState<IMove | null>();

    useEffect(() => {
        if (details?.data) {
            setData(details.data);
        } else if (details?.id) {
            getMoveData(details.id)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    setData(null);
                });
        }
    }, [details?.id]);

    return (
        <div
            className={`max-md:fixed max-md:left-0 max-md:top-0 w-screen md:max-w-80 lg:max-w-[480px] h-dvh sm:h-screen ${
                !details ? "max-md:max-h-0" : ""
            } overflow-hidden md:h-[calc(100vh-56px)] max-md:z-max md:sticky md:right-0 md:top-14 flex items-end`}
        >
            <div
                onClick={() => setDetails(null)}
                className="md:hidden w-full h-full absolute left-0 top-0 bg-black/65 z-0"
            />
            <div className="bg-white w-full h-full max-md:max-h-[75dvh] overflow-y-auto z-1 p-3 flex flex-col">
                {!details ? (
                    <span className="text-base-red-7 tracking-wide m-auto text-xl">
                        Select a move
                    </span>
                ) : data === undefined ? (
                    <Spinner />
                ) : data === null ? (
                    <Unavailable url={BASE_API_URL_MOVES} />
                ) : (
                    <Data name={details.name} {...data} />
                )}
            </div>
        </div>
    );
};

const Data: React.FC<{ name: string } & IMove> = (move) => {
    const machines = Object.entries(move.machines);

    return (
        <div className="flex flex-col w-full h-fit">
            <div className="capitalize mx-auto font-medium tracking-wide text-lg">
                {move.name.replaceAll("-", " ")}
            </div>
            <p className="italic text-center text-xs sm:text-sm mt-8 mb-2">
                {move.flavorText}
            </p>
            <div className="flex flex-wrap gap-3 text-xs sm:text-sm my-2">
                <PokeType
                    className="rounded-semi text-xs sm:text-sm text-white"
                    type={move.type}
                />
                <span
                    style={{ background: CATEGORY_COLORS[move.category] }}
                    className="text-white flex gap-1 rounded-semi px-3 sm:px-4 font-medium"
                >
                    {move.category.toUpperCase()}
                </span>
                {!!move.accuracy && (
                    <span className="flex gap-1 bg-base-white rounded-semi px-3">
                        Acc:
                        <span className="font-medium">{move.accuracy}%</span>
                    </span>
                )}
                {move.power && (
                    <span className="flex gap-1 bg-base-white rounded-semi px-3">
                        Pwr:
                        <span className="font-medium">{move.power}</span>
                    </span>
                )}
                <span className="flex gap-1 bg-base-white rounded-semi px-3">
                    PP:
                    <span className="font-medium">{move.pp}</span>
                </span>
            </div>
            {(!!move.effectEntry || machines.length > 0) && (
                <>
                    <hr className="border-t my-2" />
                    <ul className="list-disc text-xs sm:text-sm px-4 flex flex-col gap-1 mt-1 mb-2">
                        {move.effectEntry
                            ?.match(SENTENCES_REGEX)
                            ?.map((t: string, i: number) => (
                                <li key={i}>{t}</li>
                            ))}
                        {machines.length > 0 && (
                            <li>
                                <div className="flex flex-col">
                                    Can be taught via:
                                    <div className="flex flex-col gap-2 mt-1">
                                        {machines.map(([game, machine]) => (
                                            <div
                                                className="flex flex-wrap gap-x-2"
                                                key={game}
                                            >
                                                <span className="flex gap-1 w-fit bg-base-white rounded-semi px-2">
                                                    {machine.toUpperCase()}
                                                </span>{" "}
                                                in <Version game={game} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </>
            )}
            {move.versions.length > 0 && (
                <>
                    <hr className="border-t my-2" />
                    <div
                        className={`flex flex-wrap text-xs sm:text-sm gap-3 my-2`}
                    >
                        {move.versions.map((g) => (
                            <Version game={g} key={g} />
                        ))}
                    </div>
                </>
            )}
            {move.pokemons.length > 0 && (
                <>
                    <hr className="border-t my-2" />
                    <div
                        className={`grid max-sm:grid-cols-6 sm:max-md:grid-cols-12 md:grid-cols-6 xl:grid-cols-8 text-xs sm:text-sm gap-2 my-2`}
                    >
                        {move.pokemons.map((id) => (
                            <PokeIcon key={id} id={id} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

/**
 * Version display
 */
const Version: React.FC<{ game: string }> = ({ game }) => {
    const { name, background } = getVersionData(game, { opacity: "33" });
    return (
        <div className="bg-base-white rounded-semi px-3" style={{ background }}>
            {name}
        </div>
    );
};

/**
 * Pokemon Icon
 */
const PokeIcon: React.FC<{ id: number }> = ({ id }) => {
    const [name, setName] = useState<string>();

    useEffect(() => {
        getPokemonNameById(id)
            .then((res) => {
                setName(res);
            })
            .catch((err) => {
                setName("missing-pokemon-name");
            });
    }, [id]);

    return (
        <Link
            href={`${GAME_DATABASE}/pokemon/p?id=${id}`}
            className="w-full flex aspect-square bg-base-white/50 sm:hover:bg-base-white rounded-md"
        >
            {name && (
                <img
                    className="m-auto"
                    title={name
                        .replaceAll("-", " ")
                        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    alt=""
                    width={48}
                    height={48}
                />
            )}
        </Link>
    );
};
