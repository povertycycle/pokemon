import { useContext, useEffect, useState } from "react";
import { DetailsContext } from "../../contexts";
import Images from "./Images";
import Navigation from "./Navigation";
import { OTHERS } from "./constants";
import { SpritesData } from "../../../interfaces/sprites";

type SpritesProps = {
    pokemon: string,
    data: SpritesData
}

const Sprites: React.FC<SpritesProps> = ({ data }) => {
    const [active, setActive] = useState<string>(OTHERS);

    return (
        <div className="flex justify-end">
            <Navigation sprites={data} active={active} setActive={setActive} />
            <Images options={active === OTHERS ? data.others : data.versions[active]} />
        </div>
    )
}

export default Sprites;