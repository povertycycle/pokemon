import { useDebouncedInput } from "@/common/hooks/useDebounce";
import { KeyboardEvent, RefObject, useEffect, useRef } from "react";

type InputProps = {
    onChangeHandler: (value: string) => void;
    placeholder?: string;
    clearButton?: boolean;
    menu?: {
        ref: RefObject<HTMLElement | null>;
        show: () => void;
        hide: () => void;
    };
    defaultValue?: string | null;
};

const Input: React.FC<InputProps> = ({ onChangeHandler, placeholder, clearButton, menu, defaultValue }) => {
    const { input, changeInput, clearInput } = useDebouncedInput(onChangeHandler, defaultValue);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (e.target !== ref.current && !!menu?.ref?.current && !menu.ref.current.contains(e.target as Node)) {
                menu.hide();
            }
        }
        document.addEventListener('mousedown', handler);
        return () => { document.removeEventListener('mousedown', handler) }
    }, []);

    function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
        }
    }

    return (
        <div className="outline-1 outline-black outline peer/input sm:max-w-[400px] w-full h-full relative bg-white rounded-[4px] flex items-center z-1">
            <div className="absolute text-[1.125rem] left-3">
                <i className="ri-search-line font-bold" />
            </div>
            <input ref={ref} onFocus={menu?.show} onKeyDown={onKeyDown} className="focus:outline-none pl-10 relative bg-transparent z-1 h-full w-full text-[1.125rem] placeholder:tracking-[-0.5px] placeholder:text-[1.125rem]" value={input ?? ""} onChange={changeInput} placeholder={placeholder ?? "Search..."} />
            {clearButton && input && <div onClick={clearInput} className="flex items-center justify-center rounded-full bg-black text-white leading-5 cursor-pointer hover:scale-105 absolute z-1 text-[1.25rem] right-2"><i className="ri-close-line" /></div>}
        </div>
    )
}

export default Input;