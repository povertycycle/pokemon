import { Spinner } from "@/components/loaders/Spinner";
import { CATEGORY_COLORS, TYPE_COLORS } from "@/constants/game/colors";
import { getMoveData } from "@/requests/moves";
import { useInView } from "@/utils/hooks";
import { useState } from "react";
import { MoveBase } from "../../../../moves/interfaces/moves";

type MoveProps = {
    id: number;
    level?: number;
    version: string;
};

/**
 * Move display
 */
export const Move: React.FC<MoveProps> = ({ id, level, version }) => {
    const [move, setMove] = useState<MoveBase | null>();

    const ref = useInView({
        onIntoView: () => {
            if (move === undefined) {
                getMoveData(id)
                    .then((res) => {
                        setMove(res);
                    })
                    .catch((err) => {
                        setMove(null);
                    });
            }
        },
    });

    return (
        <div
            ref={ref}
            className=" w-full grid max-sm:grid-rows-2 sm:grid-cols-[1.25fr_1.125fr_1fr] grid-flow-col z-1 py-1 px-2 sm:px-3 whitespace-nowrap"
        >
            {move?.data === undefined ? (
                <div className="max-sm:row-span-2 sm:col-span-3 max-sm:min-h-12 sm:min-h-8">
                    <Spinner size={12} />
                </div>
            ) : move?.data === null ? (
                <span className="font-bold text-base-red-6 text-xxs sm:text-xs">
                    Error getting move data
                </span>
            ) : (
                <>
                    <span className="sm:w-fit flex gap-3 items-center text-xs sm:text-sm">
                        <span className="rounded-full text-sm sm:text-base font-medium capitalize">
                            {move.name.replace("-", " ")}
                        </span>{" "}
                        {(!!level || !!move.data.machines[version]) && (
                            <span>
                                {level
                                    ? `Lv ${level}`
                                    : move.data.machines[
                                          version
                                      ].toUpperCase() ?? ""}
                            </span>
                        )}
                    </span>
                    <div className="flex gap-2 text-xxs sm:text-xs items-end sm:items-center">
                        <span>
                            <span className="text-sm sm:text-base font-medium">
                                {move.data.pp}
                            </span>{" "}
                            PP
                        </span>
                        {!!move.data.power && (
                            <span>
                                <span className="text-sm sm:text-base font-medium">
                                    {move.data.power}
                                </span>{" "}
                                Pwr
                            </span>
                        )}
                        {!!move.data.accuracy && (
                            <span>
                                <span className="text-sm sm:text-base font-medium">
                                    {move.data.accuracy}%
                                </span>{" "}
                                Acc
                            </span>
                        )}
                    </div>
                    <div className="max-sm:row-span-2 flex max-sm:flex-col-reverse text-xxs sm:text-xs justify-between sm:justify-end sm:gap-2 sm:items-center items-end">
                        <div
                            className="w-fit rounded-full text-white text-center px-4 sm:px-2 flex items-center justify-center h-fit border bg-base-white font-medium"
                            style={{
                                borderColor:
                                    CATEGORY_COLORS[move.data.category],
                                color: CATEGORY_COLORS[move.data.category],
                            }}
                        >
                            <span className="capitalize">
                                {move.data.category}
                            </span>
                        </div>
                        <div
                            className="w-fit rounded-full text-white text-center px-4 sm:px-2 flex items-center justify-center h-fit"
                            style={{ background: TYPE_COLORS[move.data.type] }}
                        >
                            <span>{move.data.type.toUpperCase()}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
