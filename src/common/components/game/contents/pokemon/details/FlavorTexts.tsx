import { shortcutID } from "@/common/utils/shortcut";
import { useContext } from "react";
import { Shortcuts } from "../shortcuts/constants";
import { getGameColors } from "./_utils/getGameColors";
import { getGameName } from "./_utils/getGameName";
import { DetailsContext } from "./contexts";

type FlavorTextsProps = {
    entries: {
        version: string,
        text: string,
    }[]
}

const FlavorTexts: React.FC<FlavorTextsProps> = ({ entries }) => {
    const { palette } = useContext(DetailsContext);

    return (
        <div id={shortcutID(Shortcuts.Flavors)} className={`flex flex-col w-full items-center gap-8`}>
            <div className="px-32 text-[1.25rem] w-fit flex justify-center bg-black/50 text-base-white border-y" style={{ borderColor: palette[0] }}>Entries</div>
            <div className={`flex flex-col gap-8 text-base-white`}>
                {
                    entries.map(({ version, text }, i: number) => (
                        <div key={i} className={`flex items-center flex-col`}>
                            <div className="h-full flex text-[1.125rem] items-center justify-start px-16" style={{ background: getGameColors(version) }}>
                                <span className="drop-shadow-[0_0_2px_black]">{getGameName(version)}</span>
                            </div>
                            <span className="px-4 py-2 max-w-[70%] text-center italic leading-5 text-[1.5rem] tracking-[1px] border-y bg-black/25 flex flex-col" style={{ borderColor: palette[0] }}>
                                <span className="text-start">{"\u201C"}</span>
                                <div className="flex flex-col text-base leading-5">
                                    {
                                        // text?.match(SENTENCES_REGEX)?.map(((t: string, j: number) => (
                                        //     <span key={j}>{t.replace("\u000c", " ")}</span>
                                        // )))
                                    }
                                </div>
                                <span className="text-end">{"\u201D"}</span>
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FlavorTexts;