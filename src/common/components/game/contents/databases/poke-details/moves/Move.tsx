import { CATEGORY_COLORS, TYPE_COLORS } from "@/common/constants/colors";
import { capitalize } from "@/common/utils/string";
import { MoveIdData } from "./_utils";
import Spinner from "@/common/components/_utils/loading/Spinner";

type MoveProps = {
    move: MoveIdData;
    version: string;
}

const Move: React.FC<MoveProps> = ({ version, move }) => {
    return (
        !!!move.data ?
            <Spinner size={36} /> :
            <div className=" w-full grid max-sm:grid-rows-2 sm:grid-cols-[1.25fr_1.125fr_1fr] grid-flow-col z-1 py-1 px-2 sm:px-3 whitespace-nowrap">
                <span className="sm:w-fit flex gap-3 items-center text-[0.875rem] sm:text-[1rem]">
                    <span className="rounded-full font-medium">{capitalize(move.name)}</span> {(!!move.level || !!move.data.machines[version]) && <span>{move.level ? `Lv ${move.level}` : (move.data.machines[version].toUpperCase() ?? "")}</span>}
                </span>
                <div className="flex gap-2 text-[0.625rem] sm:text-[0.75rem] max-sm:leading-[100%] items-end sm:items-center">
                    <span><span className="text-[1rem] font-medium">{move.data.pp}</span> PP</span>
                    {!!move.data.power && <span><span className="text-[1rem] font-medium">{move.data.power}</span> Pwr</span>}
                    {!!move.data.accuracy && <span><span className="text-[1rem] font-medium">{move.data.accuracy}%</span> Acc</span>}
                </div>
                <div className="max-sm:row-span-2 flex max-sm:flex-col-reverse text-[0.75rem] sm:text-[0.875rem] justify-between sm:justify-end sm:gap-2 sm:items-center items-end">
                    <div className="w-fit rounded-full text-white text-center px-4 sm:px-2 flex items-center justify-center h-fit border brightness-90" style={{ borderColor: CATEGORY_COLORS[move.data.category], color: CATEGORY_COLORS[move.data.category] }}>
                        <span>{capitalize(move.data.category)}</span>
                    </div>
                    <div className="w-fit rounded-full text-white text-center px-4 sm:px-2 flex items-center justify-center h-fit" style={{ background: TYPE_COLORS[move.data.type] }}>
                        <span className="drop-shadow-[0_0_1px_black]">{move.data.type.toUpperCase()}</span>
                    </div>
                </div>
            </div>
    )
}

export default Move;