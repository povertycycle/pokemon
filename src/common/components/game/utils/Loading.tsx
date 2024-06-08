import styles from "./animation.module.scss";
import { POKEMON_FETCH_BAR_ID } from "./constants";

const Loading: React.FC<{ progress?: boolean, size?: number }> = ({ progress, size }) => {
    let w = size ?? 128;
    let b = Math.ceil(w / 16);
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className={`${styles.spin} rounded-full border-black overflow-hidden flex flex-col items-center justify-center relative`} style={{ width: `${w}px`, height: `${w}px`, borderWidth: `${b}px` }}>
                <div className="relative z-[0] w-full h-full bg-gradient-to-br from-base-red to-base-red-dark border-black" style={{ borderBottomWidth: `${b / 2}px` }} />
                <div className="relative z-[0] w-full h-full bg-gradient-to-br from-base-white to-base-white-dark border-black" style={{ borderTopWidth: `${b / 2}px` }} />
                <div className="absolute z-[1] w-[50%] h-[50%] border-black rounded-full bg-base-white" style={{ borderWidth: `${b}px` }} />
            </div>
            {
                progress && <div id={POKEMON_FETCH_BAR_ID} className="w-[640px] h-[24px] rounded-[8px] border-2 border-black mt-4 flex overflow-hidden">
                    <div className="bg-gradient-to-r from-sp-def-dark from-60% to-black" style={{ width: '0px' }} />
                    <div className="bg-gradient-to-r from-black to-hp-dark" style={{ width: '0px' }} />
                </div>
            }
        </div>
    )
}

export default Loading;