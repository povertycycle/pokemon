import { Sprites } from "@/common/interfaces/pokemon";
import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import ExtraSprites from "./ExtraSprites";
import Sound from "./Sound";
import { PaletteContext } from "../_utils";

type SpriteViewerProps = {
    defaultSprite: string;
    sprites: Sprites[];
    cries: string;
}

const SpriteViewer: React.FC<SpriteViewerProps> = ({ defaultSprite, sprites, cries }) => {
    const soundRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (soundRef.current) soundRef.current.volume = 0.2;
    }, []);

    return (
        <>
            <Image width={128} height={128} loading="lazy" className={`aspect-square relative z-[1] w-full h-full object-contain`} alt="" src={defaultSprite} />
            <div className="absolute bottom-3 right-[10px] z-[2] flex flex-col gap-3">
                <ExtraSprites sprites={sprites} />
                <Sound ref={soundRef} cries={cries} />
            </div>
        </>
    )
}

export default SpriteViewer;
