import { createContext } from "react";

export const PaletteContext = createContext<{ palette: string[]; text: string[] }>({ palette: [], text: [] });