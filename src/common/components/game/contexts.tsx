import { Tab } from "@/constants/enums";
import { Dispatch, SetStateAction, createContext } from "react";

type DatabaseContextProps = {
    tab: Tab | null,
    setTab: Dispatch<SetStateAction<Tab | null>>,
}

export const DatabaseContext = createContext<DatabaseContextProps>({
    tab: null,
    setTab: () => { }
})