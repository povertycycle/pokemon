import styles from "../animation.module.scss";
import { useContext } from "react";
import { PageContext } from "../context";
import { PageState } from "../constants";

const TCGDatabase: React.FC = () => {
    const { setSection } = useContext(PageContext);

    const returnToMain = () => {
        setSection(PageState.Main);
    }

    return (
        <div className={`${styles.fadeIn} w-full h-full bg-black text-white text-[3rem] items-center text-center justify-center flex`}>
            Looking for a good and reliable API...
            <span onClick={returnToMain} className="z-[0] absolute right-0 top-0 text-[2rem] hover:underline cursor-pointer">Return</span>
        </div>
    )
}

export default TCGDatabase;