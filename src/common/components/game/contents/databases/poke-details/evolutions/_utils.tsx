import { useItemSprite } from "@/common/hooks/game/useItemSprite";
import { EvolutionData } from "@/common/interfaces/evolution";
import { PokemonCard } from "@/common/interfaces/pokemon";
import { capitalize } from "@/common/utils/string";
import Image from "next/image";

export type ParsedEvolution = Omit<EvolutionData, "evolutions">;
export type PokeEvolution = {
    pokemon: PokemonCard;
    evolution: ParsedEvolution;
};

export function processEvolutionLayer(data: EvolutionData) {
    let compiled = [] as ParsedEvolution[][];

    function addToCompilation(evolutions: EvolutionData, depth: number) {
        if (depth > 5) return;
        const _data = {
            ...(!!evolutions.isBaby && { isBaby: evolutions.isBaby }),
            ...(!!evolutions.babyItemId && { babyItemId: evolutions.babyItemId }),
            ...(!!evolutions.conditions && { conditions: evolutions.conditions }),
            pokemon: evolutions.pokemon,
        };
        if (compiled[depth]) {
            compiled[depth].push(_data);
        } else {
            compiled[depth] = [_data];
        }
        evolutions.evolutions?.forEach(evolution => {
            addToCompilation(evolution, depth + 1);
        });
    }
    addToCompilation(data, 0);
    return compiled;
}

export const ItemSprite: React.FC<{ id?: string; palette?: string[]; phrase?: string; trail?: string }> = ({ id, palette, phrase, trail }) => {
    const { name, sprite } = useItemSprite(id);

    return (
        !!sprite &&
        <>
            {phrase && `${phrase} `}
            <>
                <span style={{ color: palette?.[1] }} className="font-medium brightness-[175%] w-fit text-[1rem] sm:text-[1.125rem]">{capitalize(name)}</span> {
                    !!sprite ?
                        <Image title={capitalize(name)} width={30} height={30} alt="" src={sprite} className="inline align-text-bottom -mb-[2px] sm:-mb-1 h-[24px] sm:h-[30px] w-[24px] sm:w-[30px]" /> :
                        <i className="ri-question-mark text-[1.5rem]" />
                }
            </>
            {trail && ` ${trail}`}
        </>
    )
}