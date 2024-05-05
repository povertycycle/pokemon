import styles from "@/common/styles/custom.module.scss";
import { useEffect, useState, useRef } from "react";
import { getPokemonByName } from "../../../database/pokemonDB";
import { DISPLAY_ID, FILTER_TYPE_COLORS, NAV_WIDTH } from "../constants";
import { Pokemon } from "../interface";
import DataCorrupted from "./DataCorrupted";
import Bio from "./bio/Bio";
import { DetailsContext } from "./contexts";
import Moves from "./moves/Moves";
import Stats from "./stats/Stats";
import Name from "./bio/Name";
import { prominent } from "color.js";
import { getLuma, hexToHSB, isDark } from "@/common/utils/colors";

const Details: React.FC<{ pokemon: string | null }> = ({ pokemon }) => {
    const BLACK = "#000000";
    const [mainData, setMainData] = useState<Pokemon | null | undefined>(null);
    const [palette, setPalette] = useState<string[]>([BLACK]);

    function generateBackground(sprite: string) {
        prominent(sprite, { group: 30, amount: 6, format: "hex" }).then(color => {
            console.log(pokemon);
            const newPalette = (color as string[]).filter(c => {
                const luma = getLuma(c);
                return (luma % 1 !== 0 || luma > 60) && luma < 240
            }).sort(
                (a: string, b: string) => (getLuma(a) - getLuma(b))
            );
            console.log("PALETTE: ");
            newPalette.forEach(c => {
                console.log("%c %s", `background: ${c}; color: ${isDark(c) ? "white" : "black"}`, c)
            })
            setPalette(newPalette.length === 0 ? [BLACK] : newPalette);
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
                        <div className={`w-full z-[0] h-screen flex flex-col relative`} style={{ background: `linear-gradient(90deg,${palette.join(",")})`, color: isDark(palette.at(0) ?? BLACK) ? "white" : "black" }}>
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