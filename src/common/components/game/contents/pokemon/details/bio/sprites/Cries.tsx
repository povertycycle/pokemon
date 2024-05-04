import { useContext, MutableRefObject, useEffect } from "react";
import { DetailsContext } from "../../contexts";

const Cries: React.FC<{ audioRef: MutableRefObject<HTMLAudioElement | null> }> = ({ audioRef }) => {
    const { details } = useContext(DetailsContext);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = 0.1
    }, []);

    return (
        <div className="hidden">
            <audio ref={audioRef} src={details?.cries} />
        </div>
    )
}

export default Cries;