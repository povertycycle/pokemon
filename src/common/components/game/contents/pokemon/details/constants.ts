import { SpeciesData } from "../interface";
import { Pokemon, SecondaryData } from "../interfaces/pokemon";

export type PokePayload = {
    main?: Pokemon | null,
    secondary?: SecondaryData | null;
    species?: SpeciesData | null;
}