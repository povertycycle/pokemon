import Spinner from "@/common/components/_utils/loading/Spinner";
import { useInView } from "@/common/hooks/useInView";
import { EvolutionData } from "@/common/interfaces/evolution";
import { PokemonCard } from "@/common/interfaces/pokemon";
import { getEvolutionData } from "@/database/evolution-db";
import { getPokemonCard } from "@/database/pokemon-db";
import React, { useContext, useState } from "react";
import { PaletteContext } from "../_utils";
import { PokeEvolution, processEvolutionLayer } from "./_utils";
import Evolution from "./Evolution";

type StacksProps = {
    chain: string;
    current: PokemonCard;
}

const Stacks: React.FC<StacksProps> = ({ chain, current }) => {
    const [evolutions, setEvolutions] = useState<PokeEvolution[][] | null>();
    const { ref } = useInView({
        onIntoView: () => {
            if (evolutions === undefined) {
                getEvolutionData(chain).then(res => {
                    return !!res ? Promise.all(processEvolutionLayer(res).map(
                        evolutions => processLayerData(evolutions)
                    )) : null;
                }).then(res => {
                    setEvolutions(res);
                }).catch(err => {
                    console.error(err);
                    setEvolutions(null);
                })
            }
        },
    });

    return (
        <div ref={ref} className="w-full flex mt-8">
            {
                evolutions === undefined ?
                    <div className="w-full flex items-center justify-center py-4">
                        <Spinner />
                    </div> :
                    (
                        evolutions === null ?
                            <span className="mx-auto py-4 text-base-red-dark">-- Failed parsing Pokemon evolutions chain --</span> :
                            <Stages evolutions={evolutions} currentId={String(current.id)} hasBaby={evolutions.some(evolution => evolution.find(({ evolution }) => evolution.isBaby))} />
                    )
            }
        </div>
    )
}

export default Stacks;

type StagesProps = {
    evolutions: PokeEvolution[][];
    currentId: string;
    hasBaby: boolean;
}

const Stages: React.FC<StagesProps> = ({ evolutions, currentId, hasBaby }) => {
    const { palette } = useContext(PaletteContext);
    const start = hasBaby ? 0 : 1;

    return (
        <div className="w-full flex flex-col">
            {
                evolutions.map((evolution, i) => (
                    <div className="flex flex-col w-full" key={i}>
                        <div className="max-sm:w-full text-[1rem] px-4 shrink-0 sm:text-[1.125rem] py-[2px] sm:py-1 font-semibold flex items-center justify-center border-t" style={{ borderColor: palette[1], background: `${palette[1]}1a` }}>
                            {start === 0 && i === 0 ? "Baby" : `Stage ${start + i}`}
                        </div>
                        <div className="flex max-sm:flex-col sm:flex-wrap w-full">
                            {
                                evolution.map((data, j) => (
                                    !!data.pokemon ?
                                        <div key={data.evolution.pokemon} className={`${evolution.length > 1 ? "sm:w-1/3" : "sm:w-full"} grow flex flex-col max-sm:first:border-t max-sm:[&:not(:last-child)]:border-b sm:border-t`} style={{ borderColor: palette[1] }}>
                                            <Evolution data={data} isActive={data.evolution.pokemon === currentId} single={evolution.length === 1} child={i > 0 ? evolutions[i - 1]?.[0].pokemon.species : undefined} parent={data.evolution.isBaby ? evolutions[i + 1]?.map(evolution => evolution.pokemon.species) : undefined} />
                                        </div> :
                                        <span key={j} className="my-2 text-center mx-auto text-base-red-dark">-- Pokemon data corrupted; Please contact developer -- </span>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

async function processLayerData(evolutions: EvolutionData[]) {
    return Promise.all(evolutions.map(
        evolution =>
            getPokemonCard(evolution.pokemon).then(res => ({
                pokemon: res,
                evolution,
            }))
    ))
}