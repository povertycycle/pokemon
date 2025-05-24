import { MissingData } from "@/components/errors/MissingData";
import { Spinner } from "@/components/loaders/Spinner";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokemon } from "./components/details/Pokemon";
import { getPokemonDetails } from "./database/pokemon";
import { PokemonData } from "./interfaces/pokemon";
import { ErrorString } from "@/interfaces/generic";

/**
 * Pokemon page
 */
export const PokeInfoPage: React.FC = () => {
    const id = useSearchParams()?.get("id");
    const [data, setData] = useState<PokemonData | null>();
    const [error, setError] = useState<ErrorString>(null);

    useEffect(() => {
        const parsedId = parseInt(id ?? "-1");
        if (parsedId > 0) {
            getPokemonDetails(parsedId)
                .then((res) => {
                    setData(res);
                    setError(null);
                })
                .catch((err) => {
                    setData(null);
                    setError(err?.message ?? "Unknown error");
                });
        } else {
            setData(null);
            setError(`Unable to find a Pokemon with the id: ${id}`);
        }
    }, [id]);

    return (
        <div
            className={`relative w-full h-full overflow-y-scroll flex flex-col bg-base-white`}
        >
            {data === undefined ? (
                <Spinner />
            ) : data === null || !!error ? (
                <MissingData missingData={error} />
            ) : (
                <Pokemon {...data} />
            )}
        </div>
    );
};
