import { PokemonData } from "@/common/interfaces/pokemon";
import { createContext } from "react";

type DetailsContextProps = {
    details: PokemonData | undefined | null,
    palette: string[],
    colors: string[],
}

export const DetailsContext = createContext<DetailsContextProps>({
    details: null,
    palette: ["#F0F0F0", "#000000"],
    colors: ["#000000", "#F0F0F0"]
})