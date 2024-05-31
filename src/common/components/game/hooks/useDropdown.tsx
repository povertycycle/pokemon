import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [menu, setMenu] = useState<boolean>(false);

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setMenu(false);
            }
        }

        document.addEventListener('mousedown', handler);
        return () => { document.removeEventListener('mousedown', handler) }
    }, []);

    const toggle = () => {
        setMenu(prev => !prev);
    }

    const closeMenu = () => {
        setMenu(false);
    }

    return { menu, toggle, closeMenu, ref }
}