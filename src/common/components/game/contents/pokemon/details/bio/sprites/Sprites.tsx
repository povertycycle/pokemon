import { useState } from "react";
import { SpritesData } from "../../../interfaces/sprites";
import Images from "./Images";
import Navigation from "./Navigation";
import { OTHERS } from "./constants";
import { shortcutID } from "@/common/utils/shortcut";
import { Shortcuts } from "../../../shortcuts/constants";

type SpritesProps = {
    data: SpritesData
}

const Sprites: React.FC<SpritesProps> = ({ data }) => {
    const [active, setActive] = useState<string>(OTHERS);

    return (
        <div id={shortcutID(Shortcuts.Sprites)} className="flex justify-end shrink-0 h-fit">
            <Navigation sprites={data} active={active} setActive={setActive} />
            <Images options={active === OTHERS ? data.others : data.versions[active]} gen={active} />
        </div>
    )
}

export default Sprites;