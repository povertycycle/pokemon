import { useEffect, useRef } from "react";

const useInView = ({ onIntoView, keep }: { onIntoView: Function, keep?: boolean }) => {
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

        return () => { observer.disconnect(); };
    }, []);

    return { ref };
}

export { useInView };

