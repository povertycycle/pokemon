import { Unavailable } from "@/components/errors/Unavailable";
import { Spinner } from "@/components/loaders/Spinner";
import { BASE_API_URL_BERRIES } from "@/constants/game/urls";
import { useEffect, useState } from "react";
import { BerryList } from "./BerryList";
import { getAllBerries } from "./database/berries";
import { BerryRequest } from "./interfaces/berries";

/**
 * Database root component to display list of pokemons
 */
export const Database: React.FC = () => {
    const [berries, setBerries] = useState<BerryRequest[] | null>();

    useEffect(() => {
        getAllBerries()
            .then((res) => {
                setBerries(res);
            })
            .catch((err) => {
                setBerries(null);
            });
    }, []);

    return (
        <div
            className={`relative w-full h-full overflow-hidden flex items-center justify-center top-0 `}
        >
            {berries === undefined ? (
                <Spinner />
            ) : berries === null || berries.length === 0 ? (
                <Unavailable url={BASE_API_URL_BERRIES} />
            ) : (
                <BerryList berries={berries} />
            )}
        </div>
    );
};
