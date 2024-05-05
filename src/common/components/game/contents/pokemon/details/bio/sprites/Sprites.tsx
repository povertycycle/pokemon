import { fetchSpritesDetails } from "@/common/components/game/database/spritesDB";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { SpritesData } from "../../../interface";
import { DetailsContext } from "../../contexts";
import Cries from "./Cries";
import Navigation from "./Navigation";
import styles from "./animation.module.scss";

const Sprites: React.FC = () => {
    const { details } = useContext(DetailsContext);
    const [sprites, setSprites] = useState<SpritesData | null>(null);
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        if (details?.name) {
            fetchSpritesDetails(details.name).then(res => {
                setSprites(res);
                const default_sprite = res?.others["official-artwork"] ?? null;
                if (default_sprite) {
                    setActive(default_sprite);
                }
            });
        };

    }, [details?.name])

    return (
        <div className="w-full flex gap-1 justify-end h-[384px]">
            <Navigation sprites={sprites} active={active} setActive={setActive} />


            <div className="h-full relative z-[0]">
                <SpriteImage sprite={active} />
            </div>
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
        <div className="h-full aspect-square shrink-0 relative z-[1]">
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