import { useContext } from "react";
import Varieties from "./Varieties";

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
    return (
        <div className="flex flex-col w-full relative">
            <div className="transition-width flex flex-col justify-start items-start relative pl-4 pr-2 w-full">
                {/* <div className="z-[0] absolute w-[125%] right-0 h-[calc(100%+16px)] skew-x-[-20deg] rounded-br-[16px]" style={{ background: `linear-gradient(270deg,${palette[1]}a3,transparent)` }} /> */}
                {/* <div className={`w-full h-full overflow-hidden flex flex-col gap-2 justify-between relative z-[1] border-x-2 border-b-2 shadow-base-black`} style={{ borderColor: palette[0] }}>
                    <div className="w-full px-2">
                        <div className="w-full h-full transition-height border-x border-b pb-4 flex flex-col justify-end items-end gap-2 shadow-base-black overflow-hidden" style={{ borderColor: palette[0] }}>
                            <Varieties varieties={varieties} description={form_description} switchable={varieties.length > 1 ? (forms_switchable) : null} /> */}
                {/* </div>
                    </div> */}
                {/* </div> */}
            </div>
        </div>
    )
};

export default Species;