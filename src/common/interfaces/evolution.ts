export type EvolutionData = {
    isBaby?: boolean,
    babyItemId?: string,
    pokemon: string,
    conditions?: Record<string, string | number | boolean>[];
    evolutions?: EvolutionData[];
}