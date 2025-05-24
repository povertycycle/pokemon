import { GameNavigations } from "@/components/internal/GameNavigations";
import { PaletteContext } from "@/stores/contexts";
import { useContext } from "react";
import { Bookmarks } from "./Bookmarks";
import { Name } from "./Name";
import { Searchbar } from "./Searchbar";

type HeaderProps = {
    index: number;
    name: string;
    species: string;
    icon?: string | null;
};

/**
 * Pokemon page header
 */
export const Header: React.FC<HeaderProps> = ({
    index,
    name,
    species,
    icon,
}) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);

    return (
        <div
            className="shrink-0 sticky z-40 left-0 top-0 shadow-[0_4px_6px_-1px_#00000033] w-full flex"
            style={{ background }}
        >
            <div className="mx-auto w-full flex sm:h-14 max-sm:flex-wrap sm:justify-between max-sm:p-2 sm:py-3 sm:px-4 gap-2 sm:gap-4 max-w-screen-xl">
                <Searchbar />
                <div className="max-sm:h-8 sm:h-full sm:order-3 sm:w-full flex sm:justify-end">
                    <GameNavigations />
                </div>
                <Bookmarks />
                <Name index={index} name={name} species={species} icon={icon} />
            </div>
        </div>
    );
};
