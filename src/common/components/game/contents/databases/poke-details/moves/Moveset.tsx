import { useInView } from "@/common/hooks/useInView";
import { getMoveData } from "@/database/move-db";
import React, { useContext, useState } from "react";
import { PaletteContext } from "../_utils";
import { MoveId, MoveIdData } from "./_utils";
import Move from "./Move";
import Sorter from "./Sorter";

type MovesetProps = {
    version: string;
    method: string;
    moveData: MoveId[];
}

const Moveset: React.FC<MovesetProps> = ({ version, method, moveData }) => {
    const { palette, text } = useContext(PaletteContext);
    const [moves, setMoves] = useState<MoveIdData[]>([]);
    const { ref } = useInView({
        onIntoView: () => {
            Promise.all(moveData.map(
                move => getMoveData(move.id).then(res => ({ ...move, ...res }))
            )).then(res => {
                setMoves(res);
            });
        },
        once: true,
    });

    return (
        <div ref={ref} className="flex flex-col w-full">
            <div className="w-full flex justify-between items-end">
                <div className="flex flex-col">
                    <div className="section__header--default" style={{ borderColor: palette[1] }}>{METHODS[method].title}</div>
                    <span className="text-[0.75rem] sm:text-[0.875rem] px-2 mt-1 mb-4">{METHODS[method].description}</span>
                </div>
                <Sorter method={method} version={version} setMoves={setMoves} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 grid__card--alternate">
                {
                    moves.map((move, i) => (
                        <div key={move.id} className="flex items-center justify-center w-full overflow-hidden relative">
                            <div className="absolute z-0 left-0 top-0 w-full h-full [opacity:var(--opacity)]" style={{ backgroundColor: palette[1] }} />
                            <Move move={move} version={version} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Moveset;

const METHODS: Record<string, { title: string; description: string }> = {
    "egg": { title: "Egg", description: "Appears on a newly-hatched Pokémon, if the father had the same move" },
    "level-up": { title: "Level Up", description: "Learned when a Pokémon reaches a certain level" },
    "machine": { title: "Machine", description: "Can be taught at any time by using a TM or HM" },
    "tutor": { title: "Tutor", description: "Can be taught at any time by an NPC" },
    "stadium-surfing-pikachu": { title: "Stadium: Surfing Pikachu", description: "Learned when a non-rental Pikachu helps beat Prime Cup Master Ball R-2. It must participate in every battle, and you must win with no continues" },
    "light-ball-egg": { title: "Volt Tackle Pichu", description: "Appears on a Pichu whose mother was holding a Light Ball. The father cannot be Ditto" },
    "colosseum-purification": { title: "Colosseum: Purification", description: "Appears on a Shadow Pokémon as it becomes increasingly purified" },
    "xd-shadow": { title: "XD: Shadow", description: "Appears on a Snatched Shadow Pokémon" },
    "xd-purification": { title: "XD: Purification", description: "Appears on a Shadow Pokémon as it becomes increasingly purified" },
    "form-change": { title: "Form Change", description: "Appears when Rotom or Cosplay Pikachu changes form. Disappears if the Pokémon becomes another form and this move can only be learned by form change" },
    "zygarde-cube": { title: "Zygarde Cube", description: "Can be taught using the Zygarde Cube. Must find the corresponding Zygarde Core first in Sun/Moon. All moves are available immediately in Ultra Sun/Ultra Moon" }
}