export type EvolutionChain = {
    is_baby: boolean,
    species_id: string,
    evolution_details?: { trigger: string, min_level: number }[],
}