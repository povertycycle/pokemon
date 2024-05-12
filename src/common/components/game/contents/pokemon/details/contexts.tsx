import { Dispatch, SetStateAction, createContext } from "react";
import { Pokemon } from "../interfaces/pokemon";

type DetailsContextProps = {
    details: Pokemon | undefined | null,
    setDetails: Dispatch<SetStateAction<Pokemon | undefined | null>>,
    palette: string[],
}

export const DetailsContext = createContext<DetailsContextProps>({
    details: null,
    setDetails: () => { },
    palette: ["#000000"],
})