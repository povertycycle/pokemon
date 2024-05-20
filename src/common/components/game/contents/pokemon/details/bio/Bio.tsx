import { useContext, useEffect, useState } from "react";
import { Pokemon } from "../../interfaces/pokemon";
import { SpritesData } from "../../interfaces/sprites";
import Species from "./species/Species";
import Sprites from "./sprites/Sprites";
import { DetailsContext } from "../contexts";
import { SpeciesData } from "../../interface";
import { fetchSpeciesDetails } from "@/common/components/game/database/speciesDB";
import Training from "./species/Training";

type BioProps = {
    details: Pokemon
    data: SpritesData;
}

const Bio: React.FC<BioProps> = ({ details, data }) => {
    const [speciesData, setSpeciesData] = useState<SpeciesData | null>(null);
    const primary = details && { base_experience: details.base_experience, height: details.height, weight: details.weight };

    useEffect(() => {
        if (details.species) {
            fetchSpeciesDetails(details?.species).then(res => {
                if (res) {
                    setSpeciesData(res);
                }
            })
        }
    }, [details.species]);


    return (
        <div className="w-full flex justify-end max-h-[90vh] h-auto">
            <Species species={details.species} speciesData={speciesData} />
            <div className="flex flex-col shrink-0 pt-2 items-end gap-4">
                <Sprites data={data} />
                <Training {...{
                    capture_rate: speciesData?.capture_rate,

                    // pal_park_encounters: {area: string, base_score: number, rate: number}[],
                    // base_happiness: number,
                    // growth_rate: string,
                    // hatch_counter: number,
                    shape: speciesData?.shape,
                    habitat: speciesData?.habitat,
                    gender_rate: speciesData?.gender_rate,
                    egg_groups: speciesData?.egg_groups,
                    evolves_from_species: speciesData?.evolves_from_species
                }} />
            </div>
        </div>
    )
}

export default Bio;