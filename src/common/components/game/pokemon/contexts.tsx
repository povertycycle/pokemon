import { createContext, Dispatch, SetStateAction } from "react";

type ContextProps = {
    pokemon: string | null;
    setPokemon: Dispatch<SetStateAction<string | null>>
}

export const DisplayContext = createContext<ContextProps>({
    pokemon: null,
    setPokemon: () => { }
})