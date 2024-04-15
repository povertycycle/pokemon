export const DISPLAY_ID = "Hd3WH54nB4fsopLZLi0UgAEdXLgOSKmR";
export const NAV_ID = "4eLO8HScAoEC6jpXQfGkq6RB5kyrQARI";
export const CONTAINER_ID = "Pvpkew5r1AM6tiDutcTI86CWYQGXFZFN";
export const FILTER_TYPE_COLORS: { [key: string]: string } = {
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
export enum OptionTag {
    NAME_ASC = 0,
    NAME_DESC = 1,
}
export type Option = {
    name: string,
    tag: OptionTag
}
export const OPTIONS: Option[] = [
    { name: "Name (Ascending)", tag: OptionTag.NAME_ASC },
    { name: "Name (Descending)", tag: OptionTag.NAME_DESC }
]
