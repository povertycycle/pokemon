
export type PokemonCard = {
    id: number;
    abilities: string[];
    name: string;
    index: number;
    mainSprites: {
        default: string;
        icon: string;
    };
    species: string;
    types: string[];
}

export type Stats = {
    [key: string]: {
        baseStat: number;
        effort: number;
    }
}

type PalParkEncounter = {
    area: string;
    base_score: number;
    rate: number;
}

export type Sprites = {
    others: {
        [key: string]: string;
    };
    versions: {
        [gen: string]: {
            [game: string]: string;
        }
    }
}

export interface PokemonDetails {
    speciesData: {
        genera?: string | null;
        habitat?: string | null;
        shape?: string | null;
        isBaby: boolean;
        isLegendary: boolean;
        isMythical: boolean;
        flavorText?: string | null;
    }
    evolutions: {
        chain: string;
        variants: string[];
        formDescription?: string | null;
        formSwitchable: boolean;
    }
    encounters: {
        palPark: PalParkEncounter[];
    }
    metaData: {
        cries: string;
        baseExperience: number;
        height: number;
        weight: number;
        details: {
            baseHappiness: number;
            captureRate: number;
            growthRate: string;
            eggGroups: string[];
            genderRate: number;
            hatchCounter: number;
        } | null;
    }
    heldItemIDs: string[];
    moves: {
        [name: string]: {
            [method: string]: string[];
        }
    };
    sprites: Sprites;
    stats: Stats;
}

export type PokemonData = PokemonCard & PokemonDetails;