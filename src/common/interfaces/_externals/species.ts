export interface PokeAPISpecies {
    base_happiness: number;
    capture_rate: number;
    growth_rate: {
        name: string
    } | null;
    egg_groups: {
        name: string;
    }[];
    gender_rate: number;
    hatch_counter: number;
    genera: {
        genus: string
        language: {
            name: string;
        }
    }[];
    habitat: {
        name: string;
    } | null;
    shape: {
        name: string;
    } | null
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    evolution_chain: {
        url: string
    }
    flavor_text_entries: {
        flavor_text: string
        language: {
            name: string;
        }
        version: {
            name: string;
        }
    }[];
    varieties: {
        pokemon: {
            url: string
        }
    }[]
    form_descriptions: {
        description: string;
        language: {
            name: string;
        }
    }[];
    forms_switchable: boolean;
    pal_park_encounters: {
        area: {
            name: string;
        }
        base_score: number;
        rate: number;
    }[];
}