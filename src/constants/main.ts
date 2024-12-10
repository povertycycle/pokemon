import { Tab } from "./enums";

export const CACHE_PERMISSION_ID = "H2J9Rtp41OUPGHZtOrlvbAEXzTfExbn0";
export enum CACHE_STATUS {
    ALLOW = "true",
    PARTIAL = "partial",
}
export const DISABLE_CACHE_QUERY = "giZKYCXYmJtkl8mBRhJGtQe4FCZW8cvJ";
export enum QUERY_STATUS {
    DISABLED = "false",
    ENABLED = "true"
}
export const DESTINATION = "destination";
export const TAB_SELECTION = "tab";

export enum PageState {
    Main = 0,
    Database = 1,
    TCG = 2
}
export const DESTINATION_STATES: {[key: string]: PageState} = {
    "main": PageState.Main,
    "database": PageState.Database,
    "tcg": PageState.TCG,
}
export const TAB_STATES: {[key: string]: Tab} = {
    "pokemon": Tab.Pokemon,
    "moves": Tab.Moves,
    "evolution": Tab.Evolution,
    "machines": Tab.Machines,
    "calculator": Tab.Calculator,
    "berries": Tab.Berries,
    "items": Tab.Items,
    "return": Tab.Return,
}

export const MAX_REQUEST_AT_ONCE = 100;