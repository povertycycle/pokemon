export interface PokeAPIBerry {
    firmness: {
        name: string;
    }
    flavors: {
        flavor: {
            name: string;
        }
        potency: number;
    }[];
    growth_time: number;
    item: {
        url: string;
    };
    max_harvest: number;
    natural_gift_power: number
    natural_gift_type: {
        name: string
    };
    size: number;
    smoothness: number;
    soil_dryness: number;
}
