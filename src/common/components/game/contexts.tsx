import { Dispatch, SetStateAction, createContext } from "react";
import { Tab } from "./navigation/Navigator";

type DatabaseContextProps = {
    tab: Tab | null,
    setTab: Dispatch<SetStateAction<Tab | null>>,
}

export const DatabaseContext = createContext<DatabaseContextProps>({
    tab: null,
    setTab: () => { }
})