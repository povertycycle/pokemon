import { useEffect, useRef } from "react";

const useInView = ({ onIntoView, once }: { onIntoView: Function, once?: boolean }) => {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntoView();
                if (once) {
                    observer.disconnect();
                }
            }
        });
        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => { observer.disconnect(); };
    }, [ref]);

    return { ref };
}

export { useInView };

