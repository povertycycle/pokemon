import styles from "@/common/styles/custom.module.scss";
import { useEffect, useState } from "react";
import { getPokemonByName } from "../../../database/pokemonDB";
import { DISPLAY_ID, FILTER_TYPE_COLORS, NAV_WIDTH } from "../constants";
import { Pokemon } from "../interface";
import DataCorrupted from "./DataCorrupted";
import Bio from "./bio/Bio";
import { DetailsContext } from "./contexts";
import Moves from "./moves/Moves";
import Stats from "./stats/Stats";
import Name from "./bio/Name";

const Details: React.FC<{ pokemon: string | null }> = ({ pokemon }) => {
    const [mainData, setMainData] = useState<Pokemon | null | undefined>(null);
    const value = { details: mainData, setDetails: setMainData };
    // const localCacheRef = useRef

    const fetchPokemonDetails = (pokemonName: string) => {
        getPokemonByName(pokemonName).then(res => {
            setMainData(res);
        });
    }

    useEffect(() => {
        if (pokemon) fetchPokemonDetails(pokemon);
    }, [pokemon]);

    return (
        <div id={DISPLAY_ID} className="h-full flex flex-col bg-black transition-width duration-500 relative" style={{ width: `${100 - NAV_WIDTH}%` }}>
            {
                !mainData ?
                    <DataCorrupted pokemon={pokemon} error={mainData} /> :
                    <DetailsContext.Provider value={value}>
                        <Name name={mainData?.name} species={mainData?.species} index={mainData?.index} />
                        <div className={`w-full z-[0] h-0 grow overflow-y-scroll flex relative pl-[42px] justify-end ${styles.overflowWhite}`} style={{ background: generateBackground(mainData.types) }}>
                            <div className="z-[0] fixed left-0 top-0 h-full bg-black/50" style={{ width: `${100 - NAV_WIDTH}%` }} />
                            <div className="w-full flex relative z-[1] flex-col p-8 gap-4">
                                <Bio />






                                <Stats />
                                <Moves />
                            </div>
                        </div>
                    </DetailsContext.Provider>
            }
        </div>
    )
}

function generateBackground(types: string[]) {
    return (
        types.length === 1 ?
            FILTER_TYPE_COLORS[types[0]] :
            `linear-gradient(90deg${types.map(type => (`,${FILTER_TYPE_COLORS[type]}`)).join("")})`
    )
}

export default Details;