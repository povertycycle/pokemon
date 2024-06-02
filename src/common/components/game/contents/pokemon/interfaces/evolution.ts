export type EvolutionMethod = {[key: string]: string | number | boolean}

export type EvolutionChain = {
    is_baby?: string,
    species: string,
    evolution_details?: EvolutionMethod[],
}