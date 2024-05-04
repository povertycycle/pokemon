import { fetchSpritesDetails } from "@/common/components/game/database/spritesDB";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { SpritesData } from "../../../interface";
import { DetailsContext } from "../../contexts";
import Navigation from "./Navigation";
import styles from "./animation.module.scss";
import Cries from "./Cries";
import Name from "../Name";

const Sprites: React.FC = () => {
    const { details } = useContext(DetailsContext);
    const [sprites, setSprites] = useState<SpritesData | null>(null);
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        if (details?.name) {
            fetchSpritesDetails(details.name).then(res => {
                setSprites(res);
                setActive(res?.others["base_default"] ?? null)
            });
        };

    }, [details?.name])

    return (
        <div className="w-full flex">
            <div className="w-[256px] border-2 bg-black/25 border-black/25 rounded-[4px] overflow-hidden">
                <SpriteImage sprite={active} />
            </div>
            <Navigation />
        </div>
    )
}

const SpriteImage: React.FC<{ sprite: string | null }> = ({ sprite }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const animatePokemon = (e: SyntheticEvent<HTMLDivElement>) => {
        const div = e.target as HTMLDivElement;
        div.classList.add(styles.shake);
        div.onanimationend = () => { div.classList.remove(styles.shake) }
        if (audioRef.current) audioRef.current.play();
    }

    return (
        <div className="w-full aspect-square shrink-0 p-4">
            {
                !sprite ?
                    <div className="w-full h-full bg-black text-white text-[4rem] flex items-center justify-center font-bold"><i className="ri-question-mark" /></div> :
                    <img className={`w-full h-full`} alt="" src={sprite} onLoad={animatePokemon} />
            }
            <Cries audioRef={audioRef} />
        </div>
    )
}

export default Sprites;