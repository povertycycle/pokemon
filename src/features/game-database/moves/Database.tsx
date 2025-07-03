import { Unavailable } from "@/components/errors/Unavailable";
import { Spinner } from "@/components/loaders/Spinner";
import { BASE_API_URL_MOVES } from "@/constants/game/urls";
import { useEffect, useState } from "react";
import { getAllMoves } from "./database/moves";
import { MoveRequest } from "./interfaces/moves";
import { MoveList } from "./MoveList";

/**
 * Database root component to display list of items
 */
export const Database: React.FC = () => {
    const [moves, setMoves] = useState<MoveRequest[] | null>();

    useEffect(() => {
        getAllMoves()
            .then((res) => {
                setMoves(res.sort((a, b) => a.name.localeCompare(b.name)));
            })
            .catch((err) => {
                setMoves(null);
            });
    }, []);

    return (
        <div
            className={`relative w-full h-full overflow-hidden flex items-center justify-center top-0 `}
        >
            {moves === undefined ? (
                <Spinner />
            ) : moves === null || moves.length === 0 ? (
                <Unavailable url={BASE_API_URL_MOVES} />
            ) : (
                <MoveList moves={moves} />
            )}
        </div>
    );
};
