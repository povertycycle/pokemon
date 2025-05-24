/**
 * IndexedDB stores
 */
export enum Stores {
    Pokemon = "pokemon",
    Validator = "validator",
    PokeDetails = "details",
    Berries = "berries",

    // Unimplemented
    Items = "items",
    Moves = "moves",
    Ability = "ability",
    Evolution = "evolution",
}

/**
 * Random generated store keys for validations
 */
export const STORE_KEYS: Record<Stores, string> = {
    [Stores.Pokemon]: "PkOq3NuqNXXxgpZZofHHlOc6JcDNKLne",
    [Stores.Ability]: "UZkSNmLIyTm7wN2kSb1TswAr6xaPUhNY",
    [Stores.Moves]: "ckFdN0Zi8q6ju12pL84bQZ9NWTceoRQE",
    [Stores.Items]: "Xk7dcBfI2GObBbxjApy5US3feJkwWN6V",
    [Stores.Berries]: "sADBUIm9oKqpYmXVVGeIWuNaCbgXAuWv",

    // Unimplemented
    [Stores.Validator]: "",
    [Stores.PokeDetails]: "",
    [Stores.Evolution]: "",
}

/**
 * Main app page states
 */
export enum PageState {
    Main = 'main',
    Game = 'game',
    TCG = 'tcg',
}