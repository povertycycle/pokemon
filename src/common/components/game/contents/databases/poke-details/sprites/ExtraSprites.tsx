import { useEscapeClose } from "@/common/hooks/useEscapeClose";
import { Sprites } from "@/common/interfaces/pokemon";
import { getVersionData } from "@/common/utils/version";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { PaletteContext } from "../_utils";

type ExtraSpritesProps = {
    sprites: Sprites[];
}

const ExtraSprites: React.FC<ExtraSpritesProps> = ({ sprites }) => {
    const { palette, text } = useContext(PaletteContext);
    const [show, setShow] = useState<boolean>(false);

    const close = () => {
        setShow(false);
    }

    return (
        <>
            <div onClick={() => { setShow(true) }} className="h-[32px] w-[32px] rounded-full flex items-center justify-center sm:hover:scale-105 cursor-pointer" style={{ background: palette[1], color: text[1] }}>
                <i className="ri-gallery-line text-[1.125rem]" />
            </div>
            <Display sprites={sprites} close={close} show={show} />
        </>
    )
}

export default ExtraSprites;

const Display: React.FC<{ sprites: Sprites[]; close: () => void; show: boolean }> = ({ sprites, close, show }) => {
    const { palette, text } = useContext(PaletteContext);
    useEscapeClose(close);

    return (
        <div className={`${show ? "max-h-screen" : "max-h-0 max-sm:delay-500"} z-50 fixed bottom-0 left-0 overflow-hidden w-screen h-dvh sm:h-screen font-default flex sm:items-center items-end`}>
            <div className={`${show ? "max-sm:opacity-100" : "max-sm:opacity-0"} ease-in transition-opacity duration-200 w-full h-full absolute left-0 top-0 z-0 bg-black/65`} onClick={close} />
            <div className={`${show ? "max-sm:max-h-[512px]" : "max-sm:max-h-0"} max-sm:duration-400 max-sm:ease-in max-sm:transition-max-height max-w-[1024px] w-full sm:max-h-[660px] h-full rounded-t-[16px] sm:rounded-b-[16px] mx-auto bg-white flex flex-col relative z-1 overflow-hidden`}>
                <div className={`sticky top-0 left-0 w-full flex items-center pl-6 py-[14px] text-[1.25rem] leading-6 bg-white`} style={{ background: palette[1], color: text[1] }}>
                    <span>Sprites</span>
                    <div className="absolute right-4 cursor-pointer">
                        <i onClick={close} className="text-[1.5rem] ri-close-line" />
                    </div>
                </div>
                <div className="w-full h-full sm:pl-5 sm:pr-1 py-4 sm:py-5 flex flex-col">
                    <div className="grid grid-cols-3 sm:grid-cols-6 auto-rows-max w-full h-0 grow gap-3 sm:gap-6 form__scrollbar--custom overflow-y-auto max-sm:px-4 sm:pr-4">
                        {
                            show &&
                            sprites.map(({ game, url }, i) => (
                                <Sprite key={i} version={game} url={url} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const Sprite: React.FC<{ version: string; url: string | null }> = ({ version, url }) => {
    const { palette } = useContext(PaletteContext);
    const { name, background } = getVersionData(version, { angle: 45 });

    return (
        <div title={name} className="w-full flex flex-col rounded-[8px] overflow-hidden text-center shrink-0 border" style={{ background: `${palette[1]}1a`, borderColor: palette[1] }}>
            <div className="w-full flex items-center justify-center relative aspect-square group/image p-3">
                {
                    !!url ?
                        <Image width={64} height={64} src={url} alt="" className="w-full aspect-square object-contain rounded-[6px] overflow-hidden" /> :
                        <span className="text-base-red-dark text-[1.25rem]">Missing Image</span>
                }
            </div>
            <div className="w-full text-[0.75rem] sm:text-[1rem] flex items-center justify-center sm:leading-5 border-t" style={{ background, borderColor: palette[1] }}>
                <div className="truncate px-2 py-1 w-full">
                    {name}
                </div>
            </div>
        </div>
    )
}