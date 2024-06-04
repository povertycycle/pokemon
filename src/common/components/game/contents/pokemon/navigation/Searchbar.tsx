import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

const Searchbar: React.FC<{ search: (pokemon: string) => void }> = ({ search }) => {
    const { handleChange, clearSearch, value } = useDebounce(search)

    return (
        <div className="relative text-white flex items-center text-base w-full">
            <i className="ml-2 absolute ri-search-line leading-4" />
            <input name="pokemon-name" value={value} className="input:-webkit-autofill w-full h-[28px] focus:border-black transition-colors rounded-[14px] bg-sp-def-dark px-8" onChange={handleChange} />
            {value.length > 0 && <div className="cursor-pointer text-[0.875rem] h-[60%] aspect-square absolute border-black border right-[7px] bg-base-white rounded-full text-black flex items-center justify-center" onClick={clearSearch}><i className="ri-close-line" /></div>}
        </div>
    )
}

export default Searchbar;