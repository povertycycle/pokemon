import { useContext, useState } from "react";
import { IMoves } from "../../../interfaces/pokemon";
import { PaletteContext } from "@/stores/contexts";
import { BOOKMARK_DATA } from "../header/Bookmarks";
import { getVersionData } from "../../../utils/versions";
import { GAME_ORDER } from "../../../constants/constants";
import { Dropdown } from "@/components/internal/Dropdown";
import { Moveset } from "./Movesets";

type MovesProps = {
    moves: IMoves;
};

/**
 * Move list
 */
export const Moves: React.FC<MovesProps> = ({ moves }) => {
    const { dark } = useContext(PaletteContext);
    const { icon, id } = BOOKMARK_DATA.moves;
    const availableVersion = Object.keys(moves).sort(
        (a, b) => GAME_ORDER.indexOf(b) - GAME_ORDER.indexOf(a)
    );
    const [version, setVersion] = useState<string>(availableVersion[0]);
    const { name, background } = getVersionData(version);

    return (
        <div id={id} className="flex flex-col w-full relative">
            <div
                className="w-full text-center py-1 relative flex items-center justify-center border-b"
                style={{
                    borderColor: dark.background,
                    background: background || `${dark.background}33`,
                }}
            >
                <div
                    className="absolute h-full left-0 aspect-square flex items-center justify-center"
                    style={{ background: dark.background, color: dark.color }}
                >
                    <i className={`${icon} text-base`} />
                </div>
                <div className="text-sm sm:text-base font-medium tracking-wider">
                    {name}
                </div>
                <div className="absolute right-0 h-full flex items-center justify-center">
                    <Dropdown className="h-full">
                        <Dropdown.Toggle
                            className={`focus:outline-none sm:hover:brightness-95 bg-white/50 max-sm:aspect-square text-xs sm:text-sm h-full sm:pl-4 sm:pr-2 flex gap-2 justify-center items-center`}
                        >
                            <span className="max-sm:hidden">
                                Select Version
                            </span>
                            <i className="text-lg ri-filter-3-line" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu placement="bottom-right">
                            <Dropdown.MobileHeader
                                className="text-transparent"
                                style={{
                                    background: `${background} text`,
                                }}
                            >
                                <span className="capitalize">
                                    {version.replaceAll("-", " ")}
                                </span>
                            </Dropdown.MobileHeader>
                            <div className="flex max-sm:flex-wrap sm:flex-col sm:min-w-64 max-sm:gap-2 max-sm:max-h-80 max-sm:overflow-y-scroll text-xs sm:text-sm max-sm:px-4 max-sm:pb-6">
                                {availableVersion.map((v, i) => {
                                    const { name, background } = getVersionData(
                                        v,
                                        {
                                            angle: 135,
                                            opacity: "",
                                        }
                                    );

                                    return (
                                        <div
                                            data-disabled={v === version}
                                            className="data-[disabled=true]:cursor-not-allowed data-[disabled=true]:grayscale max-sm:data-[disabled=true]:text-white/50 max-sm:text-white max-sm:shrink-0 max-sm:rounded-full max-sm:text-center sm:text-start whitespace-nowrap cursor-pointer group/text overflow-hidden relative py-2 sm:py-1 px-4 sm:px-2"
                                            key={i}
                                            onClick={
                                                v !== version
                                                    ? () => setVersion(v)
                                                    : undefined
                                            }
                                            style={{
                                                background,
                                            }}
                                        >
                                            <div
                                                data-disabled={v === version}
                                                className="max-sm:bg-black max-sm:opacity-25 sm:data-[disabled=true]:opacity-65 sm:data-[disabled=false]:group-hover/text:opacity-65 bg-white sm:opacity-100 absolute h-full w-full left-0 top-0 z-0"
                                            />
                                            <span className="relative z-1">
                                                {name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            {!!moves[version] && (
                <div className="w-full max-sm:flex max-sm:flex-col sm:columns-2 overflow-hidden max-sm:gap-8 sm:gap-2">
                    {Object.entries(moves[version]).map(([method, moves]) => (
                        <Moveset
                            key={method}
                            method={method}
                            version={version}
                            moves={moves}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
