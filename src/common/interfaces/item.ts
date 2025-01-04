export interface ItemDetails {
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
    }
    names: {
        language: string;
        name: string;
    }[];
    games: string[];
}

export interface ItemData {
    name: string;
    data: ItemDetails;
}
