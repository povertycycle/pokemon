export interface PokeAPIDataMini {
    abilities: {
        ability: {
            name: string
            url: string
        }
        is_hidden: boolean
    }[];
    id: number;
    name: string;
    species: {
        name: string
        url: string
    };
    sprites: {
        front_default: string;
        other: {
            [otherSprites: string]: {
                [view: string]: string;
            }
        };
        versions: {
            [gen: string]: {
                [game: string]: {
                    [view: string]: string;
                }
            }
        }
    };
    stats: {
        base_stat: number
        effort: number
        stat: {
            name: string;
        };
    }[];
    types: {
        type: {
            name: string;
        }
    }[];
}

export interface PokeAPIData extends PokeAPIDataMini {
    cries: {
        latest: string;
    };
    base_experience: number;
    height: number;
    weight: number;
    moves: {
        move: {
            name: string;
            url: string;
        };
        version_group_details: {
            level_learned_at: number;
            move_learn_method: {
                name: string
                url: string
            };
            version_group: {
                name: string
                url: string
            };
        }[]
    }[],
    held_items: {
        item: {
            url: string;
        }
    }[]
}

export interface PokeAPISpecies {
    base_happiness: number;
    capture_rate: number;
    growth_rate: {
        name: string
    };
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
    }
    shape: {
        name: string;
    }
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    evolution_chain: {
        url: string
    }
    flavor_text_entries:  {
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

  
  