import { PageState } from "../types";
import { Dispatch, SetStateAction } from "react";
import styles from "./animation.module.scss";
import Image from "next/image";

type PageSelectorProps = {
    section: PageState,
    setSection: Dispatch<SetStateAction<PageState>>
}

const PageSelector: React.FC<PageSelectorProps> = ({ section, setSection }) => {
    const c = "w-full flex justify-center overflow-hidden text-[7rem] transition-transform duration-500";
    const iC = "peer aspect-[2/1] h-[50vh] hover:h-[75vh] transition-height relative z-[3] cursor-pointer duration-500";
    const i = "absolute z-[0] opacity-50 top-[-50%]"
    const t = "absolute z-[1] w-full h-full flex items-center justify-center tracking-[10px] text-base-white drop-shadow-[0_10px_4px_black]";
    const p = "absolute z-[2] w-full h-[50vh] overflow-hidden flex justify-center duration-500";
    const b = "z-[0] absolute w-full border-black";
    const r = "z-[1] relative h-[200%] aspect-square border-[32px] border-black bg-base-white rounded-full";

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
                <Image priority className={i} src={"/img/mmgs.jpg"} width={1920} height={1080} alt="" />
                <span className={t}>DATABASE</span>
                <div className={`${p} bottom-0 peer-hover:bottom-full transition-[bottom] bg-base-red pt-[32px]`}>
                    <div className={`${b} bottom-0 border-b-[16px]`} />
                    <div className={r} />
                </div>
            </div>
            <div className={`${styles.animateUp} ${section !== PageState.Main ? "translate-y-[100%]" : "translate-y-[0%]"} ${c}`}>
                <div className={iC} onClick={toTCG} />
                <Image priority className={i} src={"/img/mmcs.jpg"} width={1920} height={1080} alt="" />
                <span className={t}>TCG</span>
                <div className={`${p} top-0 peer-hover:top-full transition-[top] bg-base-white items-end pb-[32px]`}>
                    <div className={`${b} top-0 border-t-[16px]`} />
                    <div className={r} />
                </div>
            </div>
        </div>
    )
}

export default PageSelector;