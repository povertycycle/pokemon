import { createContext, Dispatch, SetStateAction } from "react";

type GenerationContextProps = {
    gen: string | null,
    setGen: Dispatch<SetStateAction<string | null>>
}

export const GenerationContext = createContext<GenerationContextProps>({
    gen: null,
    setGen: () => {}
})