import { ChangeEvent, useEffect, useState } from "react";

export const useDebounce = (search: (value: string) => void) => {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        const tID = setTimeout(() => {
            search(value);
        }, 350);

        return () => { window.clearTimeout(tID); }
    }, [value])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const clearSearch = () => {
        setValue("");
    }

    return { handleChange, clearSearch, value };
}