import { PaletteContext } from "@/stores/contexts";
import { useContext } from "react";
import { PokemonBase, PokeVariants } from "../../../interfaces/pokemon";
import { BOOKMARK_DATA } from "../header/Bookmarks";
import { Evolutions } from "./Evolutions";
import { Variants } from "./Variants";

type FormsProps = {
    evolutions: PokeVariants;
    current: PokemonBase;
};

/**
 * Other forms display list including variants and evolutions
 */
export const Forms: React.FC<FormsProps> = ({ evolutions, current }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const { id, icon } = BOOKMARK_DATA.forms;

    return (
        <div className="flex flex-col h-full">
            <div
                id={id}
                className="border-0 section__header--default"
                style={{ borderColor: background }}
            >
                <i className={icon} style={{ color: background }} /> Forms
            </div>
            <Variants
                variants={evolutions.variants}
                current={current}
                description={evolutions.formDescription}
                switchable={evolutions.formSwitchable}
            />
            <Evolutions chain={evolutions.chain} current={current} />
        </div>
    );
};
