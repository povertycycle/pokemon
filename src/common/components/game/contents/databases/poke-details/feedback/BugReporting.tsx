import { API_HOME } from "@/common/constants/urls";
import { useContext } from "react";
import { PaletteContext } from "../_utils";
import { capitalize } from "@/common/utils/string";
import { GITHUB } from "@/common/constants/constants";
import Link from "next/link";

type BugReportingProps = {
    name: string;
    species: string;
}

const BugReporting: React.FC<BugReportingProps> = ({ name, species }) => {
    const { palette, text } = useContext(PaletteContext);
    const identifiers = name.replace(species, "").split("-").slice(1);

    return (
        <div className="w-full" style={{ background: palette[1], color: text[1] }}>
            <div className="w-full flex flex-col bg-black/25 pt-8 pb-2 sm:pt-12 items-center justify-center px-2">
                <div className="flex flex-col w-full px-2 items-center justify-center">
                    <span className="text-[0.875rem] sm:text-[1.25rem] text-center">If you encountered any bugs related to</span>
                    <span className="flex items-center gap-4 mt-4 max-sm:text-[0.875rem]">
                        <span className="px-4 rounded-[4px] text-[1.25rem] sm:text-[1.5rem]" style={{ background: palette[0], color: text[0] }}>{capitalize(species)}</span>
                        {
                            identifiers.length > 0 &&
                            <div className="flex gap-2">
                                {
                                    identifiers.map((id, i) => (
                                        <div className={`bg-base-white-soft h-fit px-3 sm:px-4 sm:py-[2px] flex items-center justify-center rounded-[16px] text-black`} key={i}>
                                            {id.toUpperCase()}
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </span>
                    <span className="text-[0.875rem] sm:text-[1.25rem] text-center mt-4">Please report it to <Hyperlink href={"https://github.com/PokeAPI/pokeapi/"}>{API_HOME}</Hyperlink> developers or by posting an issue at my <Hyperlink href={`${GITHUB}/pokemon/issues`}>Github Page</Hyperlink></span>
                </div>
                <div className="text-[0.75rem] sm:text-[0.875rem] w-full flex items-start justify-start mt-8 sm:mt-12">
                    {"This website is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company. Pokémon names are trademarks of Nintendo."}
                </div>
            </div>
        </div>
    )
}

export default BugReporting;

type HyperlinkProps = {
    href: string;
    children?: React.ReactNode;
}

const Hyperlink: React.FC<HyperlinkProps> = ({ href, children }) => {
    const { palette } = useContext(PaletteContext);

    return (
        <Link onClick={(e: any) => { e.stopPropagation() }} href={href} target="_blank" className="group/link border-b border-white relative pb-[2px] text-[1rem] sm:text-[1.25rem]">
            <div className="sm:group-hover/link:w-full w-0 transition-width absolute left-0 border-t" style={{ borderColor: palette[0] }} />
            {children ?? href}
        </Link>
    )
}

