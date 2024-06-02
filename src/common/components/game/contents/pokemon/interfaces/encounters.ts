export type Encounter = {
    chance: number,
    condition?: string[],
    level_range: string,
    method: string,
}

export type LocationEncounters = {
    [loc_id: string]: Encounter[]
}

export type EncounterData = {
    [version: string]: LocationEncounters
}