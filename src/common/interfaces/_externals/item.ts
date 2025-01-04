export interface PokeAPIItemData {
    attributes: {
        name: string;
    }[];
    category: {
        name: string;
    } | null;
    cost: number | null;
    effect_entries: {
        effect: string;
        language: {
            name: string;
        }
    }[];
    flavor_text_entries: {
        language: {
            name: string;
        }
        text: string;
        version_group: {
            name: string;
        }
    }[];
    fling_effect: {
        name: string;
    } | null;
    fling_power: number | null;
    id: number;
    name: string;
    names: {
        language: {
            name: string;
        }
        name: string;
    }[];
};
