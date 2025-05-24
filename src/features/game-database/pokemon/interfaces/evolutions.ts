/**
 * Evolution data
 */
export type EvolutionData = {
    isBaby?: boolean;
    babyItemId?: number;
    pokemonId: number;
    conditions?: Record<string, string | number | boolean>[];
    evolutions?: EvolutionData[];
};
