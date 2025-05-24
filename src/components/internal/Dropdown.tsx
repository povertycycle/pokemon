import { useMenuBlur } from "@/utils/hooks";
import {
    createContext,
    Dispatch,
    HTMLAttributes,
    SetStateAction,
    useContext,
    useState,
} from "react";

const DropdownContext = createContext<{
    display: boolean;
    setDisplay: Dispatch<SetStateAction<boolean>>;
}>({
    display: false,
    setDisplay: () => {},
});

/**
 * [v2.0] - Dropdown component adjusted for desktop and mobile.
 * @param placement Optional placement on left or right.
 */
const DropdownComponent: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
}) => {
    const [display, setDisplay] = useState<boolean>(false);
    const closeMenu = (e?: any) => {
        e?.stopPropagation();
        setDisplay(false);
    };

    const ref = useMenuBlur(closeMenu);

    return (
        <DropdownContext.Provider value={{ display, setDisplay }}>
            <div ref={ref} className={`${className} relative flex`}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

/**
 * [v2.0] Dropdown toggle component to display toggling button.
 */
const Toggle: React.FC<HTMLAttributes<HTMLButtonElement>> = ({
    className,
    children,
    ...restProps
}) => {
    const { setDisplay } = useContext(DropdownContext);

    return (
        <button
            {...restProps}
            className={className}
            onClick={() => {
                setDisplay(true);
            }}
        >
            {children}
        </button>
    );
};

type MenuProps = {
    placement?:
        | "bottom-left"
        | "bottom-right"
        | "top-right"
        | "top-left"
        | "top-left-full";
    forceWidth?: boolean;
};

/**
 * [v2.0] - Menu inside dropdown component.
 */
const Menu: React.FC<HTMLAttributes<HTMLDivElement> & MenuProps> = ({
    placement,
    children,
    className,
    forceWidth,
    ...restProps
}) => {
    const { display, setDisplay } = useContext(DropdownContext);

    const position = (() => {
        switch (placement) {
            case "top-left-full":
                return "sm:left-full sm:bottom-full sm:mb-2";
            case "top-left":
                return "sm:left-0 sm:bottom-full sm:mb-2";
            case "top-right":
                return "sm:right-0 sm:bottom-full sm:mb-2";
            case "bottom-right":
                return "sm:top-full sm:right-0 sm:mt-2";
            case "bottom-left":
            default:
                return "sm:top-full sm:mt-2";
        }
    })();

    return (
        <div
            {...(forceWidth && { style: { width: "100%" } })}
            className={`${
                display
                    ? "max-h-dvh sm:border sm:border-jalin-blue-base"
                    : "max-h-0 max-sm:delay-500"
            } ${position} max-sm:top-0 max-sm:left-0 max-sm:fixed max-sm:z-max max-sm:w-screen max-sm:h-dvh sm:absolute sm:z-30 flex items-end overflow-hidden sm:shadow-md sm:overflow-hidden sm:rounded-semi`}
        >
            <div
                onClick={() => setDisplay(false)}
                className={`${
                    display ? "max-sm:opacity-100" : "max-sm:opacity-0"
                } ease-in transition-opacity duration-200 absolute left-0 top-0 max-sm:h-dvh max-sm:w-full sm:hidden z-0 bg-black/65`}
            />
            <div
                {...restProps}
                className={`${
                    display ? "max-h-dvh" : "max-h-0"
                } max-sm:duration-400 max-sm:ease-in max-sm:transition-max-height form__scrollbar flex flex-col z-1 relative max-sm:w-screen max-sm:rounded-t-3xl ${className} bg-white sm:max-h-[256px] overflow-x-hidden overflow-y-auto `}
            >
                {children}
            </div>
        </div>
    );
};

/**
 * [v2.0] - Mobile display for dropdown component.
 */
const MobileHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...restProps
}) => {
    const { setDisplay } = useContext(DropdownContext);

    return (
        <div
            {...restProps}
            className={`px-6 py-4 sm:hidden w-full flex justify-between font-bold text-jalin-blue-deep gap-4 text-xl/8 items-center ${className}`}
        >
            {children}
            <div
                onClick={() => {
                    setDisplay(false);
                }}
            >
                <i className="text-2xl/6 ri-close-line font-medium sm:hover:text-jalin-blue-deep sm:text-jalin-blue-base" />
            </div>
        </div>
    );
};

/**
 * [v2.0] - Selection item display component
 */
const Item: React.FC<HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    onClick,
    ...restProps
}) => {
    const { setDisplay } = useContext(DropdownContext);

    return (
        <div
            onClick={(e: any) => {
                e.stopPropagation();
                setDisplay(false);
                onClick?.(e);
            }}
            {...restProps}
            className={`cursor-pointer ${className}`}
        >
            {children}
        </div>
    );
};

export const Dropdown = Object.assign(DropdownComponent, {
    Toggle,
    Menu,
    MobileHeader,
    Item,
});
