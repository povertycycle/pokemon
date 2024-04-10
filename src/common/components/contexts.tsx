import { Dispatch, SetStateAction, createContext } from "react";
import { PageState } from "./types";

type PageContextProps = {
    section: PageState,
    setSection: Dispatch<SetStateAction<PageState>>
}

export const PageContext = createContext<PageContextProps>({
    section: PageState.Main,
    setSection: () => { }
})