export interface PokeAPIMoveData {
    accuracy: number | null;
    damage_class: {
        name: string;
    };
    effect_entries: {
        effect: string;
        language: {
            name: string
        }
    }[];
    flavor_text_entries: {
        flavor_text: string
        language: {
            name: string;
        }
    }[];
    learned_by_pokemon: {
        name: string
        url: string
    }[];
    machines: {
        machine: {
            url: string;
        };
    }[];
    name: string;
    power: number;
    pp: number;
    priority: number;
    target: {
        name: string
    };
    type: {
        name: string;
    }
};

export type PokeAPIMachineData = {
    item: {
        name: string;
    }
    version_group: {
        name: string;
    }
}

