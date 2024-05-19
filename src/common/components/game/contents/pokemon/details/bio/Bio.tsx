import { Pokemon } from "../../interfaces/pokemon";
import { SpritesData } from "../../interfaces/sprites";
import Species from "./species/Species";
import Sprites from "./sprites/Sprites";

type BioProps = {
    details: Pokemon
    data: SpritesData;
}

const Bio: React.FC<BioProps> = ({ details, data }) => {
    const primary = { base_experience: details.base_experience, height: details.height, weight: details.weight };

    return (
        <div className="w-full flex justify-end">
            <Species species={details.species} stats={details.stats} primary={primary} />
            <Sprites data={data} />
        </div>
    )
}

export default Bio;