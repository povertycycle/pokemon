import { SyntheticEvent, useEffect, useState } from "react";

const useDebouncedInput = (callback: (s: string) => void) => {
    const [input, setInput] = useState<string | null>(null);

    useEffect(() => {
        if (input === null) return;
        let tID: NodeJS.Timeout = setTimeout(() => {
            callback(input);
        }, 250);

        return () => { clearTimeout(tID); }
    }, [input]);

    const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
        setInput((e.target as HTMLInputElement).value);
    }

    const clearInput = () => {
        setInput(null);
        callback("");
    }

    return { input, changeInput, clearInput };
}

export { useDebouncedInput };

