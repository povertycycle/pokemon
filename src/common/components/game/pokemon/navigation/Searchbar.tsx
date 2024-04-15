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
        <div className="relative text-white flex items-center text-[1.125rem] w-full">
            <i className="ml-4 absolute ri-search-line leading-4" />
            <input value={value} className="w-full h-[32px] focus:outline-2 outline-black outline-offset-4 rounded-[18px] bg-base-red-dark px-12" onChange={handleChange} />
            {value.length > 0 && <div className="cursor-pointer text-[0.875rem] h-[60%] aspect-square absolute border-black border right-[7px] bg-base-white rounded-full text-black flex items-center justify-center" onClick={clearSearch}><i className="ri-close-line" /></div>}
        </div>
    )
}

export default Searchbar;