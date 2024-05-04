import { ChangeEvent, useEffect, useState } from "react";

const Searchbar: React.FC<{ search: (pokemon: string) => void }> = ({ search }) => {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        const tID = setTimeout(() => {
            search(value);
        }, 250);

        return () => { window.clearTimeout(tID); }
    }, [value])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const clearSearch = () => {
        setValue("");
    }

    return (
        <div className="relative text-white flex items-center text-base w-full">
            <i className="ml-2 absolute ri-search-line leading-4" />
            <input value={value} className="w-full h-[28px] focus:border-black border-2 border-base-red-dark transition-colors rounded-[14px] bg-base-red-dark px-8" onChange={handleChange} />
            {value.length > 0 && <div className="cursor-pointer text-[0.875rem] h-[60%] aspect-square absolute border-black border right-[7px] bg-base-white rounded-full text-black flex items-center justify-center" onClick={clearSearch}><i className="ri-close-line" /></div>}
        </div>
    )
}

export default Searchbar;