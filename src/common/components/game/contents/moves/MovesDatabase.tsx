import scroll from "@/common/styles/custom.module.scss";
import table from "@/common/styles/table.module.scss";
import styles from "@/common/styles/transitions.module.scss";
import React, { useEffect, useState } from "react";
import { getMovesData } from "../../database/movesDB";
import Empty from "../databases/poke-card/Empty";
import GenFilter from "../_utils/GenFilter";
import { PokeMove } from "../pokemon/interfaces/moves";
import { TABLE_ID } from "./constants";
import { GameContext } from "./context";
import TRowMove from "./TRowMove";
import TypeScroller from "./TypeScroller";
import Loading from "@/common/components/_utils/Loading";
import { TYPE_COLORS } from "@/common/constants/colors";

const ORDER = Object.keys(TYPE_COLORS);

const MovesDatabase: React.FC = () => {
    const [moves, setMoves] = useState<(PokeMove | null)[] | null | undefined>();

    useEffect(() => {
        if (!moves)
            getMovesData().then(res => {
                setMoves(res);
            });
    }, [])

    return (
        <div className={`absolute z-[0] w-full h-full overflow-hidden flex items-center justify-center top-0 ${styles.fadeIn}`}>
            {
                moves === undefined ?
                    <Loading /> :
                    (
                        moves === null || moves.length === 0 ?
                            <Empty /> :
                            <Display moves={moves.filter(Boolean) as PokeMove[]} />
                    )
            }
        </div>
    )
}

type DisplayProps = {
    moves: PokeMove[]
}

const Display: React.FC<DisplayProps> = ({ moves }) => {
    const [game, setGame] = useState<string | null>(null);
    let list = game ? moves.filter(m => (m.data.games?.map(t => t.split('-').map(s => s.charAt(0)).join(""))?.includes(game))) : moves;

    function filter(version: string | null) {
        setGame(version);
    }

    return (
        <div className={`w-full h-full justify-between flex items-center bg-black px-6 py-16 pr-8 pb-4`}>
            <div className="w-full absolute h-full top-0 left-0 bg-hp-dark/50 z-[0]" />
            <div id={TABLE_ID} className={`z-[1] relative h-full w-full overflow-y-scroll flex flex-col items-start gap-2 bg-base-white w-full px-6 py-4 ${scroll.overflow}`}>
                <GenFilter filter={filter} />
                <TypeScroller />
                <GameContext.Provider value={{ game, setGame }}>
                    <table className="border-separate w-full h-fit z-[0]">
                        <THead />
                        {
                            Object.entries(list.reduce((acc: { [key: string]: PokeMove[] }, c: PokeMove) => { if (acc[c.data.type]) { acc[c.data.type].push(c); } else { acc[c.data.type] = [c]; } return acc; }, {}))
                                .sort((a, b) => (ORDER.indexOf(a[0]) - ORDER.indexOf(b[0]))).map(([type, data], i) => (
                                    <tbody data-type={`move-table-${type}`} key={i} className={`relative z-[0] ${table.long_table_body}`}>
                                        <tr><th className={`${i !== 0 ? "border-t-2" : ""} border-b-2 border-x-2 border-black py-1 text-[1.25rem] tracking-[1px] text-base-white`} style={{ background: TYPE_COLORS[type] }} colSpan={6}><span className="drop-shadow-[0_0_2px_black]">{type.toUpperCase()}</span></th></tr>
                                        {
                                            data.sort((a, b) => (a.name > b.name ? 1 : -1)).map((data, j: number) => (
                                                <TRowMove data={data} key={j} color={TYPE_COLORS[type]} />
                                            ))
                                        }
                                    </tbody>
                                ))
                        }
                    </table>
                </GameContext.Provider>
            </div>
        </div>
    )
}

const THead: React.FC = () => {
    return (
        <thead>
            <tr className={`z-[1] text-[1.25rem] sticky top-[2px] text-hp-dark ${table.move_table_header}`}>
                <th style={{ textAlign: "start" }}>Move</th>
                <th>PP</th>
                <th>Category</th>
                <th>Power</th>
                <th>Accuracy</th>
                <th style={{ textAlign: "start" }}>Description</th>
            </tr>
        </thead>
    )
}


export default MovesDatabase;