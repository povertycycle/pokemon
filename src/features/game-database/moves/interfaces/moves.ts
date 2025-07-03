/**
 * Base pokemon response from indexed db
 */
export type MoveRequest = {
    id: number;
    name: string;
    data?: IMove;
};

export type MoveBase = {
    id: number;
    name: string;
    data: IMove;
};

/**
 * Move interface
 */
export type IMove = {
    accuracy: number | null;
    category: string;
    effectEntry: string | null;
    flavorText: string | null;
    pokemons: number[];
    machines: Record<string, string>;
    power: number | null;
    pp: number;
    type: string;
    versions: string[];
};
