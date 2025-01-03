import Shortcuts from "@/common/components/_utils/Shortcuts";
import { Tab } from "@/common/constants/enums";
import { useContext } from "react";
import { PaletteContext } from "../_utils";
import Name from "./Name";
import SearchBar from "./SearchBar";
import Bookmarks from "../../bookmarks/Bookmarks";

type HeaderProps = {
    index: number;
    name: string;
    species: string;
    icon: string;
}

const Header: React.FC<HeaderProps> = ({ index, name, species, icon }) => {
    const { palette, text } = useContext(PaletteContext);

    return (
        <div className="shrink-0 sticky z-40 left-0 top-0 shadow-[0_4px_6px_-1px_#00000033] w-full flex justify-center" style={{ background: palette[1] }}>
            <div className="w-full flex max-sm:flex-wrap sm:justify-between max-sm:p-2 sm:px-4 gap-2 sm:gap-4 leading-8 sm:h-[64px] max-w-[1280px]">
                <SearchBar />
                <Shortcuts source={Tab.Pokemon} title={{ headerColor: palette[1], textColor: text[1] }} />
                <Bookmarks />
                <Name index={index} name={name} species={species} icon={icon} />
            </div>
        </div>
    )
}

export default Header;
