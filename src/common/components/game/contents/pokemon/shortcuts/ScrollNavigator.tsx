import { useContext, useState } from "react";
import { SCROLL_ID } from "../constants";
import { KEYS, Shortcuts } from "./constants";
import { shortcutID } from "@/common/utils/shortcut";

function scrollToTarget(id: string) {
    let element = document.getElementById(id);
    if (element) {
        let el = document.getElementById(SCROLL_ID) as HTMLDivElement;
        el.scrollTo({
            top: (element.getBoundingClientRect().top + el.scrollTop - 96),
            behavior: "smooth"
        });
    }
}


const ScrollNavigator: React.FC = () => {
    const [active, setActive] = useState<string>(Shortcuts.Sprites);
    let pos = (KEYS.indexOf(active as Shortcuts) ?? 0);

    return (
        <div className="z-[100] h-screen absolute right-[-16px] top-0 shrink-0 py-16">
            <div className="h-full relative flex flex-col items-end justify-between" >
                {
                    KEYS.map((key: Shortcuts, i: number) => {
                        const activateShortcut = () => {
                            if (active !== key) {
                                setActive(key);
                                scrollToTarget(shortcutID(key))
                            }
                        }

                        return (
                            <div key={i} onClick={activateShortcut} className={`z-[1] group/shortcut flex items-center justify-end px-4 ${active !== key ? "cursor-pointer " : ""} shadow-[inset_0_0_4px_2px_#0000004a] overflow-hidden transition-width border-2 rounded-full shrink-0 overflow-hidden`}>
                                <span className={`${active !== key ? "whitespace-nowrap group-hover/shortcut:tracking-[0px] group-hover/shortcut:opacity-100" : ""} tracking-[-20px] opacity-0 transition-[letter-spacing,opacity] text-[1.125rem]`}>{`${key}\u2000`}</span>
                            </div>
                        )
                    })
                }
                <div className="w-full h-full absolute z-[0] flex justify-center mr-1">
                    {/* <div className="w-[2px] h-full" style={{ background: palette[0] }} /> */}
                </div>
                <div className="absolute z-[2] aspect-square rounded-full mr-[8px] mt-[8px] transition-[top]" />
            </div>
        </div>
    )
}

export default ScrollNavigator;