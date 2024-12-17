export type AbilityData = {
    pokemon: {
        id: string;
        isHidden: boolean;
    }[];
    data?: AbilityDataMini | null;
}

export type AbilityDataMini = {
    effectEntry: string | null;
    flavorText: string | null;
    id: number;
}

export type AbilityCard = AbilityDataMini & { isHidden: boolean; }