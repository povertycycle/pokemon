import Typewriter from "@/common/components/_utils/Typewriter";
import { usePalette } from "@/common/hooks/usePalette";
import { PokemonCard } from "@/common/interfaces/pokemon";
import { capitalize } from "@/common/utils/string";
import { TYPE_COLORS } from "@/common/constants/colors";
import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";

type PokemonProps = {
    pokemon: PokemonCard;
}

const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
    const { palette } = usePalette(pokemon.mainSprites.default);

    return (
        <div className={`h-[80px] sm:h-[256px] flex flex-col items-center justify-center relative overflow-hidden`}>
            {
                !!palette ?
                    <Card pokemon={pokemon} palette={palette} /> :
                    <div className="w-full h-[96px] flex items-center justify-center">
                        <Image className="text-white w-[48px] sm:w-[64px] aspect-square" src={"/img/spinner.svg"} alt="" width={48} height={48} />
                    </div>
            }
        </div>
    )
}

export default Pokemon;

const Card: React.FC<{ pokemon: PokemonCard, palette: string[] }> = ({ pokemon, palette }) => {
    return (
        <a href={`/pokemon/${pokemon.id}`} className={`${styles.cardRender} max-sm:border-b max-sm:border-black overflow-hidden h-full w-full bg-black relative sm:rounded-[6px] md:rounded-[8px]`}>
            <div className="w-full h-full absolute top-0 left-0 z-[0]" style={{ background: `linear-gradient(90deg,${palette.at(1)}80,${palette.at(0)}80)` }} />
            <div className="w-full h-full absolute top-0 left-0 z-[1] flex items-center justify-end bg-gradient-to-r from-black/35">
                <Image className="aspect-square w-[128px] sm:w-[296px] object-cover" src={pokemon.mainSprites.default} alt="" width={128} height={128} />
            </div>
            <div className={`text-white h-full py-1 px-2 sm:py-2 sm:px-4 flex flex-col justify-end z-[2] relative w-full sm:hover:bg-black/0 bg-black/25 cursor-pointer`}>
                <div className="absolute flex top-0 left-0 text-[0.75rem] sm:text-[1rem] rounded-br-[4px] md:rounded-br-[6px] overflow-hidden max-w-full">
                    {
                        pokemon.types.map((t: string, i: number) => (
                            <div key={i} className={`w-[78px] sm:w-[128px] flex items-center justify-center`} style={{ background: TYPE_COLORS[t] }}>
                                <span className="drop-shadow-[0_0_2px_black]">{t.toUpperCase()}</span>
                            </div>
                        ))
                    }
                </div>
                <span className="text-[1rem] sm:text-[1.5rem] leading-3 sm:leading-5">#{`${pokemon.index}`.padStart(4, "0")}</span>
                <Name name={pokemon.name} species={pokemon.species} />
            </div>
        </a>
    )
}

const Name: React.FC<{ name: string; species: string }> = ({ name, species }) => {
    let identifiers = name && species ? name.replace(species, "").split("-").slice(1) : [];

    return (
        <div className="flex text-[1.25rem] sm:text-[1.5rem] items-center">
            <span className="leading-6 sm:leading-8"><Typewriter text={capitalize(species)} duration={500} /></span>
            <div className="flex ml-2 sm:ml-4 text-[0.75rem] sm:text-[1rem] leading-4 sm:leading-6 text-black gap-1 sm:gap-3 max-sm:pt-[3px]">
                {
                    identifiers.map((id: string, i: number) => (
                        <div className={`h-fit px-2 sm:px-4 flex items-center justify-center bg-base-white-soft rounded-[12px]`} key={i}>
                            {id.toUpperCase()}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


