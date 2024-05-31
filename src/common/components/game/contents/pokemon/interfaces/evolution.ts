export type EvolutionMethod = {[key: string]: string | number | boolean}

export type EvolutionChain = {
    is_baby?: string,
    species_id: string,
    evolution_details?: EvolutionMethod[],
}