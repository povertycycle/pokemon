export type EvolutionChain = {
    is_baby: boolean,
    species_id: string,
    evolution_details?: { 
        trigger: string, 
        min_level: number | null, 
        min_happiness: number | null,
        item?: string,
        held_item?: string,
        gender: number | null,
    }[],
}