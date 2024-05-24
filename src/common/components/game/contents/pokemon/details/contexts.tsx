import { createContext } from "react";
import { Pokemon } from "../interfaces/pokemon";

type DetailsContextProps = {
    details: Pokemon | undefined | null,
    palette: string[],
    colors: string[],
}

export const DetailsContext = createContext<DetailsContextProps>({
    details: null,
    palette: ["#F0F0F0", "#000000"],
    colors: ["#000000", "#F0F0F0"]
})