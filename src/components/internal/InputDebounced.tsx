import { useDebouncedInput } from "@/utils/hooks";
import { KeyboardEvent, RefObject, useEffect, useRef } from "react";

type InputProps = {
    onChange: (value: string) => void;
    placeholder?: string;
    clearButton?: boolean;
    menu?: {
        ref: RefObject<HTMLElement | null>;
        show: () => void;
        hide: () => void;
    };
    defaultValue?: string | null;
};

export const InputDebounced: React.FC<InputProps> = ({
    onChange,
    placeholder,
    clearButton,
    menu,
    defaultValue,
}) => {
    const { input, changeInput, clearInput } = useDebouncedInput(
        onChange,
        defaultValue
    );
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                e.target !== ref.current &&
                !!menu?.ref?.current &&
                !menu.ref.current.contains(e.target as Node)
            ) {
                menu.hide();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
        }
    }

    return (
        <div className="peer/input w-full h-full relative bg-white rounded-semi flex items-center z-1">
            <div className="absolute text-lg left-2 sm:left-3">
                <i className="ri-search-line font-medium" />
            </div>
            <input
                ref={ref}
                onFocus={menu?.show}
                onKeyDown={onKeyDown}
                className="focus:outline-none pl-8 sm:pl-10 relative bg-transparent z-1 h-full w-full text-base placeholder:text-base"
                value={input ?? ""}
                onChange={changeInput}
                placeholder={placeholder ?? "Search..."}
            />
            {clearButton && input && (
                <div
                    onClick={clearInput}
                    className="flex items-center justify-center rounded-full bg-black text-white cursor-pointer hover:scale-105 absolute z-1 text-lg h-5 w-5 right-2"
                >
                    <i className="ri-close-line" />
                </div>
            )}
        </div>
    );
};
