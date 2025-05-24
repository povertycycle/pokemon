import { GITHUB } from "@/constants/game/main";
import { API_HOME } from "@/constants/game/urls";
import { PaletteContext } from "@/stores/contexts";
import Link from "next/link";
import { useContext } from "react";
import { getIdentifiers } from "../../../utils/strings";
import { BOOKMARK_DATA } from "../header/Bookmarks";

type BugReportingProps = {
    name: string;
    species: string;
};

/**
 * Bug reporting panel
 * @param name Pokemon name
 * @param species Pokemon species
 */
export const BugReporting: React.FC<BugReportingProps> = ({
    name,
    species,
}) => {
    const { dark, light } = useContext(PaletteContext);
    const identifiers = getIdentifiers(name, species);
    const { icon, id } = BOOKMARK_DATA["bug-reports"];

    return (
        <div
            id={id}
            className="w-full relative"
            style={{ background: dark.background, color: dark.color }}
        >
            <div className="absolute m-2 sm:m-4 right-0 z-1 h-6 w-6 sm:w-fit sm:pr-3 sm:pl-2 gap-2 flex items-center justify-center rounded-full bg-white text-black">
                <i className={`${icon} text-lg`} />
                <span className="font-medium max-sm:hidden whitespace-nowrap text-sm tracking-wide">
                    Bug Reporting
                </span>
            </div>
            <div className="w-full flex flex-col bg-black/25 pt-8 pb-2 sm:pt-12 items-center justify-center px-2">
                <div className="flex flex-col w-full px-2 items-center justify-center">
                    <span className="text-xs sm:text-base text-center tracking-wider">
                        If you encountered any bugs related to
                    </span>
                    <span className="flex items-center gap-4 my-4 sm:my-8">
                        <div
                            className="px-4 rounded-semi text-base sm:text-lg/7"
                            style={{
                                background: light.background,
                                color: dark.background,
                            }}
                        >
                            <span className="brightness-75 font-medium capitalize">
                                {species}
                            </span>
                        </div>
                        {!!identifiers && (
                            <span
                                className={`text-white/75 font-medium tracking-wider`}
                            >
                                {identifiers.toUpperCase()}
                            </span>
                        )}
                    </span>
                    <span className="text-xs sm:text-base text-center tracking-wider">
                        Please report it to{" "}
                        <Hyperlink href={"https://github.com/PokeAPI/pokeapi/"}>
                            {API_HOME}
                        </Hyperlink>{" "}
                        developers or by posting an issue at my{" "}
                        <Hyperlink href={`${GITHUB}/pokemon/issues`}>
                            Github Page
                        </Hyperlink>
                    </span>
                </div>
                <div className="text-xxs sm:text-xs w-full flex items-start justify-start mt-8 sm:mt-12 tracking-wider">
                    {
                        "This website is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company. Pokémon names are trademarks of Nintendo."
                    }
                </div>
            </div>
        </div>
    );
};

type HyperlinkProps = {
    href: string;
    children?: React.ReactNode;
};

/**
 * Hyperlink style
 * @param param0
 * @returns
 */
const Hyperlink: React.FC<HyperlinkProps> = ({ href, children }) => {
    const { light } = useContext(PaletteContext);

    return (
        <Link
            onClick={(e: any) => {
                e.stopPropagation();
            }}
            href={href}
            target="_blank"
            className="group/link border-b border-white relative sm:pb-0.5 text-xs sm:text-base"
        >
            <div
                className="sm:group-hover/link:w-full w-0 transition-width absolute left-0 border-t"
                style={{ borderColor: light.background }}
            />
            {children ?? href}
        </Link>
    );
};
