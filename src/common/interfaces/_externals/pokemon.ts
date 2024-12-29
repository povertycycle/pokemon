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