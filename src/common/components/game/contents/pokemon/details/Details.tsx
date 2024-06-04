import styles from "@/common/styles/custom.module.scss";
import { generateBackground, isDark } from "@/common/utils/colors";
import React, { memo, useEffect, useState } from "react";
import { getPokemonById, processSecondaryData } from "../../../database/pokemonDB";
import { fetchSpeciesDetails } from "../../../database/speciesDB";
import Loading from "../../../utils/Loading";
import { DISPLAY_ID, NAV_WIDTH, SCROLL_ID } from "../constants";
import { SpeciesData } from "../interface";
import { Pokemon, SecondaryData } from "../interfaces/pokemon";
import ScrollNavigator from "../shortcuts/ScrollNavigator";
import DataCorrupted from "./DataCorrupted";
import Abilities from "./abilities/Abilities";
import Bio from "./bio/Bio";
import Name from "./bio/Name";
import EvolutionDisplay from "./evolution/EvolutionDisplay";
import FlavorTexts from "./FlavorTexts";
import { PokePayload } from "./constants";
import { DetailsContext } from "./contexts";
import Encounters from "./encounters/LocationEncounters";
import Moves from "./moves/Moves";
import BugReporting from "../bug-reporting/BugReporting";

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
        <div id={DISPLAY_ID} className="h-full flex absolute left-0 bg-black top-0 z-[1] transition-width duration-[500ms]" style={{ width: `${100 - NAV_WIDTH}%` }}>
            <div className="h-full flex flex-col bg-sp-def-dark/50 w-full">
                {
                    !data.main || !data.secondary || !data.species ?
                        <DataCorrupted pokemon={pokeId} data={data} /> :
                        <>
                            {loading && <div className="fixed z-[100] w-screen h-screen bg-black/50"><Loading /></div>}
                            <Displayer data={{ main: data.main, secondary: data.secondary, species: data.species }} palette={palette} />
                        </>
                }
            </div>
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
            <div className={`w-full z-[0] h-screen flex relative overflow-x-hidden`} style={{ background: palette[1], color: isDark(palette[1]) ? "white" : "black" }}>
                <div className="w-full h-full absolute z-[0] left-0 top-0 bg-black/25" />
                <div className={`w-full flex h-full`}>
                    <div id={SCROLL_ID} className={`w-full flex flex-col justify-start items-start relative z-[1] pl-4 gap-8 h-full overflow-y-scroll ${styles.overflowWhite}`}>
                        <Bio data={secondary.spritesData} species={species} primary={{ base_experience: main.base_experience, height: main.height, weight: main.weight }} held_items={main.held_items} />
                        <Abilities />
                        <Moves moveVersions={secondary.moveVersions} />
                        <Encounters pal_park={species.pal_park_encounters} />
                        <EvolutionDisplay chain={species.evolution_chain} />
                        <FlavorTexts entries={species.flavor_text_entries} />
                        <BugReporting />
                    </div>
                    <ScrollNavigator />
                </div>
            </div>
        </DetailsContext.Provider>
    )
}, arePropsEquals);

function arePropsEquals(a: DisplayerProps, b: DisplayerProps) {
    return (a.data.main.name === b.data.main.name);
}

export default Details;