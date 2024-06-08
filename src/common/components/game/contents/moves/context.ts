import { createContext, Dispatch, SetStateAction } from "react";

type GameContextProps = {
    game: string | null,
    setGame: Dispatch<SetStateAction<string | null>>
}

export const GameContext = createContext<GameContextProps>({
    game: null,
    setGame: () => {}
})