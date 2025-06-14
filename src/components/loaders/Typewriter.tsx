import { useState, useEffect } from "react";

interface TypewriterProps {
    text?: string;
    duration?: number;
}

/**
 * Typewriting text animation
 * @param text String text
 * @param duration Optional duration
 */
export const Typewriter: React.FC<TypewriterProps> = ({
    text = "",
    duration,
}) => {
    const [typed, setTyped] = useState<string>("");

    useEffect(() => {
        const tId = window.setInterval(() => {
            setTyped((prev) => {
                if (prev.length >= text.length) {
                    window.clearInterval(tId);
                    return prev;
                } else {
                    return text.slice(0, prev.length + 1);
                }
            });
        }, (duration ?? 3000) / text.length);

        return () => {
            window.clearInterval(tId);
        };
    }, [text]);

    return (
        <>
            {typed}
            {typed.length < text.length && "_"}
        </>
    );
};
