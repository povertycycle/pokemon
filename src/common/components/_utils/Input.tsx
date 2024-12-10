import { useDebouncedInput } from "@/common/hooks/useDebounce";
import { KeyboardEventHandler } from "react";

type InputProps = {
    onChangeHandler: (value: string) => void;
    placeholder?: string;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    clearButton?: boolean;
};

const Input: React.FC<InputProps> = ({ onChangeHandler, placeholder, onKeyDown, clearButton }) => {
    const { input, changeInput, clearInput } = useDebouncedInput(onChangeHandler);

    return (
        <div className="peer/input sm:min-w-[360px] w-full h-full relative bg-white rounded-[4px] sm:rounded-[6px] flex items-center z-[1]">
            <div className="absolute text-[1.125rem] left-3">
                <i className="ri-search-line font-bold" />
            </div>
            <input onKeyDown={onKeyDown} className="focus:outline-none pl-10 relative bg-transparent z-[1] h-full w-full text-[1.125rem] placeholder:tracking-[-0.5px] placeholder:text-[1.125rem]" value={input ?? ""} onChange={changeInput} placeholder={placeholder ?? "Search..."} />
            {clearButton && input && <div onClick={clearInput} className="flex items-center justify-center rounded-full bg-black text-white leading-5 cursor-pointer hover:scale-105 absolute z-[1] text-[1.25rem] right-2"><i className="ri-close-line" /></div>}
        </div>
    )
}

export default Input;