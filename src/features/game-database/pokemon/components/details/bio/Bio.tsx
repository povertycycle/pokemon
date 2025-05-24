import { PokeSpecies } from "../../../interfaces/pokemon";
import { Effectiveness } from "./Effectiveness";
import { FlavorText } from "./FlavorText";
import { Genus } from "./Genus";
import { HeldItems } from "./HeldItems";

interface BioProps {
    species: PokeSpecies;
    types: string[];
    heldItems: number[];
}

/**
 * Pokemon biodata
 */
export const Bio: React.FC<BioProps> = ({ species, types, heldItems }) => {
    return (
        <>
            <Genus
                genus={species.genus}
                category={{
                    isBaby: species.isBaby,
                    isLegendary: species.isLegendary,
                    isMythical: species.isMythical,
                }}
            />
            <div className="w-full flex flex-col grow">
                <FlavorText flavorText={species.flavorText} />
                <div className="w-full flex max-sm:flex-col gap-2 sm:items-end">
                    <Effectiveness types={types} />
                    {heldItems.length > 0 && <HeldItems items={heldItems} />}
                </div>
            </div>
        </>
    );
};
