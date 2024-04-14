import { ChangeEvent, useEffect, useState } from "react";

const Searchbar: React.FC<{ searchPokemon: (pokemon: string) => void }> = ({ searchPokemon }) => {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        const tID = setTimeout(() => {
            searchPokemon(value);
        }, 200);

        return () => { window.clearTimeout(tID); }
    }, [value])

    const search = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <div className="relative text-white flex items-center">
            <i className="ml-4 absolute ri-search-line text-base leading-4" />
            <input className="w-full h-[36px] focus:outline-2 outline-black outline-offset-4 border-2 border-base-red-dark rounded-[18px] bg-base-red-dark px-10" onChange={search} />
        </div>
    )
}

export default Searchbar;