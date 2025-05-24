/**
 * Move interface
 */
export type IMove = {
    name: string;
    data?: {
        accuracy: number | null;
        category: string;
        effectEntry: string | null;
        flavorText: string | null;
        pokemons: number[];
        machines: Record<string, string>;
        power: number | null;
        pp: number;
        type: string;
    } | null;
};
