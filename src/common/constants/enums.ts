export enum Tab {
    Moves = "Moves",
    Evolution = "Evolution",
    Machines = "Machines",
    Pokemon = "Pokemon",
    Calculator = "Calculator",
    Berries = "Berries",
    Items = "Items",
    Return = "Return",
}

export enum Stores {
    Pokemon = "pokemon",
    Validator = "validator",
    PokeDetails = "details",

    Items = "items",
    Moves = "moves",
    Ability = "ability",
    Evolution = "evolution",
    Berries = "berries",
}

export const STORE_KEYS: Record<Stores, string> = {
    [Stores.Pokemon]: "PkOq3NuqNXXxgpZZofHHlOc6JcDNKLne",
    [Stores.Validator]: "",
    [Stores.PokeDetails]: "",
    [Stores.Evolution]: "",
    [Stores.Ability]: "UZkSNmLIyTm7wN2kSb1TswAr6xaPUhNY",
    [Stores.Moves]: "ckFdN0Zi8q6ju12pL84bQZ9NWTceoRQE",
    [Stores.Items]: "Xk7dcBfI2GObBbxjApy5US3feJkwWN6V",
    [Stores.Berries]: ""
}