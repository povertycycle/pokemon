import { PaletteContext } from "@/stores/contexts";
import { useContext, useEffect, useRef } from "react";

type SoundProps = {
    cries: string;
};

/**
 * Sound component
 */
export const Sound: React.FC<SoundProps> = ({ cries }) => {
    const ref = useRef<HTMLAudioElement>(null);
    const {
        dark: { background },
    } = useContext(PaletteContext);
    function playAudio() {
        ref.current?.play();
    }

    useEffect(() => {
        if (ref.current) ref.current.volume = 0.2;
    }, []);

    return (
        <div
            className="h-8 w-8 rounded-semi flex items-center justify-center sm:hover:scale-105 cursor-pointer"
            style={{ color: background, background: `${background}1a` }}
        >
            <i
                onClick={playAudio}
                className="ri-volume-up-fill text-lg sm:text-xl"
            />
            <audio className="hidden" ref={ref} src={cries} controls={false} />
        </div>
    );
};
