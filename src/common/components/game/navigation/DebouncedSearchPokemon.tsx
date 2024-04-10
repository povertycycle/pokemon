import { FormEvent, useEffect, useState } from "react";

const DebouncedSearchPokemon: React.FC = () => {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        const tID = window.setTimeout(() => {
            console.log("Searching for ", value, "...")
        }, 500)
        return () => {
            window.clearTimeout(tID);
        }
    }, [value]);

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    return (
        <input className="" value={value} onChange={handleChange} />
    )
}

export default DebouncedSearchPokemon;