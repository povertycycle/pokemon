import { useState, useEffect } from "react";
import Loading from "../../../utils/Loading";
import { Pokemon, SecondaryData } from "../interfaces/pokemon";

type DataCorruptedProps = {
    pokemon: string | null,
    main: Pokemon | null | undefined,
    second: SecondaryData | null | undefined
}

const DataCorrupted: React.FC<DataCorruptedProps> = ({ pokemon, main, second }) => {
    const MAX_TIME = 5000;
    const [missing, setMissing] = useState<boolean>(false);

    useEffect(() => {
        const tId = window.setTimeout(() => {
            setMissing(true);
        }, MAX_TIME)

        return () => {
            window.clearTimeout(tId);
        };
    }, []);

    return (
        <div className="w-full h-full text-base-white flex items-center justify-center text-[3rem]">
            {
                !pokemon ?
                    "Select a pokemon" :
                    (
                        main === null || second === null ?
                            "Pokemon data corrupted! Please contact developer regarding this issue." :
                            <Loading />
                    )
            }
        </div>
    )
}

export default DataCorrupted;