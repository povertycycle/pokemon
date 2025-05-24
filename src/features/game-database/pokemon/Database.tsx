import { Unavailable } from "@/components/errors/Unavailable";
import { Spinner } from "@/components/loaders/Spinner";
import { BASE_API_URL_POKEMON } from "@/constants/game/urls";
import { useEffect, useState } from "react";
import { getAllPokemons } from "./database/pokemon";
import { PokeRequest } from "./interfaces/pokemon";
import { PokemonList } from "./PokemonList";

/**
 * Database root component to display list of pokemons
 */
export const Database: React.FC = () => {
    const [pokemons, setPokemons] = useState<PokeRequest[] | null>();

    useEffect(() => {
        getAllPokemons()
            .then((res) => {
                setPokemons(res);
            })
            .catch((err) => {
                setPokemons(null);
            });
    }, []);

    return (
        <div
            className={`relative w-full h-full overflow-hidden flex items-center justify-center top-0 `}
        >
            {pokemons === undefined ? (
                <Spinner />
            ) : pokemons === null || pokemons.length === 0 ? (
                <Unavailable url={BASE_API_URL_POKEMON} />
            ) : (
                <PokemonList pokemons={pokemons} />
            )}
        </div>
    );
};
