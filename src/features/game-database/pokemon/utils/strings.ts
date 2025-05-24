/**
 * Get identifiers
 * @param name Pokemon name
 * @param species Pokemon species
 */
export function getIdentifiers(name: string, species: string) {
    return name?.replace(species, "").replaceAll("-", " ");
}
