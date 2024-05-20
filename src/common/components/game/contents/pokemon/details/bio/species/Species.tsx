import { memo, useContext } from "react";
import { SpeciesData } from "../../../interface";
import { DetailsContext } from "../../contexts";
import Effectiveness from "./Effectiveness";
import FlavorTexts from "./FlavorTexts";
import Genera from "./Genera";
import PokedexNo from "./PokedexNo";
import Varieties from "./Varieties";

type SpeciesProps = {
    species: string,
    speciesData: SpeciesData | null
}

const Species = memo(({ species, speciesData }: SpeciesProps) => {
    const { palette, details } = useContext(DetailsContext);
    console.log("RENDER")
    return (
        speciesData && species &&
        <div className="flex flex-col w-full relative h-full">
            <div className="transition-width flex flex-col justify-start items-start relative pl-4 pr-2" style={{ width: speciesData ? "100%" : "0" }}>
                <div className="z-[0] absolute w-[125%] right-0 h-[calc(100%+16px)] skew-x-[-25deg] rounded-br-[16px]" style={{ background: `linear-gradient(270deg,${palette[1]}a3,transparent)` }} />
                <div className={`w-full h-full overflow-hidden flex flex-col gap-4 justify-between relative z-[1] border-x-2 border-b-2 rounded-b-[16px] shadow-base-black`} style={{ borderColor: palette[0] }}>
                    <div className="w-full px-2">
                        <div className="w-full h-full transition-height border-x-2 border-b-2 rounded-b-[16px] px-2 pb-4 flex justify-end items-end gap-2 shadow-base-black" style={{ borderColor: palette[0] }}>
                            <PokedexNo pokedex_numbers={speciesData.pokedex_numbers} />
                            <Varieties varieties={speciesData.varieties} description={speciesData.form_description} switchable={speciesData.varieties.length > 1 ? (speciesData.forms_switchable) : null} />
                        </div>
                    </div>
                    <Genera {...{ genera: speciesData.genera, is_legendary: speciesData.is_legendary, is_mythical: speciesData.is_mythical, is_baby: speciesData.is_baby }} />
                </div>
                <Effectiveness types={details?.types} />
            </div>
            <div className="w-full h-[40vh] flex flex-col justify-start items-start gap-8 px-4 mt-8 relative z-[1]">
                <FlavorTexts entries={speciesData.flavor_text_entries} />
            </div>
        </div>
    )
}, arePropsEqual);

function arePropsEqual(a: SpeciesProps, b: SpeciesProps) {
    return (a.species === b.species)
}

export default Species;