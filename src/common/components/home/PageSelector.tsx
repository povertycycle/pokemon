import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styles from "./animation.module.scss";
import { PageState } from "../../constants/main";

type PageSelectorProps = {
    shouldAnimate?: boolean;
    section: PageState;
    setSection: Dispatch<SetStateAction<PageState>>;
}

const PageSelector: React.FC<PageSelectorProps> = ({ shouldAnimate, section, setSection }) => {
    const c = "cursor-pointer h-[50dvh] sm:h-[50vh] w-screen overflow-hidden duration-500 flex items-center justify-center text-[3rem] sm:text-[7rem]";
    const i = "absolute z-[0] max-sm:h-full sm:w-screen object-cover"
    const t = "sm:hover:bg-black/25 transition-colors relative z-[1] h-full w-full flex items-center justify-center bg-black/50";

    const toDatabase = () => {
        setSection(PageState.Database);
    }

    const toTCG = () => {
        setSection(PageState.TCG);
    }
    return (
        <div className={`absolute flex flex-col z-[0] left-0 top-0 text-base-white font-vcr-mono`}>
            <div className={`${!!shouldAnimate ? `${styles.animateDown} transition-transform` : null} ${section !== PageState.Main ? "translate-y-[-100%]" : "translate-y-[0%]"} ${c}`} onClick={toDatabase}>
                <Image fetchPriority="high" className={i} src={"/img/mmgs.jpg"} width={640} height={360} alt="" />
                <div className={t}>DATABASE</div>
            </div>
            <div className={`${!!shouldAnimate ? `${styles.animateUp} transition-transform` : null} ${section !== PageState.Main ? "translate-y-[100%]" : "translate-y-[0%]"} ${c}`} onClick={toTCG}>
                <Image fetchPriority="high" className={i} src={"/img/mmcs.jpg"} width={640} height={360} alt="" />
                <div className={t}>TCG</div>
            </div>
        </div>
    )
}

export default PageSelector;