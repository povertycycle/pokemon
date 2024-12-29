import { POKEMON_FETCH_BAR_ID } from "@/common/constants/constants";
import styles from "./animation.module.scss";

const Loading: React.FC<{ progress?: boolean, size?: number }> = ({ progress, size }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <div className={`${styles.spin} rounded-full overflow-hidden flex flex-col items-center justify-center relative aspect-square h-[96px] sm:h-[128px]`}>
                <div className="relative z-0 w-full h-full bg-gradient-to-br from-base-red to-base-red-dark" />
                <div className="relative z-0 w-full h-full bg-gradient-to-br from-base-white to-base-white-dark" />
                <div className="absolute z-1 w-[36px] sm:w-[48px] aspect-square rounded-full bg-white shadow-[inset_0_0_16px_#00000080]" />
            </div>
            <span className="text-center my-4 sm:text-[1.5rem]">Initializing necessary data</span>
            {
                progress && <div id={POKEMON_FETCH_BAR_ID} className="bg-gradient-to-r from-base-white-dark to-base-white-soft w-full max-w-[640px] h-[24px] rounded-[4px] sm:rounded-[6px] flex overflow-hidden">
                    <div className="bg-[#4E8234]" style={{ width: '0px' }} />
                    <div className="bg-[#A60000]" style={{ width: '0px' }} />
                </div>
            }
        </div>
    )
}

export default Loading;