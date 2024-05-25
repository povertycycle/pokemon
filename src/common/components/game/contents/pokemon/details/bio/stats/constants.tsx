export type Properties = {
    tag: string,
    colors: [string, string, string],
}

export const MIN_IV = 0;
export const MAX_IV = 31;
export const MIN_EV = 0;
export const MAX_EV = 255;
export const GOOD_NATURE = 1.1;
export const BAD_NATURE = 0.9;
export const STATS_PROPERTIES: { [key: string]: Properties } = {
    "hp": {
        tag: "HP",
        colors: ["#A60000", "#D30000", "#FF0000"],
    },
    "attack": {
        tag: "ATK",
        colors: ["#9C531F", "#C66A28", "#F08030"],
    },
    "defense": {
        tag: "DEF",
        colors: ["#A1871F", "#CDAC28", "#F8D030"],
    },
    "special-attack": {
        tag: "SP-ATK",
        colors: ["#445E9C", "#5677C6", "#6890F0"],
    },
    "special-defense": {
        tag: "SP-DEF",
        colors: ["#4E8234", "#63A542", "#78C850"],
    },
    "speed": {
        tag: "SPD",
        colors: ["#A13959", "#CD4971", "#F85888"],
    }
}