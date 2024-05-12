import styles from "@/common/styles/custom.module.scss";
import { getLuma, isDark, sortByHue } from "@/common/utils/colors";
import { prominent } from "color.js";
import { useEffect, useState } from "react";
import { getPokemonByName, processSecondaryData } from "../../../database/pokemonDB";
import { DISPLAY_ID, NAV_WIDTH } from "../constants";
import { Pokemon, SecondaryData } from "../interfaces/pokemon";
import DataCorrupted from "./DataCorrupted";
import Bio from "./bio/Bio";
import Name from "./bio/Name";
import { DetailsContext } from "./contexts";
import Stats from "./stats/Stats";

const Details: React.FC<{ pokemon: string | null }> = ({ pokemon }) => {
    const BLACK = "#000000";
    const [mainData, setMainData] = useState<Pokemon | null>();
    const [secondaryData, setSecondaryData] = useState<SecondaryData>();
    const [palette, setPalette] = useState<string[]>([BLACK]);
    const value = { details: mainData, setDetails: setMainData, palette };

    function generateBackground(sprite: string): Promise<string[]> {
        return new Promise(result => {
            prominent(sprite, { amount: 7, group: 15, format: "hex" }).then(color => {
                const newPalette = sortByHue((color as string[]).filter(c => {
                    const luma = getLuma(c);
                    return (luma % 1 !== 0 || luma > 60) && luma < 245
                })).reduce((acc: { twoPalette: string[], max: number }, color: string, _, nP: string[]) => {
                    nP.forEach((color2: string) => {
                        if (color !== color2) {
                            const dE = Math.abs(getLuma(color) - getLuma(color2));
                            if (acc.max < dE) {
                                acc.max = dE;
                                acc.twoPalette = [color2, color];
                            }
                        }
                    })
                    return acc;
                }, { twoPalette: [], max: 0 }).twoPalette.sort((a: string, b: string) => (getLuma(a) - getLuma(b)));
                result(newPalette.length === 0 ? [BLACK] : newPalette);
            })
        })
    }

    const fetchPokemonDetails = (pokemonName: string) => {
        getPokemonByName(pokemonName).then(mainRes => {
            if (mainRes) {
                processSecondaryData(pokemonName, mainRes.moves).then(secondRes => {
                    if (secondRes) {
                        generateBackground(mainRes.main_sprite).then(res => {
                            setMainData(mainRes);
                            setSecondaryData(secondRes);
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
        if (pokemon && (mainData?.name !== pokemon)) fetchPokemonDetails(pokemon);
    }, [pokemon]);

    return (
        <div id={DISPLAY_ID} className="h-full flex flex-col bg-black transition-width duration-500 relative" style={{ width: `${100 - NAV_WIDTH}%` }}>
            {
                !mainData || !secondaryData ?
                    <DataCorrupted pokemon={pokemon} main={mainData} second={secondaryData} /> :
                    <DetailsContext.Provider value={value}>
                        <Name name={mainData?.name} species={mainData?.species} index={mainData?.index} />
                        <div className={`w-full z-[0] h-screen flex flex-col relative`} style={{ background: palette[0], color: isDark(palette.at(0) ?? BLACK) ? "white" : "black" }}>
                            <div className="w-full h-full absolute z-[0] left-0 top-0 bg-black/25" />
                            <div className={`w-full flex flex-col relative z-[1] pr-1 pl-4 pt-2 gap-8 h-screen overflow-y-scroll ${styles.overflowWhite}`}>
                                <Bio details={mainData} data={secondaryData.spritesData} />










                                <Stats />
                                {/* <Moves /> */}
                            </div>
                        </div>
                    </DetailsContext.Provider>
            }
        </div>
    )
}

export default Details;