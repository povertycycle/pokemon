import { useContext, useEffect, useState } from "react";
import { DetailsContext } from "../contexts";
import Sprites from "./sprites/Sprites";
import Species from "./species/Species";
import { SpritesData } from "../../interfaces/sprites";
import { Pokemon, Stats } from "../../interfaces/pokemon";

type BioProps = {
    details: Pokemon
    data: SpritesData;
}

const Bio: React.FC<BioProps> = ({ details, data }) => {
    const primary = { base_experience: details.base_experience, height: details.height, weight: details.weight };

    return (
        <div className="w-full flex">
            <Species species={details.species} stats={details.stats} primary={primary} />
            <Sprites pokemon={details.name} data={data} />



            {/* <div className="w-full flex flex-col bg-base-white/50 rounded-l-[8px] p-4">
                <span>Base experience yield {details?.base_experience || "???"}</span>
                <span>Height {details?.height}</span>
                <span>Weight {details?.weight}</span>
            </div> */}
            {/* <div className="w-full flex flex-col border-2 border-base-white/50 rounded-r-[8px] overflow-hidden">

            </div> */}
        </div>
    )
}

export default Bio;