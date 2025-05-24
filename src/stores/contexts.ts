import { createContext } from "react";

/**
 * Palette context propagating styling
 */
export const PaletteContext = createContext<{
    dark: {
        background: string;
        color: string;
    };
    light: {
        background: string;
        color: string;
    };
}>({
    dark: { background: "", color: "" },
    light: { background: "", color: "" },
});
