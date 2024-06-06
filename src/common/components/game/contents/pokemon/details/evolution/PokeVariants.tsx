import { getVarietySprite } from "@/common/components/game/database/pokemonDB";
import { getVariants } from "@/common/components/game/database/speciesDB";
import { capitalize } from "@/common/utils/capitalize";
import { useContext, useEffect, useState } from "react";
import { EggSvg } from "../../../Icons";
import { EvolutionChain } from "../../interfaces/evolution";
import { DetailsContext } from "../contexts";
import ImageSprites from "../../../_utils/ImageSprites";
import Methods from "./Methods";
import Image from "next/image";

type PokeVariantsProps = {
    data: EvolutionChain
}

const PokeVariants: React.FC<PokeVariantsProps> = ({ data }) => {
    const { details, palette } = useContext(DetailsContext);
    const [pokemons, setPokemons] = useState<({ name: string, url: string })[]>([]);
    const isBaby = data.is_baby;

    useEffect(() => {
        if (data.species) {
            getVariants(data.species).then(res => {
                Promise.all(res.map(variant => getVarietySprite(variant))).then(res => {
                    setPokemons(res.filter(r => r != null && r != undefined) as { name: string, url: string }[]);
                })
            });
        }
    }, [data.species]);

    return (
        pokemons.length > 0 &&
        <div className={`flex justify-end text-[1.125rem] ${isBaby ? "max-w-[192px]" : ""}`}>
            {
                isBaby &&
                <div className="flex flex-col w-[176px] justify-center items-center text-center pl-[4px] py-4 gap-1 shrink-0 border-y-2 border-l-2 bg-black/15" style={{ borderColor: palette[0] }}>
                    <div className="text-base leading-4 flex flex-col items-center w-full">
                        <div className="flex gap-1 items-center pl-4">
                            <span title="Prior to Gen XI" className="underline cursor-help decoration-dotted">Breed</span>
                            <div className="h-[32px] aspect-square py-1 flex justify-center items-center">
                                <EggSvg />
                            </div>
                        </div>
                        <span>while holding</span>
                    </div>
                    <div className="w-[56px] flex items-center justify-center">
                        <ImageSprites id={isBaby} type="item" />
                    </div>
                </div>
            }
            {data.evolution_details && <Methods data={data.evolution_details} />}
            <div className="flex flex-col gap-4">
                {
                    pokemons.map(({ name, url }, i: number) => (
                        <Pokemon key={i} active={details?.name} name={name} url={url} isBaby={isBaby !== undefined && isBaby !== null} />
                    ))
                }
            </div>
        </div>
    )
}

const Pokemon: React.FC<{ active?: string, name: string, url: string, isBaby: boolean }> = ({ active, name, url, isBaby }) => {
    const { palette, colors } = useContext(DetailsContext);

    const toPokemon = () => {
        if (active !== name) {
            (document.querySelector(`[data-name='${name}']`) as HTMLDivElement).click()
        };
    }

    return (
        <div className="w-[192px] flex flex-col items-center transition-colors">
            <div className={`peer w-full flex items-center justify-center aspect-square bg-black/15 transition-transform border-2 ${active === name ? "" : "cursor-pointer hover:scale-[1.05]"}`} onClick={toPokemon} style={{ borderColor: palette[0] }}>
                {
                    url ?
                        <Image loading="lazy" width={128} height={128} className="w-full h-full" alt="" src={url} /> :
                        <i className="ri-question-mark text-[4rem]" />
                }
            </div>
            <div className={`px-1 text-[1.125rem] ${active === name ? "" : "peer-hover:translate-y-[5px]"} transition-transform w-full border-x-2 border-b-2 text-base-white text-center flex flex-col`} style={{ borderColor: palette[0], background: active === name ? palette[0] : "#00000080", color: active === name ? colors[0] : "#f0f0f0" }}>
                {capitalize(name)}
                {isBaby && <span className="text-[0.875rem]">{`(Baby)`}</span>}
            </div>
        </div>
    )
}

export default PokeVariants;