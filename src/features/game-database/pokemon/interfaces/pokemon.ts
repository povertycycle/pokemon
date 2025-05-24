import { PokeAbility } from "./ability";

/**
 * Base pokemon response from indexed db
 */
export type PokeRequest = {
    id: number;
    name: string;
    data?: PokeData;
};

/**
 * Base pokemon data
 */
export type PokemonBase = {
    id: number;
    name: string;
    data: PokeData;
};

/**
 * Pokemon data from PokeAPI
 */
export type PokeData = {
    abilities: PokeAbility[];
    metaData: PokeMetaData;
    index: number;
    species: string;
    types: string[];
    stats: IStats;
    // Can be optimized further...
    heldItems: number[];
    moves: IMoves;
    sprites: Sprites[];
};

/**
 * Pokemon meta data details with extra from species API
 */
export type PokeMetaData = {
    cries: string;
    baseExperience: number;
    height: number;
    weight: number;
};

/**
 * Pokemon stats data
 */
export type IStats = {
    [key: string]: {
        baseStat: number;
        effort: number;
    };
};

/**
 * Pokemon sprites data
 */
export type Sprites = {
    game: string;
    url: string | null;
};

/**
 * Pokemon moves data
 */
export type IMoves = {
    [version: string]: {
        [method: string]: (string | number)[];
    };
};

/**
 * Pokemon full detailed data
 */
export interface PokemonDetails {
    metaData: PokeDetailsData;
    species: PokeSpecies;
    evolutions: PokeVariants;
    encounters: {
        palPark: PalParkEncounter[];
        data?: EncounterData | null;
    };
}

export type PokeDetailsData = {
    baseHappiness: number;
    captureRate: number;
    growthRate?: string | null;
    eggGroups: string[];
    genderRate: number;
    hatchCounter: number;
};

/**
 * Pokemon species data
 */
export type PokeSpecies = {
    genus?: string | null;
    habitat?: string | null;
    shape?: string | null;
    isBaby: boolean;
    isLegendary: boolean;
    isMythical: boolean;
    flavorText?: string | null;
};

/**
 * Pokemon variants data
 */
export type PokeVariants = {
    chain: number;
    variants: number[];
    formDescription?: string | null;
    formSwitchable: boolean | null;
};

/**
 * Palpark encounter data
 */
export type PalParkEncounter = {
    area: string;
    base_score: number;
    rate: number;
};

/**
 * Encounter data
 */
export type IEncounters = {
    [method: string]: {
        level: string;
        chance: number;
        conditions?: string[];
    };
};

export type EncounterData = {
    [version: string]: {
        [area: string]: IEncounters;
    };
};

export interface PokemonData extends PokemonBase {
    details: PokemonDetails;
}
