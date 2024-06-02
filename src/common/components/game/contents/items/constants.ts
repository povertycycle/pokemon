export type Item = {
    id: string,
    name: string,
}

export type ItemData = {
    attributes: string[]
    baby_trigger_for?: string,
    category: string,
    cost?: number,
    effect_entries: { effect: string, short_effect: string },
    flavor_text_entries: { text: string, version: string }[],
    fling_effect?: string,
    fling_power?: number,
    machines: {machine: string, version: string}[],
    name: string,
    names: {name: string, language: string}[],
    sprites?: string,
}