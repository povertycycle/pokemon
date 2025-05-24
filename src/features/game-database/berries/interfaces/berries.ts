import { ItemData } from "../../items/interfaces/items";

/**
 * Base berry response from indexed db
 */
export type BerryRequest = {
    id: number;
    name: string;
    data?: BerryData;
};

/**
 * Complete berry response
 */
export type BerryBase = {
    id: number;
    name: string;
    data: BerryData;
};

export type BerryData = {
    itemId: number;
    firmness: string;
    flavors: { flavor: string; potency: number }[];
    growthTime: number;
    maxHarvest: number;
    naturalGift: {
        power: number;
        type: string;
    };
    size: number;
    smoothness: number;
    soilDryness: number;
};

export type BerryDetails = {
    berry: BerryData;
    item: ItemData;
};
