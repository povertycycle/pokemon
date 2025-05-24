import { SyntheticEvent, useEffect, useRef, useState } from "react";

/**
 * Hook to process objects getting into viewports
 *
 * @param onIntoView Function to be run on into view
 * @param keep Optional parameter to keep handler
 *
 * @returns Target reference element
 */
export const useInView = ({
    onIntoView,
    keep,
}: {
    onIntoView: Function;
    keep?: boolean;
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntoView();
                if (!keep) {
                    observer.disconnect();
                }
            }
        });
        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return ref;
};

/**
 * Hook to debounce input
 *
 * @param callback Callback onChange
 * @param defaultValue Default value
 */
export const useDebouncedInput = (
    callback: (s: string) => void,
    defaultValue?: string | null
) => {
    const [input, setInput] = useState<string | null>(defaultValue ?? null);

    useEffect(() => {
        if (input === null) return;
        let tID: NodeJS.Timeout = setTimeout(() => {
            callback(input);
        }, 250);

        return () => {
            clearTimeout(tID);
        };
    }, [input]);

    const changeInput = (e: SyntheticEvent<HTMLInputElement>) => {
        setInput((e.target as HTMLInputElement).value);
    };

    const clearInput = () => {
        setInput(null);
        callback("");
    };

    return { input, changeInput, clearInput };
};

/**
 * [v2.0] - Hook to close component when clicked outside its boundary.
 * @param hide Close handler.
 */
export const useMenuBlur = (hide: () => void) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handler = (evt: MouseEvent) => {
            if (!!ref.current && !ref.current.contains(evt.target as Node)) {
                hide();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return ref;
};
