import { fetchSpeciesDetails } from "@/common/components/game/database/speciesDB";
import { useContext, useEffect, useState } from "react";
import { SpeciesData } from "../../../interface";
import { Stats } from "../../../interfaces/pokemon";
import { DetailsContext } from "../../contexts";
import Effectiveness from "./Effectiveness";
import Genera from "./Genera";
import PokedexNo from "./PokedexNo";
import Varieties from "./Varieties";
import FlavorTexts from "./FlavorTexts";

type SpeciesProps = {
    species: string,
    stats: Stats,
    primary: {
        base_experience: number,
        weight: number,
        height: number
    }
}

const Species: React.FC<SpeciesProps> = ({ species, stats, primary }) => {
    const { palette, details } = useContext(DetailsContext);
    const [speciesData, setSpeciesData] = useState<SpeciesData | null>(null);

    useEffect(() => {
        fetchSpeciesDetails(species).then(res => {
            if (res) {
                setSpeciesData(res);
            }
        })
    }, [species]);

    // flavor_text_entries: {version: string, text: string}[]
    // pal_park_encounters: {area: string, base_score: number, rate: number}[],
    return (
        speciesData &&
        <div className="transition-width flex justify-start items-start relative pl-4 pr-6 pb-8" style={{ width: speciesData ? "100%" : "0" }}>
            <div className="z-[0] absolute w-[125%] right-0 h-[calc(100%+32px)] translate-y-[-40px] translate-x-[52px] skew-x-[-17deg] rounded-br-[16px]" style={{ background: `linear-gradient(270deg,${palette[0]}a3,transparent)` }} />
            <div className={`w-full overflow-hidden flex flex-col justify-between relative z-[1] mt-[-16px] border-x-2 border-b-2 rounded-b-[16px] shadow-base-black`} style={{ borderColor: palette.at(-1) }}>
                <div className="w-full px-2 pb-6">
                    <div className="w-full h-full transition-height border-x-2 border-b-2 rounded-b-[16px] px-4 pb-4 flex flex-col justify-start items-end gap-4 shadow-base-black" style={{ borderColor: palette.at(-1) }}>
                        <Varieties varieties={speciesData.varieties} description={speciesData.form_description} switchable={speciesData.varieties.length > 1 ? (speciesData.forms_switchable) : null} />
                        <div className="w-full flex justify-between items-end gap-2">
                            <Effectiveness types={details?.types} />
                            <PokedexNo pokedex_numbers={speciesData.pokedex_numbers} />
                        </div>
                        <FlavorTexts entries={speciesData.flavor_text_entries} />

                        {/*












                            <Training {...{
                                capture_rate: speciesData.capture_rate,
                                // base_happiness: number,
                                // growth_rate: string,
                                // hatch_counter: number,
                                shape: speciesData.shape,
                                habitat: speciesData.habitat,
                                gender_rate: speciesData.gender_rate,
                                egg_groups: speciesData.egg_groups,
                                evolves_from_species: speciesData.evolves_from_species
                            }} />
                        </div> */}
                    </div>
                </div>
                <Genera {...{
                    genera: speciesData.genera,
                    is_legendary: speciesData.is_legendary,
                    is_mythical: speciesData.is_mythical,
                    is_baby: speciesData.is_baby,
                }} />
            </div>
        </div>
    )
}

export default Species;