import { Spinner } from "@/components/loaders/Spinner";
import { PaletteContext } from "@/stores/contexts";
import { useInView } from "@/utils/hooks";
import { useContext, useState } from "react";
import { getEvolutionData, IEvolution } from "../../../database/evolutions";
import { PokemonBase } from "../../../interfaces/pokemon";
import { Evolution } from "./Evolution";

type EvolutionsProps = {
    chain: number;
    current: PokemonBase;
};

/**
 * Evolution base display
 */
export const Evolutions: React.FC<EvolutionsProps> = ({ chain, current }) => {
    const [evolutions, setEvolutions] = useState<IEvolution[][] | null>();

    const ref = useInView({
        onIntoView: () => {
            if (evolutions === undefined) {
                getEvolutionData(chain)
                    .then((res) => {
                        setEvolutions(res);
                    })
                    .catch((err) => {
                        setEvolutions(null);
                    });
            }
        },
    });

    return (
        <div ref={ref} className="w-full flex mt-8">
            {evolutions === undefined ? (
                <Spinner size={24} />
            ) : evolutions === null ? (
                <span className="mx-auto py-4 text-sm sm:text-base text-base-red-6">
                    -- Failed parsing Pokemon evolutions chain --
                </span>
            ) : (
                <Stages evolutions={evolutions} current={current} />
            )}
        </div>
    );
};

type StagesProps = {
    evolutions: IEvolution[][];
    current: PokemonBase;
};

/**
 * Pokemon stages of evolution section
 */
const Stages: React.FC<StagesProps> = ({ evolutions, current }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const start = evolutions.some((evolution) =>
        evolution.some((pokemon) => pokemon.isBaby)
    )
        ? 0
        : 1;

    return (
        <div className="w-full flex flex-col">
            {evolutions.map((evolution, i) => (
                <div className="flex flex-col w-full" key={i}>
                    <div
                        className="max-sm:w-full px-4 shrink-0 py-1 text-sm sm:text-base font-medium flex justify-center"
                        style={{
                            background: `${background}1a`,
                        }}
                    >
                        {evolutions.length === 1
                            ? "No Evolution"
                            : start === 0 && i === 0
                            ? "Baby"
                            : `Stage ${start + i}`}
                    </div>
                    <div className="flex max-sm:flex-col sm:flex-wrap w-full">
                        {evolution.map((data) => (
                            <div
                                key={data.pokemon}
                                className={`w-full grow flex flex-col`}
                            >
                                <Evolution
                                    stage={i}
                                    data={data}
                                    defaultData={
                                        data.pokemon === current.id
                                            ? current
                                            : undefined
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
