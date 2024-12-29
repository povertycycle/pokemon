export type PokeAPIEncounters = {
    location_area: {
        name: string;
    }
    version_details: {
        encounter_details: {
            chance: number;
            condition_values: {
                name: string;
            }[]
            max_level: number;
            method: {
                name: string;
            }
            min_level: number;
        }[]
        version: {
            name: string;
        }
    }[]
}[];