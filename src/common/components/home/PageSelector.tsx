import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styles from "./animation.module.scss";
import { PageState } from "../constants";

type PageSelectorProps = {
    section: PageState,
    setSection: Dispatch<SetStateAction<PageState>>
}

const PageSelector: React.FC<PageSelectorProps> = ({ section, setSection }) => {
    const c = "w-full flex justify-center overflow-hidden text-[3rem] sm:text-[7rem] transition-transform duration-300";
    const iC = "peer aspect-[2/1] h-[50vh] hover:h-[75vh] transition-height relative z-[3] cursor-pointer duration-300";
    const i = "absolute z-[0] max-sm:h-[50vh] max-sm:object-cover opacity-50 sm:top-[-50%]"
    const t = "absolute z-[1] w-full h-full flex items-center justify-center tracking-[10px] text-base-white drop-shadow-[0_10px_4px_black]";
    const p = "absolute z-[2] w-full h-0 sm:h-[50vh] overflow-hidden flex justify-center duration-300";
    const b = "z-[0] absolute w-full border-black";
    const r = "z-[1] relative h-[200%] aspect-square border-[32px] border-black bg-base-white rounded-full shadow-[inset_0_0_20px_2px_black]";

    const toDatabase = () => {
        setSection(PageState.Database);
    }

    const toTCG = () => {
        setSection(PageState.TCG);
    }

    return (
        <div className={`w-full h-full absolute flex flex-col z-[0]`}>
            <div className={`${styles.animateDown} ${section !== PageState.Main ? "translate-y-[-100%]" : "translate-y-[0%]"} ${c}`}>
                <div className={iC} onClick={toDatabase} />
                <Image priority className={i} src={"img/mmgs.jpg"} width={1920} height={1080} alt="" />
                <span className={t}>DATABASE</span>
                <div className={`${p} shadow-[0_10px_100px_20px_black] bottom-0 peer-hover:bottom-full transition-[bottom] bg-base-red sm:pt-[32px]`}>
                    <div className={`${b} bottom-0 border-b-[16px]`} />
                    <div className={r} />
                </div>
            </div>
            <div className={`${styles.animateUp} ${section !== PageState.Main ? "translate-y-[100%]" : "translate-y-[0%]"} ${c}`}>
                <div className={iC} onClick={toTCG} />
                <Image priority className={i} src={"img/mmcs.jpg"} width={1920} height={1080} alt="" />
                <span className={t}>TCG</span>
                <div className={`${p} shadow-[0_-10px_100px_20px_black] top-0 peer-hover:top-full transition-[top] bg-base-white items-end sm:pb-[32px]`}>
                    <div className={`${b} top-0 border-t-[16px]`} />
                    <div className={r} />
                </div>
            </div>
        </div>
    )
}

export default PageSelector;