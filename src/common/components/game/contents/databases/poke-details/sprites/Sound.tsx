import { RefObject, useContext } from "react";
import { PaletteContext } from "../_utils";

type SoundProps = {
    cries: string;
    ref: RefObject<HTMLAudioElement>;
};

const Sound: React.FC<SoundProps> = ({ cries, ref }) => {
    const { palette, text } = useContext(PaletteContext);
    function playAudio() {
        ref.current?.play();
    }

    return (
        <div className="h-[32px] w-[32px] rounded-full flex items-center justify-center sm:hover:-translate-y-1 transition-transform cursor-pointer" style={{ background: palette[1], color: text[1] }}>
            <i onClick={playAudio} className="ri-volume-up-fill text-[1.125rem]" />
            <audio className="hidden" ref={ref} src={cries} controls={false} />
        </div>
    )
}

export default Sound;