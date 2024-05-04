import { useState, useEffect } from "react";

const Typewriter: React.FC<{ text: string, duration?: number }> = ({ text, duration }) => {
    const [typed, setTyped] = useState<string>("");

    useEffect(() => {
        setTyped("");
        const tId = window.setInterval(() => {
            setTyped(prev => {
                if (prev.length >= text.length) {
                    window.clearInterval(tId);
                    return prev;
                } else {
                    return text.slice(0, prev.length + 1);
                }
            })
        }, (duration ?? 3000) / text.length);

        return () => { window.clearInterval(tId) };
    }, [text]);

    return (
        <>
            {typed}{typed.length < text.length && "_"}
        </>
    )
}

export default Typewriter