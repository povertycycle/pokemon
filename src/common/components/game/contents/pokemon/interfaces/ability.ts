export type AbilityData = {
    flavor_text: string,
    not_main_series?: boolean,
    effect?: string,
}

export type AbilityDetails = {
    name: string,
    is_hidden: boolean,
    data: AbilityData
}
