import { EncounterData, PalParkEncounter } from "./encounter";
import { MoveDataVersion } from "./move";

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

export type Sprites = {
    game: string;
    url: string | null;
};

export type Stats = {
    [key: string]: {
        baseStat: number;
        effort: number;
    }
}

export interface PokeMetaData {
    cries: string;
    baseExperience: number;
    height: number;
    weight: number;
    details: {
        baseHappiness: number;
        captureRate: number;
        growthRate?: string | null;
        eggGroups: string[];
        genderRate: number;
        hatchCounter: number;
    } | null;
}

export type PokeVariants = {
    chain: string;
    variants: string[];
    formDescription?: string | null;
    formSwitchable: boolean | null;
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
    evolutions: PokeVariants;
    encounters: {
        palPark: PalParkEncounter[];
        data?: EncounterData | null;
    }
    metaData: PokeMetaData;
    heldItemIDs: string[];
    moves: {
        [move: string]: MoveDataVersion;
    };
    sprites: Sprites[];
    stats: Stats;
}

export type PokemonData = PokemonCard & PokemonDetails;