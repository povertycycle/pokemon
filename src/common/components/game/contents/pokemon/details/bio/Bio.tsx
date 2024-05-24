import { SpeciesData } from "../../interface";
import { Pokemon } from "../../interfaces/pokemon";
import { SpritesData } from "../../interfaces/sprites";
import EvolutionChain from "./evolution/EvolutionChain";
import Species from "./species/Species";
import Training from "./species/Training";
import Sprites from "./sprites/Sprites";

type BioProps = {
    main: Pokemon;
    data: SpritesData;
    species: SpeciesData;
}

const Bio: React.FC<BioProps> = ({ main, data, species }) => {
    const primary = main && { base_experience: main.base_experience, height: main.height, weight: main.weight };

    return (
        <div className="w-full flex justify-end  h-auto">
            <div className="w-full flex flex-col gap-4">
                <Species {...species} />
                <div className="">
                    <EvolutionChain chain={species.evolution_chain} />
                </div>
            </div>
            <div className="flex flex-col shrink-0 pt-2 items-end gap-4">
                <Sprites data={data} />
                <Training {...{
                    capture_rate: species.capture_rate,
                    hatch_counter: species.hatch_counter,
                    growth_rate: species.growth_rate,
                    gender_rate: species.gender_rate,
                    habitat: species?.habitat,
                    shape: species?.shape,
                    egg_groups: species?.egg_groups,

                    // <PokedexNo pokedex_numbers={speciesData.pokedex_numbers} /> 
                    // pal_park_encounters: {area: string, base_score: number, rate: number}[],
                    // base_happiness: number,
                }} />
            </div>
        </div>
    )
}

export default Bio;