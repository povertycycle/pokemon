import styles from "../animation.module.scss";

type TCGDatabaseProps = {
    returnToMain: () => void;
}

const TCGDatabase: React.FC<TCGDatabaseProps> = ({ returnToMain }) => {
    return (
        <div className={`${styles.fadeIn} w-full h-full bg-black text-white`}>
            <div className="h-full w-full relative z-0 flex flex-col gap-4 max-sm:leading-6 items-center text-center justify-center text-[1.5rem] sm:text-[3rem]">
                <span>Looking for a good and reliable API...</span>
                <span className="text-[1rem] sm:text-[1.25rem]">Let me know if you are familiar with any!</span>
            </div>
            <span onClick={returnToMain} className="z-1 absolute right-2 top-2 text-[1.5rem] sm:text-[2rem] sm:hover:underline cursor-pointer">Return</span>
        </div>
    )
}

export default TCGDatabase;