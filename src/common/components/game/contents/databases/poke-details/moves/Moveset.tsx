import { useInView } from "@/common/hooks/useInView";
import { getMoveData } from "@/database/move-db";
import React, { useContext, useState } from "react";
import { PaletteContext } from "../_utils";
import { MoveId, MoveIdData } from "./_utils";
import Move from "./Move";
import Sorter from "./Sorter";
import { Bookmark, BOOKMARK_DATA } from "../../bookmarks/_utils";

type MovesetProps = {
    version: string;
    method: string;
    moveData: MoveId[];
}

const Moveset: React.FC<MovesetProps> = ({ version, method, moveData }) => {
    const { palette } = useContext(PaletteContext);
    const [moves, setMoves] = useState<MoveIdData[]>([]);
    const { ref } = useInView({
        onIntoView: () => {
            Promise.all(moveData.map(
                move => getMoveData(move.id).then(res => ({ ...move, ...res }))
            )).then(res => {
                setMoves(res);
            });
        },
    });
    const { description, icon, title } = METHODS[method];

    return (
        <div ref={ref} className="flex flex-col w-full sm:[&:not(:first-child):not(:last-child)]:mt-16 sm:break-inside-avoid-column">
            <div className="w-full flex flex-col pr-2">
                <div className="section__header--default items-center gap-3" style={{ borderColor: palette[1] }}><i className={`${icon} text-[1.25rem] leading-4`} style={{ color: palette[1] }} /> {title}</div>
                <span className="text-[0.75rem] sm:text-[0.875rem] px-2 mt-1 mb-1 sm:mb-3">{description}</span>
                <Sorter method={method} setMoves={setMoves} />
            </div>
            <div className="flex flex-col mt-2">
                {
                    moves.map((move, i) => (
                        <div key={move.id} className="flex items-center justify-center w-full overflow-hidden relative" style={{ backgroundColor: `${palette[1]}${i % 2 === 0 ? "33" : "1a"}` }}>
                            <Move move={move} version={version} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Moveset;

const METHODS: Record<string, { icon: string; title: string; description: string }> = {
    "egg": { icon: "ri-seedling-fill", title: "Egg", description: "Appears on a newly-hatched Pokémon, if the father had the same move" },
    "level-up": { icon: "ri-flashlight-fill", title: "Level Up", description: "Learned when a Pokémon reaches a certain level" },
    "machine": { icon: "ri-computer-fill", title: "Machine", description: "Can be taught at any time by using a TM or HM" },
    "tutor": { icon: "ri-presentation-fill", title: "Tutor", description: "Can be taught at any time by an NPC" },
    "stadium-surfing-pikachu": { icon: "ri-flood-line", title: "Stadium: Surfing Pikachu", description: "Learned when a non-rental Pikachu helps beat Prime Cup Master Ball R-2. It must participate in every battle, and you must win with no continues" },
    "light-ball-egg": { icon: "ri-sun-fill", title: "Volt Tackle Pichu", description: "Appears on a Pichu whose mother was holding a Light Ball. The father cannot be Ditto" },
    "colosseum-purification": { icon: "ri-ancient-gate-fill", title: "Colosseum: Purification", description: "Appears on a Shadow Pokémon as it becomes increasingly purified" },
    "xd-shadow": { icon: "ri-eye-fill", title: "XD: Shadow", description: "Appears on a Snatched Shadow Pokémon" },
    "xd-purification": { icon: "ri-sparkling-2-fill", title: "XD: Purification", description: "Appears on a Shadow Pokémon as it becomes increasingly purified" },
    "form-change": { icon: "ri-loop-right-line", title: "Form Change", description: "Appears when Rotom or Cosplay Pikachu changes form. Disappears if the Pokémon becomes another form and this move can only be learned by form change" },
    "zygarde-cube": { icon: "ri-box-3-fill", title: "Zygarde Cube", description: "Can be taught using the Zygarde Cube. Must find the corresponding Zygarde Core first in Sun/Moon. All moves are available immediately in Ultra Sun/Ultra Moon" }
}