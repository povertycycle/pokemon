import { useContext } from "react";
import { DetailsContext } from "../../contexts";
import Effectiveness from "./Effectiveness";
import Genera from "./Genera";
import Varieties from "./Varieties";
import PokedexNo from "./PokedexNo";

type SpeciesProps = {
    varieties: string[];
    form_description: string[];
    forms_switchable: boolean;
    genera: string;
    is_legendary: boolean;
    is_mythical: boolean;
    is_baby: boolean;
    pokedex_numbers: { pokedex: string, entry_number: number }[]
}

const Species: React.FC<SpeciesProps> = ({ varieties, form_description, forms_switchable, genera, is_legendary, is_mythical, is_baby, pokedex_numbers }) => {
    const { palette, details } = useContext(DetailsContext);

    return (
        <div className="flex flex-col w-full relative">
            <div className="transition-width flex flex-col justify-start items-start relative pl-4 pr-2 w-full">
                <div className="z-[0] absolute w-[125%] right-0 h-[calc(100%+16px)] skew-x-[-25deg] rounded-br-[16px]" style={{ background: `linear-gradient(270deg,${palette[1]}a3,transparent)` }} />
                <div className={`w-full h-full overflow-hidden flex flex-col gap-4 justify-between relative z-[1] border-x-2 border-b-2 shadow-base-black`} style={{ borderColor: palette[0] }}>
                    <div className="w-full px-2">
                        <div className="w-full h-full transition-height border-x-2 border-b-2 pb-4 flex flex-col justify-end items-end gap-2 shadow-base-black" style={{ borderColor: palette[0] }}>
                            <Varieties varieties={varieties} description={form_description} switchable={varieties.length > 1 ? (forms_switchable) : null} />
                            <Effectiveness types={details?.types} />
                        </div>
                    </div>
                    <Genera {...{ genera: genera, is_legendary: is_legendary, is_mythical: is_mythical, is_baby: is_baby }} />
                </div>
            </div>
        </div>
    )
};

export default Species;