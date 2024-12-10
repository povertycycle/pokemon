import { useContext, useState } from "react";
import { DetailsContext } from "../details/contexts";
import { capitalize } from "@/common/utils/capitalize";
import { shortcutID } from "@/common/utils/shortcut";
import { Shortcuts } from "../shortcuts/constants";
import { API_HOME } from "../../../../../../constants/urls";

const BugReporting: React.FC = () => {
    const { details, palette, colors } = useContext(DetailsContext);

    return (
        <div id={shortcutID(Shortcuts.BugReport)} className="text-base-white mt-16 w-[calc(100%+16px)] ml-[-16px] bg-black/50 border-t-2 px-12 pt-8 flex flex-col items-center justify-center text-[1.5rem]" style={{ borderColor: palette[0] }}>
            <span className="text-[1.25rem]">If you encountered any bugs related to</span>
            <span className="flex gap-4 items-center mt-4">
                <span className="px-4 rounded-[4px] border-2" style={{ borderColor: palette[0], background: palette[1], color: colors[1] }}>{capitalize(details?.species)}</span>
                {details?.name.replaceAll(details.species, "")?.split("-").filter(Boolean).map((i: string, n: number) => (<span className="text-[1.25rem] h-fit py-[2px] px-4 rounded-[6px] bg-base-white-dark text-black" key={n}>{i.toUpperCase()}</span>))}
            </span>
            <span className="flex items-end gap-4 text-[1.125rem] mt-4">Please report it to <a className="hover:text-base-white-dark transition-colors underline text-[1.25rem]" href={"https://github.com/PokeAPI/pokeapi/"} target="_blank">{API_HOME}</a> developers or by posting an issue at my <a className="hover:text-base-white-dark transition-colors text-[1.25rem] underline" href="https://github.com/povertycycle/pokemon/issues" target="_blank">Github Page</a></span>
            <div className="text-[0.875rem] w-full flex items-start justify-start mt-12 px-4 pb-2">
                {"This website is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company. Pokémon names are trademarks of Nintendo."}
            </div>
        </div>
    )
}

export default BugReporting;