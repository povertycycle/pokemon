import { PokemonCard, PokeVariants } from "@/common/interfaces/pokemon";
import Stacks from "./Stacks";
import Forms from "./Forms";
import { Bookmark, BOOKMARK_DATA } from "../../bookmarks/_utils";
import { useContext } from "react";
import { PaletteContext } from "../_utils";

type VariationsProps = {
    evolutions: PokeVariants;
    current: PokemonCard;
}

const Variations: React.FC<VariationsProps> = ({ evolutions, current }) => {
    const { palette } = useContext(PaletteContext);
    const { id, icon } = BOOKMARK_DATA[Bookmark.Forms];

    return (
        <div className="flex flex-col h-full">
            <div id={id} className="section__header--default items-center gap-3" style={{ borderColor: palette[1] }}><i className={`${icon} text-[1.25rem] leading-4`} style={{ color: palette[1] }} /> Forms</div>
            <Forms variants={evolutions.variants} current={current} description={evolutions.formDescription} switchable={evolutions.formSwitchable} />
            <Stacks chain={evolutions.chain} current={current} />
        </div>
    )
}

export default Variations;