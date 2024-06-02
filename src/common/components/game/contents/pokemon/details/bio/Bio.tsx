import { SHORTCUT_WIDTH } from "../../constants";
import { SpeciesData } from "../../interface";
import { SpritesData } from "../../interfaces/sprites";
import HeldItems from "./held-items/HeldItems";
import PokedexNo from "./species/PokedexNo";
import Species from "./species/Species";
import Training from "./species/Training";
import Sprites from "./sprites/Sprites";
import Stats from "./stats/Stats";

type BioProps = {
    primary: { base_experience: number, height: number, weight: number }
    data: SpritesData;
    species: SpeciesData;
    held_items: string[]
}

const Bio: React.FC<BioProps> = ({ primary, data, species, held_items }) => {
    return (
        <div className="w-full flex justify-end" style={{ paddingRight: `${SHORTCUT_WIDTH / 2}px` }}>
            <div className="w-full flex flex-col">
                <Species {...species} />
                <div className="w-full flex gap-[52px] z-[1] pr-2">
                    <Stats />
                    <PokedexNo pokedex_numbers={species.pokedex_numbers} />
                </div>
            </div>
            <div className="flex flex-col shrink-0 pt-2 items-end">
                <Sprites data={data} />
                <HeldItems data={held_items} />
                <Training {...{
                    capture_rate: species.capture_rate,
                    hatch_counter: species.hatch_counter,
                    growth_rate: species.growth_rate,
                    gender_rate: species.gender_rate,
                    habitat: species?.habitat,
                    shape: species?.shape,
                    egg_groups: species?.egg_groups,
                    measurements: {
                        base_experience: primary.base_experience,
                        base_happiness: species.base_happiness,
                        height: primary.height,
                        weight: primary.weight
                    }
                }} />
            </div>
        </div>
    )
}

export default Bio;