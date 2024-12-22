import { useEffect, useRef, useState } from "react";

type DropdownProps = {
    Toggle: React.ReactNode;
    MobileTitle?: React.ReactNode;
    placement?: "left" | "right";
    children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ Toggle, MobileTitle, placement, children }) => {
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

    return (
        <div className="relative">
            <div ref={ref} onClick={() => { setMenu(true); }}>
                {Toggle}
            </div>
            <div className={`${menu ? "max-h-dvh sm:p-1" : "max-h-0 max-sm:delay-500"} ${placement === "right" ? "sm:right-0" : ""} font-default max-sm:top-0 max-sm:left-0 fixed sm:absolute z-[100] sm:mt-2 sm:bg-white max-sm:w-screen max-sm:h-dvh flex items-end overflow-hidden sm:[box-shadow:0_0_4px_0_#00000080] sm:rounded-[4px]`}>
                <div className={`${menu ? "max-sm:opacity-100" : "max-sm:opacity-0"} ease-in transition-opacity duration-200 absolute left-0 top-0 max-sm:h-dvh max-sm:w-full sm:hidden z-[0] bg-black/65`} />
                <div scroll-color="green" onClick={() => { setMenu(false); }} ref={menuRef} className={`${menu ? "max-h-dvh" : "max-h-0"} max-sm:duration-400 max-sm:ease-in max-sm:transition-max-height form__scrollbar--custom flex flex-col z-[1] relative bg-white max-sm:w-screen sm:max-h-[256px] overflow-x-hidden overflow-y-auto custom-scrollbar max-sm:rounded-t-[16px]`}>
                    <div className="sm:hidden w-full flex gap-4 relative items-center">
                        {MobileTitle}
                        <div className="absolute right-4 text-white">
                            <i className="text-[1.5rem] ri-close-line" />
                        </div>
                    </div>
                    <div className="max-sm:p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;