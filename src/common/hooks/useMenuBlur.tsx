import { RefObject, useEffect } from "react";

const useMenuBlur = (refs: RefObject<HTMLElement | null>[], close: (e?: any) => void) => {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!refs.find(r => (r.current && r.current.contains(e.target as Node)))) {
                close(e);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => { document.removeEventListener('mousedown', handler) }
    }, []);
}

export { useMenuBlur };
