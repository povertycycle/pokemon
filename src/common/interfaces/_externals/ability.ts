export interface PokeAPIAbilityData {
    effect_entries?: {
        effect: string;
        language: {
            name: string;
        }
        short_effect: string;
    }[] | null;
    flavor_text_entries?: {
        flavor_text: string;
        language: {
            name: string;
        }
    }[] | null
    id: number;
    pokemon: {
        is_hidden: boolean;
        pokemon: {
            url: string;
        };
    }[];
}
