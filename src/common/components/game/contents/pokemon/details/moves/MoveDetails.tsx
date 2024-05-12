import { useEffect, Fragment, useState } from "react";
import LMVDDisplay from "./LMVDisplay";
import { processMoveDataByName } from "@/common/components/game/database/movesDB";
import { FILTER_TYPE_COLORS } from "../../constants";
import { LevelMethodVersion, MoveData } from "../../interfaces/moves";

type MoveDetailsProps = {
    move: string,
    levelMethodVersions: LevelMethodVersion[]
}

const MoveDetails: React.FC<MoveDetailsProps> = ({ move, levelMethodVersions }) => {
    const [details, setDetails] = useState<MoveData | null>(null);

    const fetchMoveData = (moveName: string) => {
        //     fetch(`${BASE_API_URL_MOVES}/${moveName}`).then(res => {
        //         if (!res.ok) {
        //             throw new Error("Failed to fetch data");
        //         }
        //         return res.json();
        //     }).then(res => {
        //         console.log("FETCH", res);
        //     })
        // }

        // if (cacheIsAllowed()) {
        //     getMoveDataByNameByPokemon(move, pokemon).then(res => {
        //         console.log(res);
        //         if (!res) {
        //             fetchMoveData(move);
        //         } else {
        //             // setDetails(res);
        //             console.log("FORM CACHE", res);
        //         }
        //     })
        // } else {
        //     fetchMoveData(move);
    }


    useEffect(() => {
        processMoveDataByName(move).then(res => {
            setDetails(res);
        });
    }, [move]);

    return (
        details && <LMVDDisplay lmv={levelMethodVersions} move={move} data={details} />
    )
}

{/* <div className="flex gap-4 whitespace-nowrap h-[48px] shrink-0 border-2 border-base-white rounded-[6px] px-2 items-center justify-between">
            
</div> */}

export default MoveDetails;