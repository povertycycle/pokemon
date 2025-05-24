import { useState } from "react";

interface ListRowDropdownProps {
    mobile: {
        title: React.ReactNode;
        Icon: React.ReactNode;
    };
    children: React.ReactNode;
    className?: string;
}

/**
 * Component to display elements in a row on desktop, and button with a growing sheet for mobile.
 *
 * @param mobile Mobile components data.
 * @param children Elements to be displayed.
 */
export const ListDropdown: React.FC<ListRowDropdownProps> = ({
    mobile,
    children,
    className,
}) => {
    const [show, setShow] = useState<boolean>(false);

    const showMenu = () => setShow(true);
    const closeMenu = () => setShow(false);

    return (
        <div
            className={`max-sm:w-fit sm:shrink-0 h-full relative flex flex-col max-sm:items-end overflow-hidden ${className}`}
        >
            <div
                className={`${
                    show
                        ? "max-sm:max-h-lvh"
                        : "max-sm:max-h-0 max-sm:delay-500"
                } max-sm:overflow-hidden h-lvh sm:h-full max-sm:fixed max-sm:bottom-0 max-sm:z-max max-sm:left-0 w-full flex max-sm:flex-col max-sm:justify-end`}
            >
                <div
                    onClick={closeMenu}
                    className={`${
                        show ? "opacity-100" : "opacity-0"
                    } transition-opacity sm:hidden h-lvh w-full bg-black/65 absolute left-0 top-0 z-0`}
                />
                <div
                    className={`mobile__template--card ${
                        show ? "max-sm:max-h-dvh" : "max-sm:max-h-0"
                    }`}
                >
                    <div className="px-6 py-5 text-base sm:hidden w-full flex justify-between font-medium tracking-wide">
                        {mobile.title}
                        <i
                            onClick={closeMenu}
                            className="cursor-pointer ri-close-line"
                        />
                    </div>
                    <div onClick={closeMenu} className="sm:h-full">
                        {children}
                    </div>
                </div>
            </div>
            <button
                onClick={showMenu}
                className="font-medium sm:hidden h-full w-fit aspect-square shrink-0 rounded-full"
            >
                {mobile.Icon}
            </button>
        </div>
    );
};
