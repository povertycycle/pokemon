import { RefObject } from "react";

type SoundProps = {
    cries: string;
    ref: RefObject<HTMLAudioElement>;
};

const Sound: React.FC<SoundProps> = ({ cries, ref }) => {
    return (
        <audio ref={ref} src={cries} />
    )
}

export default Sound;