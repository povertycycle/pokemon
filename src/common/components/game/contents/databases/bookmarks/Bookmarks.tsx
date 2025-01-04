// import { useContext, useState } from "react";
// import { SCROLL_ID } from "../constants";
// import { KEYS, Shortcuts } from "./constants";
// import { shortcutID } from "@/common/utils/shortcut";

import { useContext, useState } from "react";
import { PaletteContext } from "../poke-details/_utils";
import { Bookmark, BOOKMARK_DATA } from "./_utils";

// function scrollToTarget(id: string) {
//     let element = document.getElementById(id);
//     if (element) {
//         let el = document.getElementById(SCROLL_ID) as HTMLDivElement;
//         el.scrollTo({
//             top: (element.getBoundingClientRect().top + el.scrollTop - 96),
//             behavior: "smooth"
//         });
//     }
// }

const Bookmarks: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const { palette, text } = useContext(PaletteContext);

    return (
        <div className="max-sm:w-[32px] flex sm:h-full sm:fixed sm:left-0 sm:pt-[64px] sm:top-0 border-l-2" style={{ borderColor: palette[1] }}>
            <div onClick={() => { setShow(true) }} className="border border-black sm:hidden h-full aspect-square bg-white rounded-[4px] flex items-center justify-center">
                <i className="ri-bookmark-2-fill text-[1.25rem]" />
            </div>
            <div onClick={() => { setShow(false) }} className={`${show ? "max-sm:max-h-dvh" : "max-sm:max-h-0 max-sm:delay-500"} max-sm:w-full max-sm:fixed max-sm:bottom-0 max-sm:left-0 h-dvh sm:h-full max-sm:z-50 max-sm:flex max-sm:flex-col max-sm:justify-end max-sm:overflow-hidden`}>
                <div className={`${show ? "opacity-100" : "opacity-0"} transition-opacity duration-200 ease-in sm:hidden absolute w-full h-full bg-black/65 top-0 left-0 z-0`} />
                <div className={`mobile__template--card sm:items-end ${show ? "max-sm:max-h-dvh" : "max-sm:max-h-0"}`}>
                    <div className="sm:hidden w-full flex items-center pl-6 py-[14px] text-[1.25rem] leading-6" style={{ background: palette[1], color: text[1] }}>
                        <span>Jump To</span>
                        <div className="absolute right-4">
                            <i className="text-[1.5rem] ri-close-line" />
                        </div>
                    </div>
                    <div className="max-sm:bg-white font-medium text-[1rem] sm:text-[1.125rem] sm:py-16 sm:h-full w-full flex sm:justify-between flex-col sm:items-start gap-4 max-sm:px-4 max-sm:py-6 whitespace-nowrap " style={{ color: palette[1] }}>
                        {
                            Object.values(Bookmark).map(bookmark => {
                                const { icon, id } = BOOKMARK_DATA[bookmark]
                                return (
                                    <div onClick={() => {
                                        document.getElementById(id)?.scrollIntoView({ block: "center", inline: "nearest" });
                                    }} className="max-sm:w-full max-sm:px-3 sm:pl-1 sm:h-[36px] max-sm:rounded-full overflow-hidden outline-1 sm:outline-2 outline sm:rounded-r-full sm:hover:max-w-[384px] cursor-pointer sm:max-w-[36px] flex relative bg-white" key={bookmark} style={{ outlineColor: palette[1] }}>
                                        <div className="absolute w-full h-full top-0 left-0" style={{ background: `${palette[1]}1a` }} />
                                        <div className="h-full sm:pr-5 flex items-center gap-3">
                                            <i className={`${icon} text-[1.25rem]`} />{bookmark}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookmarks;