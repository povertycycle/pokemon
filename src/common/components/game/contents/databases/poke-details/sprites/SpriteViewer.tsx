import { Sprites } from "@/common/interfaces/pokemon";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ExtraSprites from "./ExtraSprites";
import Sound from "./Sound";
import { Bookmark, BOOKMARK_DATA } from "../../bookmarks/_utils";

type SpriteViewerProps = {
    defaultSprite: string;
    sprites: Sprites[];
    cries: string;
}

const SpriteViewer: React.FC<SpriteViewerProps> = ({ defaultSprite, sprites, cries }) => {
    const soundRef = useRef<HTMLAudioElement>(null);
    const { icon, id } = BOOKMARK_DATA[Bookmark.Flavor];

    useEffect(() => {
        if (soundRef.current) soundRef.current.volume = 0.2;
    }, []);

    return (
        <>
            <Image id={id} width={128} height={128} loading="lazy" className={`aspect-square relative w-full h-full object-contain`} alt="" src={defaultSprite} />
            <div className="absolute bottom-3 right-[10px] flex flex-col gap-3">
                <ExtraSprites sprites={sprites} />
                <Sound ref={soundRef} cries={cries} />
            </div>
        </>
    )
}

export default SpriteViewer;
