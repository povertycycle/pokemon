import { Tab } from "./enums";

export const TAB_COLORS: { [key in Tab]: string } = {
    [Tab.Pokemon]: "#4E8234",
    [Tab.Items]: "#4b0478",
    [Tab.Berries]: "#445E9C",
    [Tab.Moves]: "#A60000",
    [Tab.Evolution]: "#9C531F",
    [Tab.Machines]: "#A1871F",
    [Tab.Calculator]: "#04818a",
    [Tab.Return]: "#A13959",
}

export const TYPE_COLORS: Record<string, string> = {
    bug: "#91A119",
    dark: "#624D4E",
    dragon: "#5060E1",
    electric: "#FAC000",
    fairy: "#EF70EF",
    fighting: "#FF8000",
    fire: "#E62829",
    flying: "#81B9EF",
    ghost: "#704170",
    grass: "#3FA129",
    ground: "#915121",
    ice: "#3DCEF3",
    normal: "#9FA19F",
    rock: "#AFA981",
    steel: "#60A1B8",
    poison: "#9141CB",
    psychic: "#EF4179",
    water: "#2980EF",
}

export const CATEGORY_COLORS: Record<string, string> = {
    "physical": "#EB5628",
    "special": "#375AB2",
    "status": "#828282"
}