export type BerryData = {
    details?: BerryDetails | null;
    name: string;
}

export type BerryDetails = {
    itemId: number;
    firmness: string;
    flavors: { flavor: string, potency: number }[];
    growthTime: number;
    maxHarvest: number;
    naturalGift: {
        power: number;
        type: string;
    };
    size: number;
    smoothness: number;
    soilDryness: number;
}