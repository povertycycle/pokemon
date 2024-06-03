import styles from "./animation.module.scss";
import { POKEMON_FETCH_BAR_ID } from "./constants";

const Loading: React.FC<{ progress?: boolean }> = ({ progress }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className={`${styles.spin} w-[128px] h-[128px] rounded-full border-[8px] border-black overflow-hidden flex flex-col items-center justify-center relative`}>
                <div className="relative z-[0] w-full h-full bg-gradient-to-br from-base-red to-base-red-dark border-b-[4px] border-black" />
                <div className="relative z-[0] w-full h-full bg-gradient-to-br from-base-white to-base-white-dark border-t-[4px] border-black" />
                <div className="absolute z-[1] w-[50%] h-[50%] border-[8px] border-black rounded-full bg-base-white" />
            </div>
            {
                progress && <div id={POKEMON_FETCH_BAR_ID} className="w-[640px] h-[28px] rounded-[8px] border-2 border-black mt-4 flex overflow-hidden">
                    <div className="bg-gradient-to-r from-sp-def-dark from-60% to-black" style={{ width: '0px' }} />
                    <div className="bg-gradient-to-r from-black to-hp-dark" style={{ width: '0px' }} />
                </div>
            }
        </div>
    )
}

export default Loading;