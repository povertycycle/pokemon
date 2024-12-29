export type PalParkEncounter = {
    area: string;
    base_score: number;
    rate: number;
}

export type Encounter = {
    method: string;
    levelRange: string;
    totalChance: number;
    conditions?: string[];
}

export type EncounterData = Record<string, Record<string, Encounter[]>>