/**
 * Base pokemon response from indexed db
 */
export type ItemRequest = {
    id: number;
    name: string;
    data?: ItemData;
};

export type ItemBase = {
    id: number;
    name: string;
    data: ItemData;
};

export type ItemData = {
    attributes: string[];
    category: string | null;
    cost: number | null;
    descriptions: {
        effect: string;
        flavorText: string;
    };
    fling: {
        effect: string | null;
        power: number | null;
    };
    names: {
        language: string;
        name: string;
    }[];
    games: string[];
    sprite: string | null;
};
