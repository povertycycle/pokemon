import { fetchEvolutionChain } from "@/common/components/game/database/evolutionDB";
import { useContext, useEffect, useState } from "react";
import { EvolutionChain as Chain } from "../../../interfaces/evolution";
import { getVarietySprite } from "@/common/components/game/database/pokemonDB";
import { DetailsContext } from "../../contexts";
import { capitalize } from "@/common/utils/capitalize";

type EvolutionChainProps = {
    chain: string,
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({ chain }) => {
    const [chains, setChains] = useState<Chain[][]>([]);

    useEffect(() => {
        fetchEvolutionChain(chain).then(res => {
            setChains(res);
        });
    }, [chain]);

    return (
        <div className="flex w-full justify-center mt-8 items-center">
            {
                chains.map((chain: Chain[], i: number) => (
                    <List key={i} chain={chain} />
                ))
            }
        </div>
    )
}

const List: React.FC<{ chain: Chain[] }> = ({ chain }) => {
    return (
        <div className="flex flex-col gap-1">
            {
                chain.map((pokemon: Chain, i: number) => (
                    <Pokemon data={pokemon} key={i} />
                ))
            }
        </div>
    )
}

const Pokemon: React.FC<{ data: Chain }> = ({ data }) => {
    const { details, palette } = useContext(DetailsContext);
    const [sprites, setSprites] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    let isCurrent = details?.index.toString() === data.species_id;

    useEffect(() => {
        getVarietySprite(data.species_id).then(res => {
            setSprites(res.url);
            setName(res.name);
        })
    }, [data.species_id]);

    const toPokemon = () => {
        if (!isCurrent) {
            (document.querySelector(`[data-name='${name}']`) as HTMLDivElement).click()
        };
    }

    return (
        <div className="flex items-center w-full">
            {
                data.evolution_details &&
                <div className="flex flex-col leading-5 text-[1.125rem] gap-1 px-4">
                    {
                        data.evolution_details.map(({ trigger, min_level }, i: number) => (
                            <div key={i} className="flex flex-col items-center">
                                {min_level && <span>At Lv.{min_level}</span>}
                                <span>Via {capitalize(trigger)}</span>
                            </div>
                        ))
                    }
                </div>
            }
            <div className="w-[128px] flex flex-col items-center text-[1.125rem] leading-6 gap-2">
                <div className={`w-full aspect-square bg-black/25 shadow-base-black rounded-[16px] border-2 transition-[colors,transform] ${isCurrent ? "" : "cursor-pointer hover:scale-[1.05]"}`} style={{ borderColor: isCurrent ? palette[0] : "transparent" }} onClick={toPokemon}>
                    {
                        sprites ?
                            <img className="w-full h-full" alt="" src={sprites} /> :
                            <div />
                    }
                </div>
                <span>{capitalize(name)}</span>
                {data.is_baby && <span>Baby</span>}
            </div>
        </div>
    )
}

export default EvolutionChain;