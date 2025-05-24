import { PaletteContext } from "@/stores/contexts";
import { useContext, useState } from "react";
import { Sprites } from "../../../interfaces/pokemon";
import { formatVersionName } from "../../../utils/versions";

type ExtraSpritesProps = {
    sprites: Sprites[];
};

/**
 * Extra sprites display
 * @param sprites Sprites list
 */
export const ExtraSprites: React.FC<ExtraSpritesProps> = ({ sprites }) => {
    const {
        dark: { background },
    } = useContext(PaletteContext);
    const [show, setShow] = useState<boolean>(false);

    const closePopup = () => setShow(false);
    const showPopup = () => setShow(true);

    return (
        <>
            <button
                onClick={showPopup}
                className="h-8 w-8 rounded-semi flex items-center justify-center sm:hover:scale-105 cursor-pointer"
                style={{ color: background, background: `${background}1a` }}
            >
                <i className="ri-gallery-fill text-lg sm:text-xl" />
            </button>
            <Display sprites={sprites} closePopup={closePopup} show={show} />
        </>
    );
};

/**
 * Display component
 */
const Display: React.FC<{
    sprites: Sprites[];
    closePopup: () => void;
    show: boolean;
}> = ({ sprites, closePopup, show }) => {
    return (
        <div
            className={`${
                show ? "max-h-screen" : "max-h-0 max-sm:delay-500"
            } z-50 fixed bottom-0 left-0 overflow-hidden w-screen h-dvh sm:h-screen font-default flex sm:items-center items-end`}
        >
            <div
                className={`${
                    show ? "max-sm:opacity-100" : "max-sm:opacity-0"
                } ease-in transition-opacity duration-200 w-full h-full absolute left-0 top-0 z-0 bg-black/65`}
                onClick={closePopup}
            />
            <div
                className={`${
                    show ? "max-sm:max-h-[512px]" : "max-sm:max-h-0"
                } max-sm:duration-400 max-sm:ease-in max-sm:transition-max-height max-w-screen-lg w-full sm:max-h-[660px] h-full rounded-t-3xl sm:rounded-t-2xl sm:rounded-b-2xl mx-auto bg-white flex flex-col relative z-1 overflow-hidden`}
            >
                <div
                    className={`sticky top-0 left-0 px-6 py-5 text-base w-full flex justify-between font-medium tracking-wide`}
                >
                    <span>Gallery</span>
                    <i
                        onClick={closePopup}
                        className="cursor-pointer ri-close-line"
                    />
                </div>
                <div className="w-full h-full sm:pl-5 sm:pr-1 pb-4 sm:py-5 flex flex-col">
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-max w-full h-0 grow gap-3 sm:gap-6 form__scrollbar--custom overflow-y-auto max-sm:px-4 sm:pr-4">
                        {show &&
                            sprites.map(({ game, url }) => (
                                <Sprite key={game} version={game} url={url} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Sprite display
 */
const Sprite: React.FC<{ version: string; url: string | null }> = ({
    version,
    url,
}) => {
    const name = formatVersionName(version);

    return (
        <div className="w-full flex flex-col text-center shrink-0">
            <div className="w-full flex items-center justify-center relative aspect-square group/image">
                {!!url ? (
                    <img
                        src={url}
                        alt=""
                        className="w-full aspect-square object-contain"
                    />
                ) : (
                    <span className="text-base-red-dark text-base">
                        Missing Image
                    </span>
                )}
            </div>
            <div className="w-full text-xs sm:text-sm flex items-center justify-center mt-4 font-medium">
                <span className="break-words">{name.join(" ")}</span>
            </div>
        </div>
    );
};
