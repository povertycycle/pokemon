import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { Sprites } from "../../../interfaces/sprites";
import { DetailsContext } from "../../contexts";
import styles from "./animation.module.scss";
import Cries from "./Cries";
import Selector from "./Selector";
import Image from "next/image";

type ImagesProps = {
    options: Sprites,
    gen: string,
}

const Images: React.FC<ImagesProps> = ({ options, gen }) => {
    const { details, palette } = useContext(DetailsContext);
    const [url, setURL] = useState<string>("");
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currName = useRef<string>("");

    useEffect(() => {
        let url = options["official-artwork"] ?? options[Object.keys(options)[0]];
        setURL(url);
    }, [options]);

    const animateNewPokemon = (e: SyntheticEvent<HTMLDivElement>) => {
        if (details?.name && currName.current !== details.name) {
            currName.current = details.name;
            const div = e.target as HTMLDivElement;
            div.classList.add(styles.shake);
            div.onanimationend = () => { div.classList.remove(styles.shake) }
            if (audioRef.current) audioRef.current.play();
        }
    }

    return (
        <div className="flex flex-col relative shadow-base-black">
            <div className="w-[20vw] aspect-square relative z-[1] overflow-hidden p-8 flex items-center justify-center" style={{ border: `2px solid ${palette[0]}` }}>
                <div className="w-full h-full absolute z-[0] bg-black/25 top-0 left-0" />
                {
                    !url ?
                        <div className="w-full h-full text-[8rem] flex items-center justify-center font-bold"><i className="ri-question-mark" /></div> :
                        <Image width={128} height={128} loading="lazy" className={`w-full h-full max-w-full max-h-full min-h-[128px] min-w-[128px] relative z-[1]`} alt="" src={url} onLoad={animateNewPokemon} />
                }
                <Cries audioRef={audioRef} />
            </div>
            <Selector options={options} url={url} setURL={setURL} gen={gen} />
        </div>
    )
}

export default Images;