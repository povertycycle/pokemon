import { useState } from "react";
import { SpritesData } from "../../../interfaces/sprites";
import Images from "./Images";
import Navigation from "./Navigation";
import { OTHERS } from "./constants";

type SpritesProps = {
    data: SpritesData
}

const Sprites: React.FC<SpritesProps> = ({ data }) => {
    const [active, setActive] = useState<string>(OTHERS);

    return (
        <div className="flex justify-end shrink-0 h-fit">
            <Navigation sprites={data} active={active} setActive={setActive} />
            <Images options={active === OTHERS ? data.others : data.versions[active]} />
        </div>
    )
}

export default Sprites;