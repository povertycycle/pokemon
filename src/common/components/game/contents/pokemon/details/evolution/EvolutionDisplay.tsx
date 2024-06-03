import { fetchEvolutionChain } from "@/common/components/game/database/evolutionDB";
import { useEffect, useState } from "react";
import { EvolutionChain as Chain } from "../../interfaces/evolution";
import PokeVariants from "./PokeVariants";
import { Shortcuts } from "../../shortcuts/constants";
import { shortcutID } from "@/common/utils/shortcut";

type EvolutionChainProps = {
    chain: string,
}

const EvolutionDisplay: React.FC<EvolutionChainProps> = ({ chain }) => {
    const [chains, setChains] = useState<Chain[][]>([]);

    useEffect(() => {
        fetchEvolutionChain(chain).then(res => {
            setChains(res);
        });
    }, [chain]);

    return (
        <div id={shortcutID(Shortcuts.Evolutions)} className="flex w-[calc(100%+16px)] ml-[-16px] justify-center mt-16 items-start py-8 bg-black/15 flex gap-10">
            {
                chains.map((chain: Chain[], i: number) => (
                    <div key={i} className="flex flex-col gap-4 justify-center">
                        {
                            chain.map((pokemon: Chain, j: number) => (
                                <PokeVariants key={j} data={pokemon} />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default EvolutionDisplay;