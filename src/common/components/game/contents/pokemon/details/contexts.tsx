import { createContext } from "react";
import { Pokemon } from "../interfaces/pokemon";

type DetailsContextProps = {
    details: Pokemon | undefined | null,
    palette: string[],
}

export const DetailsContext = createContext<DetailsContextProps>({
    details: null,
    palette: ["#000000"],
})