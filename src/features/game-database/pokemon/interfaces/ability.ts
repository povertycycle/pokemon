/**
 * Base Pokemon ability data
 */
export type PokeAbility = {
    id: number;
    isHidden: boolean;
};

/**
 * Pokemon ability details
 */
export type IAbility = {
    name: string;
    effectEntry: string | null;
    flavorText: string | null;
};
