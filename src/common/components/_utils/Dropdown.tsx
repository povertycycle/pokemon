import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./animation.module.scss";
import custom from "@/common/styles/custom.module.scss";

type DropdownProps = {
    Toggle: React.ReactNode;
    MobileTitle?: React.ReactNode;
    children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ Toggle, MobileTitle, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [menu, setMenu] = useState<boolean>(false);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (![ref, menuRef].find(r => r.current && r.current.contains(e.target as Node))) {
                setMenu(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => { document.removeEventListener('mousedown', handler) }
    }, []);

    function adjustPosition(menuRef: HTMLDivElement | null) {
        if (ref.current && menuRef && window.innerWidth > 640) {
            const { left, top, height } = ref.current.getBoundingClientRect();
            menuRef.style.left = `${left}px`;
            menuRef.style.top = `${top + height}px`;
        }
    }

    return (
        <>
            <div ref={ref} onClick={() => { setMenu(true); }}>
                {Toggle}
            </div>
            {
                menu && !!document && createPortal(
                    <div className={`font-default max-sm:bottom-0 max-sm:left-0 absolute z-[100] sm:mt-2 max-sm:bg-black/65 sm:bg-white max-sm:w-screen max-sm:h-dvh flex items-end overflow-hidden sm:[box-shadow:0_0_4px_0_#00000080] sm:rounded-[4px] sm:p-1`} ref={adjustPosition}>
                        <div scroll-color="green" onClick={() => { setMenu(false); }} ref={menuRef} className={`${styles.dropdownMobile} ${custom.scrollbar} flex flex-col z-[1] relative bg-white max-sm:w-screen sm:max-h-[256px] overflow-y-auto custom-scrollbar max-sm:rounded-t-[8px]`}>
                            <div className="sm:hidden w-full flex gap-4 relative border-b border-base-white-dark items-center">
                                {MobileTitle}
                                <div className="absolute right-4">
                                    <i className="text-[1.5rem] ri-close-line" />
                                </div>
                            </div>
                            <div className="max-sm:p-6">
                                {children}
                            </div>
                        </div>
                    </div>,
                    document.body
                )
            }
        </>
    )
}

export default Dropdown;