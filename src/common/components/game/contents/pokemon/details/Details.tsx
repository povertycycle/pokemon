import styles from "@/common/styles/custom.module.scss";
import { generateBackground, isDark } from "@/common/utils/colors";
import React, { memo, useEffect, useState } from "react";
import { getPokemonByName, processSecondaryData } from "../../../database/pokemonDB";
import { DISPLAY_ID, NAV_WIDTH } from "../constants";
import { Pokemon, SecondaryData } from "../interfaces/pokemon";
import DataCorrupted from "./DataCorrupted";
import Bio from "./bio/Bio";
import Name from "./bio/Name";
import { DetailsContext } from "./contexts";
import Stats from "./stats/Stats";

const Details: React.FC<{ pokemon: string | null }> = ({ pokemon }) => {
    const [md, setMD] = useState<Pokemon | null>();
    const [sd, setSD] = useState<SecondaryData | null>();
    const [palette, setPalette] = useState<string[]>(["#000000"]);

    const fetchPokemonDetails = (pokemonName: string) => {
        getPokemonByName(pokemonName).then(mainRes => {
            if (mainRes) {
                processSecondaryData(pokemonName, mainRes.moves).then(secondRes => {
                    if (secondRes) {
                        generateBackground(mainRes.main_sprite).then(res => {
                            setMD(mainRes);
                            setSD(secondRes);
                            setPalette(res);
                        });
                    } else {
                        // ERROR;
                    }
                });
            } else {
                // ERROR;
            }
        });
    }

    useEffect(() => {
        if (pokemon && (md?.name !== pokemon)) fetchPokemonDetails(pokemon);
    }, [pokemon]);

    return (
        <div id={DISPLAY_ID} className="h-full flex flex-col bg-black transition-width duration-500 relative" style={{ width: `${100 - NAV_WIDTH}%` }}>
            {
                !md || !sd ?
                    <DataCorrupted pokemon={pokemon} main={md} second={sd} /> :
                    <Displayer mainData={md} secondaryData={sd} palette={palette} />
            }
        </div>
    )
}

type DisplayerProps = {
    mainData: Pokemon,
    secondaryData: SecondaryData,
    palette: string[]
}

const Displayer = memo(({ mainData, secondaryData, palette }: DisplayerProps) => {
    return (
        <DetailsContext.Provider value={{ details: mainData, palette }}>
            <Name name={mainData.name} species={mainData.species} index={mainData.index} types={mainData.types} />
            <div className={`w-full z-[0] h-screen flex flex-col relative`} style={{ background: palette[1], color: isDark(palette[1]) ? "white" : "black" }}>
                <div className="w-full h-full absolute z-[0] left-0 top-0 bg-black/25" />
                <div className={`w-full flex flex-col justify-start items-start relative z-[1] pr-2 pl-4 gap-8 h-full overflow-y-auto ${styles.overflowWhite}`}>
                    <Bio details={mainData} data={secondaryData.spritesData} />










                    <Stats />
                    {/* <Moves /> */}
                </div>
            </div>
        </DetailsContext.Provider>
    )
}, arePropsEquals);

function arePropsEquals(a: DisplayerProps, b: DisplayerProps) {
    return (a.mainData.name === b.mainData.name);
}

export default Details;