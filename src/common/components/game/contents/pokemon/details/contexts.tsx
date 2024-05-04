import { Dispatch, SetStateAction, createContext } from "react";
import { Pokemon } from "../interface";

type DetailsContextProps = {
    details: Pokemon | undefined | null,
    setDetails: Dispatch<SetStateAction<Pokemon | undefined | null>>
}

export const DetailsContext = createContext<DetailsContextProps>({
    details: null,
    setDetails: () => { }
})