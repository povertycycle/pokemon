export type Properties = {
    tag: string,
    color: string,
}

export const STATS_PROPERTIES: Record<string, Properties> = {
    "hp": {
        tag: "HP",
        color: "#FF0000",
    },
    "attack": {
        tag: "ATK",
        color: "#F08030",
    },
    "defense": {
        tag: "DEF",
        color: "#F8D030",
    },
    "special-attack": {
        tag: "SP-ATK",
        color: "#6890F0",
    },
    "special-defense": {
        tag: "SP-DEF",
        color: "#78C850",
    },
    "speed": {
        tag: "SPD",
        color: "#F85888",
    }
}