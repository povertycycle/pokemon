import styles from "@/common/styles/custom.module.scss";
import { getLuma, isDark, sortByHue } from "@/common/utils/colors";
import { prominent } from "color.js";
import { useEffect, useState } from "react";
import { getPokemonByName } from "../../../database/pokemonDB";
import { DISPLAY_ID, NAV_WIDTH } from "../constants";
import { Pokemon } from "../interface";
import DataCorrupted from "./DataCorrupted";
import Bio from "./bio/Bio";
import Name from "./bio/Name";
import { DetailsContext } from "./contexts";
import Moves from "./moves/Moves";
import Stats from "./stats/Stats";

const Details: React.FC<{ pokemon: string | null }> = ({ pokemon }) => {
    const BLACK = "#000000";
    const [mainData, setMainData] = useState<Pokemon | null | undefined>(null);
    const [palette, setPalette] = useState<string[]>([BLACK]);

    function generateBackground(sprite: string) {
        prominent(sprite, { amount: 7, group: 15, format: "hex" }).then(color => {
            console.log("PALETTE %s:", pokemon);
            const newPalette = sortByHue((color as string[]).filter(c => {
                const luma = getLuma(c);
                return (luma % 1 !== 0 || luma > 60) && luma < 245
            }))
            let temp: string[] = [];
            let max = 0;
            newPalette.forEach(c => {
                console.log("%c %s", `background: ${c}; color: ${isDark(c) ? "white" : "black"}`, c);
                newPalette.forEach(c2 => {
                    if (c !== c2) {
                        const dE = Math.abs(getLuma(c) - getLuma(c2))
                        if (max < dE) {
                            max = dE
                            temp = [c2, c];
                        }
                        console.log("%c %s Luma Difference to %s = %d", `background: ${c2};`, c, c2, dE)
                    }
                })
            })
            temp.sort((a: string, b: string) => (getLuma(a) - getLuma(b)))
            setPalette(temp.length === 0 ? [BLACK] : temp as string[]);
        })
    }

    const fetchPokemonDetails = (pokemonName: string) => {
        getPokemonByName(pokemonName).then(res => {
            setMainData(res);
            if (res) {
                generateBackground(res.main_sprite);
            }
        });
    }

    useEffect(() => {
        if (pokemon && (mainData?.name !== pokemon)) fetchPokemonDetails(pokemon);
    }, [pokemon]);

    const value = { details: mainData, setDetails: setMainData };

    return (
        <div id={DISPLAY_ID} className="h-full flex flex-col bg-black transition-width duration-500 relative" style={{ width: `${100 - NAV_WIDTH}%` }}>
            {
                !mainData ?
                    <DataCorrupted pokemon={pokemon} error={mainData} /> :
                    <DetailsContext.Provider value={value}>
                        <Name name={mainData?.name} species={mainData?.species} index={mainData?.index} palette={palette} />
                        <div className={`w-full z-[0] h-screen flex flex-col relative`} style={{ background: palette[0], color: isDark(palette.at(0) ?? BLACK) ? "white" : "black" }}>
                            <div className="w-full h-full absolute z-[0] left-0 top-0 bg-black/25" />
                            <div className={`w-full flex flex-col relative z-[1] pr-1 pl-[52px] gap-8 h-screen overflow-y-scroll ${styles.overflowWhite}`}>
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

export default Details;