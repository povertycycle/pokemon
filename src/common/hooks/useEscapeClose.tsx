import { useEffect } from "react";

export const useEscapeClose = (close: () => void) => {
    useEffect(() => {
        function escToClose(e: KeyboardEvent) {
            if (e.key === "Escape") {
                close();
            }
        }
        window.addEventListener('keydown', escToClose);

        return () => { window.removeEventListener('keydown', escToClose); };
    }, []);
}