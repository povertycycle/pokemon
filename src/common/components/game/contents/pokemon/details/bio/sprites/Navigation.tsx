import styles from "@/common/styles/custom.module.scss";
import { isDark } from "@/common/utils/colors";
import { Dispatch, SetStateAction, useContext } from "react";
import { DetailsContext } from "../../contexts";
import { SpritesData } from "../../../interfaces/sprites";
import { OTHERS } from "./constants";

type NavigationProps = {
    sprites: SpritesData | null;
    active: string;
    setActive: Dispatch<SetStateAction<string>>;
}

const Navigation: React.FC<NavigationProps> = ({ sprites, active, setActive }) => {
    const { palette } = useContext(DetailsContext);
    const font = isDark(palette[0]) ? "white" : "black";

    return (
        <div className={`relative z-[1] h-fit max-h-full overflow-y-scroll flex flex-col gap-2 p-2 rounded-l-[10px] ${styles.hiddenScroll}`} style={{ background: palette.at(-1) }}>
            {
                sprites && Object.keys(sprites.versions).map((gen: string, i: number) => (
                    <Selector key={i} isActive={active === gen} select={() => { setActive(gen) }} color={[palette[0], font]} title={`Gen ${(gen.split("-").at(-1) ?? "0").toUpperCase()}`} />
                ))
            }
            {sprites?.others && <Selector isActive={active === OTHERS} color={[palette[0], font]} title={OTHERS.charAt(0).toUpperCase() + OTHERS.slice(1)} select={() => { setActive(OTHERS) }} />}
        </div>
    )
}

const Selector: React.FC<{ color: [string, string], isActive: boolean, title: string, select: () => void }> = ({ color, isActive, title, select }) => {
    return (
        <div className={`group/selector relative w-full h-[24px] flex flex-col items-center justify-center px-2 overflow-hidden text-center leading-4 cursor-pointer rounded-[6px]`} style={{ background: color[0], color: color[1] }} onClick={select}>
            <div className={`absolute z-[0] ${isActive ? "bg-black/0" : "bg-black/35 group-hover/selector:bg-black/15"} transition-colors w-full h-full`} />
            <span className="relative z-[1]">{title}</span>
        </div>
    )
}

export default Navigation;
