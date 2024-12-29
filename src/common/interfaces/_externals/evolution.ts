export interface PokeAPIEvolutionChain {
    baby_trigger_item: {
        url: string;
    } | null;
    chain: PokeAPIEvolution;
}

export type PokeAPIEvolution = {
    is_baby: boolean;
    species: {
        url: string;
    };
    evolution_details: PokeAPIEvolutionDetails[];
    evolves_to: PokeAPIEvolution[];
}

type Data = { name: string; url: string; }

export type PokeAPIEvolutionDetails = {
    gender: number | null;
    held_item: Data | null;
    item: Data | null
    known_move: Data | null;
    known_move_type: Data | null;
    location: Data | null;
    min_affection: number | null;
    min_beauty: number | null;
    min_happiness: number | null;
    min_level: number | null;
    needs_overworld_rain: boolean
    party_species: Data | null;
    party_type: Data | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: Data | null;
    trigger: Data
    turn_upside_down: boolean;
}