import { Sprites } from "@/common/interfaces/pokemon";
import { useContext, useEffect, useRef, useState } from "react";
import Sound from "./Sound";
import Image from "next/image";
import { PaletteContext } from "../_utils";
import Selection from "./Selection";
import shake from "./shake.module.scss";

type SpriteViewerProps = {
    defaultSprite: string;
    sprites: Sprites;
    cries: string;
}

const SpriteViewer: React.FC<SpriteViewerProps> = ({ defaultSprite, sprites, cries }) => {
    const soundRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (soundRef.current) soundRef.current.volume = 0.1;
    }, []);

    function playAudio() {
        if (soundRef.current) soundRef.current.play();
    }

    return (
        <div>
            <SpriteDisplay defaultSprite={defaultSprite} sprites={sprites} playAudio={playAudio} />
            <Sound ref={soundRef} cries={cries} />
        </div>
    )
}

export default SpriteViewer;

type SpriteDisplayProps = {
    defaultSprite: string;
    sprites: Sprites;
    playAudio: Function;
}

const SpriteDisplay: React.FC<SpriteDisplayProps> = ({ defaultSprite, sprites, playAudio }) => {
    const { palette } = useContext(PaletteContext);
    const [active, setActive] = useState<string>(defaultSprite);

    const selectSprite = (url: string) => {
        setActive(url);
    }

    return (
        <div className="flex max-sm:flex-col relative">
            <div className="sm:max-w-[400px] sm:pt-16 w-full relative z-[1] overflow-hidden" style={{ background: `${palette[0]}` }}>
                <div className="absolute z-0 left-0 top-0 bg-black/35 w-full h-full" />
                <Image width={128} height={128} loading="lazy" className={`${shake.shake} aspect-square relative z-[1] w-full h-full object-contain`} alt="" src={active} />
            </div>
            <Selection sprites={sprites} selectSprite={selectSprite} />
        </div>
    )
}


//     const animateNewPokemon = (e: SyntheticEvent<HTMLDivElement>) => {
//         if (details?.name && currName.current !== details.name) {
//             currName.current = details.name;
//             const div = e.target as HTMLDivElement;
//             div.classList.add(styles.shake);
//             div.onanimationend = () => { div.classList.remove(styles.shake) }
//             if (audioRef.current) audioRef.current.play();
//         }
//     }
