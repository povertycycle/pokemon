import { useState } from "react";
import { VERSION_NAME } from "../../constants";
import { LevelMethodVersion, MoveData } from "../../interfaces/moves";

type LMVDisplayProps = {
    lmv: LevelMethodVersion[],
    move: string,
    data: MoveData
}

const LMVDDisplay: React.FC<LMVDisplayProps> = ({ lmv, move, data }) => {
    const [dropdown, setDropdown] = useState<boolean>(false);
    const first = lmv[0];
    const remaining = lmv.slice(1, lmv.length);

    return (
        <div className="text-start text-[1.125rem] leading-[1.125rem]">
            <td className="w-[48px]">{first.method === "level-up" ? first.levelLearned : "N.A."}</td>
            <td className="max-w-[300px] basis-[50%]">{move.split("-").map(m => (m.charAt(0).toUpperCase() + m.slice(1))).join(" ")}</td>


            <td>{first.method}</td>
            <td>{VERSION_NAME[first.version]}</td>
            {
                // levelMethodVersions.map((lmv: LevelMethodVersion, i: number) => (
                //     <div key={i} className="w-full whitespace-nowrap">
                //         <span>Learned at Level {lmv.levelLearned}</span>
                //         <span>Through {lmv.method}</span>
                //         <span>in Version {lmv.version}</span>
                //     </div>
                // ))
            }
        </div>
    )
}

export default LMVDDisplay;