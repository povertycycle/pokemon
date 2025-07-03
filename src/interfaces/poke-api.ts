/**
 * Result data object type
 */
export type PokeAPIResultData = {
    name: string;
    url: string;
};

/**
 * Base request response without any parameters except offset and limit
 */
export interface PokeAPIResponse {
    count: number;
    next: string;
    previous: string;
    results: PokeAPIResultData[];
}

export interface PokeAPIData {
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
    }[];
    id: number;
    name: string;
    species: {
        name: string;
        url: string;
    };
    sprites: PokeAPIDataSprites;
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
        };
    }[];
    types: {
        type: {
            name: string;
        };
    }[];
    cries: {
        latest: string;
    };
    base_experience: number;
    height: number;
    weight: number;
    moves: PokeAPIDataMoves[];
    held_items: {
        item: {
            url: string;
        };
    }[];
}

/**
 * Poke API species data
 */
export interface PokeAPISpecies {
    base_happiness: number;
    capture_rate: number;
    growth_rate: {
        name: string;
    } | null;
    egg_groups: {
        name: string;
    }[];
    gender_rate: number;
    hatch_counter: number;
    genera: {
        genus: string;
        language: {
            name: string;
        };
    }[];
    habitat: {
        name: string;
    } | null;
    shape: {
        name: string;
    } | null;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    evolution_chain: {
        url: string;
    };
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        };
        version: {
            name: string;
        };
    }[];
    varieties: {
        pokemon: {
            url: string;
        };
    }[];
    form_descriptions: {
        description: string;
        language: {
            name: string;
        };
    }[];
    forms_switchable: boolean;
    pal_park_encounters: {
        area: {
            name: string;
        };
        base_score: number;
        rate: number;
    }[];
}

export type PokeAPIDataSprites = {
    front_default: string;
    other: {
        [otherSprites: string]: {
            [view: string]: string;
        };
    };
    versions: {
        [gen: string]: {
            [game: string]: {
                [view: string]: string;
            };
        };
    };
};

export type PokeAPIDataMoves = {
    move: {
        name: string;
        url: string;
    };
    version_group_details: {
        level_learned_at: number;
        move_learn_method: {
            name: string;
            url: string;
        };
        version_group: {
            name: string;
            url: string;
        };
    }[];
};

export interface PokeAPIAbilityData {
    names: {
        name: string;
        language: {
            name: string;
        };
    }[];
    effect_entries?:
        | {
              effect: string;
              language: {
                  name: string;
              };
              short_effect: string;
          }[]
        | null;
    flavor_text_entries?:
        | {
              flavor_text: string;
              language: {
                  name: string;
              };
          }[]
        | null;
}

/**
 * Poke API evolution chain nested data
 */
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
};

type Data = { name: string; url: string };

export interface PokeAPIEvolutionDetails {
    gender: number | null;
    held_item: Data | null;
    item: Data | null;
    known_move: Data | null;
    known_move_type: Data | null;
    location: Data | null;
    min_affection: number | null;
    min_beauty: number | null;
    min_happiness: number | null;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: Data | null;
    party_type: Data | null;
    relative_physical_stats: number | null;
    time_of_day: string;
    trade_species: Data | null;
    trigger: Data;
    turn_upside_down: boolean;
}

export interface PokeAPIMoveData {
    accuracy: number | null;
    damage_class: {
        name: string;
    };
    effect_entries: {
        effect: string;
        language: {
            name: string;
        };
    }[];
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
        };
        version_group: {
            name: string;
        };
    }[];
    learned_by_pokemon: {
        name: string;
        url: string;
    }[];
    machines: {
        machine: {
            url: string;
        };
    }[];
    name: string;
    power: number;
    pp: number;
    type: {
        name: string;
    };
}

export type PokeAPIMachineData = {
    item: {
        name: string;
    };
    version_group: {
        name: string;
    };
};

export interface PokeAPIEncounters {
    location_area: {
        name: string;
    };
    version_details: {
        encounter_details: {
            chance: number;
            condition_values: {
                name: string;
            }[];
            max_level: number;
            method: {
                name: string;
            };
            min_level: number;
        }[];
        version: {
            name: string;
        };
    }[];
}

export interface PokeAPIBerry {
    firmness: {
        name: string;
    };
    flavors: {
        flavor: {
            name: string;
        };
        potency: number;
    }[];
    growth_time: number;
    item: {
        url: string;
    };
    max_harvest: number;
    natural_gift_power: number;
    natural_gift_type: {
        name: string;
    };
    size: number;
    smoothness: number;
    soil_dryness: number;
}

export interface PokeAPIItemData {
    attributes: {
        name: string;
    }[];
    category: {
        name: string;
    } | null;
    cost: number | null;
    effect_entries: {
        effect: string;
        language: {
            name: string;
        };
    }[];
    flavor_text_entries: {
        language: {
            name: string;
        };
        text: string;
        version_group: {
            name: string;
        };
    }[];
    fling_effect: {
        name: string;
    } | null;
    fling_power: number | null;
    id: number;
    name: string;
    names: {
        language: {
            name: string;
        };
        name: string;
    }[];
    sprites: {
        default: string | null;
    };
}
