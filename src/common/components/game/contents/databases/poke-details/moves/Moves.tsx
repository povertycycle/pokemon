import Dropdown from "@/common/components/_utils/Dropdown"
import { MoveDataVersion } from "@/common/interfaces/move"
import { getVersionData } from "@/common/utils/version"
import { useContext, useRef, useState } from "react"
import { PaletteContext } from "../_utils"
import { GroupedMoveSets } from "./_utils"
import Moveset from "./Moveset"
import { Bookmark, BOOKMARK_DATA } from "../../bookmarks/_utils"
import { GAMES } from "@/common/constants/constants"

type MovesProps = {
    moves: Record<string, MoveDataVersion>
}

const Moves: React.FC<MovesProps> = ({ moves }) => {
    const { palette, text } = useContext(PaletteContext);
    const { icon, id } = BOOKMARK_DATA[Bookmark.Moves];
    const groupRef = useRef<GroupedMoveSets>(groupMoveSets(moves));
    const sorted = Object.keys(groupRef.current).sort((a, b) => {
        let pool = Object.keys(GAMES);
        return pool.indexOf(a) - pool.indexOf(b)
    });
    const [version, setVersion] = useState<string | null>(sorted[0] ?? null);
    const { name, background } = getVersionData(version);


    return (
        <div id={id} className="flex flex-col w-full relative">
            <div className="w-full text-center py-2 relative flex items-center justify-center border-b" style={{ borderColor: palette[1], background: background || `${palette[1]}33` }}>
                <div className="leading-4 absolute left-2 rounded-full h-[calc(100%-12px)] aspect-square flex items-center justify-center" style={{ background: palette[1], color: text[1] }}>
                    <i className={`${icon} text-[1.25rem]`} />
                </div>
                <span className="text-[1.125rem] sm:text-[1.25rem] font-medium">{name}</span>
                <div className="absolute right-0 pr-1 pl-3 sm:pl-5 sm:pr-2 bg-white/50 h-full flex items-center justify-center">
                    <Dropdown
                        Toggle={
                            <button className={`focus:outline-none sm:hover:scale-105 text-[1rem] sm:leading-5 sm:text-[1.125rem] h-[46px] pr-2 flex gap-2 items-center`}>
                                <span className="max-sm:hidden">Select Version</span> <i className="text-[1.5rem] ri-filter-3-line" />
                            </button>
                        }
                        MobileTitle={
                            <div className="w-full flex items-center pl-6 py-[14px] text-[1.25rem] leading-6" style={{ background }}>
                                Version
                            </div>
                        }
                        placement="right">
                        <div className="flex max-sm:flex-wrap sm:flex-col sm:pr-1 sm:min-w-[256px] max-sm:gap-2 max-sm:max-h-[296px] max-sm:overflow-y-scroll max-sm:text-[0.875rem]">
                            {
                                sorted.slice(1, sorted.length).filter(group => group !== version).map((v, i) => {
                                    const { name, background } = getVersionData(v, { angle: 135, opacity: "" });

                                    return (
                                        <div className="max-sm:shrink-0 px-4 sm:px-2 py-1 rounded-[24px] sm:rounded-[4px] max-sm:text-center sm:text-start whitespace-nowrap cursor-pointer group/text overflow-hidden relative" key={i} onClick={() => { setVersion(v); }} style={{ background }}>
                                            <div className="max-sm:opacity-100 w-[calc(100%-2px)] sm:w-full h-[calc(100%-2px)] sm:h-full max-sm:rounded-full sm:group-hover/text:opacity-65 bg-white sm:opacity-100 absolute left-[1px] top-[1px] sm:left-0 sm:top-0 z-0" />
                                            <span className="relative z-1">{name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Dropdown>
                </div>
            </div>
            {
                !!version && groupRef.current[version] &&
                <div className="w-full max-sm:flex max-sm:flex-col sm:columns-2 overflow-hidden pt-2 max-sm:gap-8 sm:gap-2">
                    {
                        Object.entries(groupRef.current[version]).map(([method, moves], i) => (
                            <Moveset key={`${version}-${i}`} method={method} version={version} moveData={moves} />
                        ))
                    }
                </div>
            }

        </div>
    )
}

export default Moves;

function groupMoveSets(moves: Record<string, MoveDataVersion>): GroupedMoveSets {
    return Object.entries(moves).reduce((acc, [id, data]) => {
        Object.entries(data).forEach(([method, versions]) => {
            const [name, level] = method.split("@");
            const moveData = { id, ...(!!level && { level: parseInt(level) }) };
            versions.forEach(version => {
                if (acc[version]) {
                    if (acc[version][name]) {
                        acc[version][name].push(moveData);
                    } else {
                        acc[version][name] = [moveData]
                    }
                } else {
                    acc[version] = {
                        [name]: [moveData]
                    }
                }
            })
        })
        return acc;
    }, {} as GroupedMoveSets);
}
