export type SpeciesData = {
    base_happiness: number,
    capture_rate: number,
    growth_rate: string,
    egg_groups: string[],
    gender_rate: number,
    hatch_counter: number,
    genera: string,
    habitat?: string,
    flavor_text_entries: {version: string, text: string}[]
    shape?: string,
    varieties: string[]
    form_description: string[],
    forms_switchable: boolean,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    evolution_chain: string,
    pal_park_encounters: {area: string, base_score: number, rate: number}[],
    pokedex_numbers: {pokedex: string, entry_number: number}[],
}