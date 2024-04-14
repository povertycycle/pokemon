import styles from "./animation.module.scss";

const Loading: React.FC = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className={`${styles.spin} w-[128px] h-[128px] rounded-full border-[8px] border-black overflow-hidden flex flex-col items-center justify-center relative`}>
                <div className="relative z-[0] w-full h-full bg-gradient-to-br from-base-red to-base-red-dark border-b-[4px] border-black" />
                <div className="relative z-[0] w-full h-full bg-gradient-to-br from-base-white to-base-white-dark border-t-[4px] border-black" />
                <div className="absolute z-[1] w-[50%] h-[50%] border-[8px] border-black rounded-full bg-base-white" />
            </div>
        </div>
    )
}

export default Loading;