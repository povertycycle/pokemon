import { useState, useEffect } from "react";
import Loading from "../../../utils/Loading";

const DataCorrupted: React.FC<{ pokemon: string | null, error: undefined | null }> = ({ pokemon, error }) => {
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
                error === undefined ?
                    "Pokemon data corrupted! Please contact developer regarding this issue." :
                    (
                        !pokemon ?
                            "Select a pokemon" :
                            (
                                !missing ?
                                    <Loading /> :
                                    "Pokemon data not found."
                            )
                    )
            }
        </div>
    )
}

export default DataCorrupted;