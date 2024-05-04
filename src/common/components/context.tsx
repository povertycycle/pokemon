import { Dispatch, SetStateAction, createContext } from "react";
import { PageState } from "./constants";

type PageContextProps = {
    section: PageState,
    setSection: Dispatch<SetStateAction<PageState>>
}

export const PageContext = createContext<PageContextProps>({
    section: PageState.Main,
    setSection: () => { }
})