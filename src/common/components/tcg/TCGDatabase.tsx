import styles from "../animation.module.scss";
import { useContext } from "react";
import { PageContext } from "../contexts";
import { PageState } from "../types";

const TCGDatabase: React.FC = () => {
    const { setSection } = useContext(PageContext);

    const returnToMain = () => {
        setSection(PageState.Main);
    }

    return (
        <div className={`${styles.fadeIn} w-full h-full bg-black text-white text-[7rem] items-center justify-center flex`}>
            In Progress
            <span onClick={returnToMain} className="z-[0] absolute right-0 top-0 text-[2rem] hover:underline cursor-pointer">Return</span>
        </div>
    )
}

export default TCGDatabase;