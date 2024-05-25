import styles from "@/common/styles/custom.module.scss";
import { generateBackground, isDark } from "@/common/utils/colors";
import React, { memo, useEffect, useState } from "react";
import { getPokemonById, processSecondaryData } from "../../../database/pokemonDB";
import { fetchSpeciesDetails } from "../../../database/speciesDB";
import Loading from "../../../utils/Loading";
import { DISPLAY_ID, NAV_WIDTH } from "../constants";
import { SpeciesData } from "../interface";
import { Pokemon, SecondaryData } from "../interfaces/pokemon";
import DataCorrupted from "./DataCorrupted";
import Name from "./bio/Name";
import EvolutionChain from "./bio/evolution/EvolutionChain";
import FlavorTexts from "./bio/species/FlavorTexts";
import { PokePayload } from "./constants";
import { DetailsContext } from "./contexts";
import Bio from "./bio/Bio";

const Details: React.FC<{ pokeId: string | null }> = ({ pokeId }) => {
    const [data, setData] = useState<PokePayload>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [palette, setPalette] = useState<string[]>(["#000000"]);

    const fetchPokemonDetails = (pokeId: string) => {
        let data: PokePayload = {};
        setLoading(true);
        getPokemonById(pokeId).then(mainRes => {
            return mainRes;
        }).then(mainRes => {
            if (!mainRes) throw new Error(`Failed to process #${pokeId} data`);
            data.main = mainRes;
            return processSecondaryData(pokeId, mainRes.moves);
        }).then(secondRes => {
            if (!secondRes || !data.main) throw new Error(`Failed to process #${pokeId} secondary data`);
            data.secondary = secondRes;
            return fetchSpeciesDetails(data.main.species);
        }).then(speciesRes => {
            if (!speciesRes || !data.main) throw new Error(`Failed to process #${pokeId} species data`);
            data.species = speciesRes;
            return generateBackground(data.main.main_sprite);
        }).then(res => {
            setData(data);
            setPalette(res);
            setLoading(false);
        }).catch(err => {
            setData({ main: null, secondary: null, species: null });
            console.error(err);
        });
    }

    useEffect(() => {
        if (pokeId && (data.main?.id !== pokeId)) fetchPokemonDetails(pokeId);
    }, [pokeId]);

    return (
        <div id={DISPLAY_ID} className="h-full flex flex-col bg-black transition-width duration-500 relative" style={{ width: `${100 - NAV_WIDTH}%` }}>
            {
                !data.main || !data.secondary || !data.species ?
                    <DataCorrupted pokemon={pokeId} data={data} /> :
                    <>
                        {loading && <div className="fixed z-[100] w-screen h-screen bg-black/50"><Loading /></div>}
                        <Displayer data={{ main: data.main, secondary: data.secondary, species: data.species }} palette={palette} />
                    </>
            }
        </div>
    )
}

type DisplayerProps = {
    data: {
        main: Pokemon;
        secondary: SecondaryData;
        species: SpeciesData;
    }
    palette: string[]
}

const Displayer = memo(({ data, palette }: DisplayerProps) => {
    let main = data.main;
    let secondary = data.secondary;
    let species = data.species;

    return (
        <DetailsContext.Provider value={{ details: main, palette, colors: palette.map(p => isDark(p) ? "#f0f0f0" : "#000000") }}>
            <Name name={main.name} species={main.species} index={main.index} types={main.types} />
            <div className={`w-full z-[0] h-screen flex flex-col relative`} style={{ background: palette[1], color: isDark(palette[1]) ? "white" : "black" }}>
                <div className="w-full h-full absolute z-[0] left-0 top-0 bg-black/25" />
                <div className={`w-full flex flex-col justify-start items-start relative z-[1] pr-[2px] pl-4 gap-8 h-full overflow-y-scroll ${styles.overflowWhite}`}>
                    <Bio data={secondary.spritesData} species={species} primary={{ base_experience: main.base_experience, height: main.height, weight: main.weight }} />








                    <EvolutionChain chain={species.evolution_chain} />

                    {/* <Moves /> */}
                    <FlavorTexts entries={species.flavor_text_entries} />
                    {/* pal_park_encounters: {area: string, base_score: number, rate: number}[], */}



                    {/* <div className="w-full h-[40vh] flex flex-col justify-start items-start gap-8 px-4 mt-8 relative z-[1]">
            </div> */}
                </div>
            </div>
        </DetailsContext.Provider>
    )
}, arePropsEquals);

function arePropsEquals(a: DisplayerProps, b: DisplayerProps) {
    return (a.data.main.name === b.data.main.name);
}

export default Details;