import { useState, useEffect, useContext } from "react";
import { SpeciesData } from "../../../interface";
import { fetchSpeciesDetails } from "@/common/components/game/database/speciesDB";
import { DetailsContext } from "../../contexts";
import { Stats } from "../../../interfaces/pokemon";

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
    const { palette } = useContext(DetailsContext);
    const [speciesData, setSpeciesData] = useState<SpeciesData | null>(null);

    useEffect(() => {
        fetchSpeciesDetails(species).then(res => {
            if (res) {
                setSpeciesData(res);
            }
        })
    }, [species]);

    console.log(speciesData);

    return (
        <div className="h-full grow translate-x-[32px] translate-y-[-72px] skew-x-[-20deg] flex justify-end items-end" style={{ background: `linear-gradient(270deg,${palette[0]},transparent)` }}>
            <div className="flex flex-col gap-1">
            </div>
        </div>
    )
}

export default Species;