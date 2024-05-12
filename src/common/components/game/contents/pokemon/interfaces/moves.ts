export type LevelMethodVersion = {
    levelLearned: number,
    method: string,
    version: string,
}

export type MoveDetailsType = {
    [moveName: string]: LevelMethodVersion[]
}

export type MoveData = {
    accuracy: number,
    damage_class: string,
    effect_chance: number | null,
    effect_entries: {
        effect: string,
        short_effect: string,
    } | null,
    flavor_text_entries: {
        flavor_text: string,
        version: string,
    }[],
    meta: {
        ailment: string,
        ailment_chance: number,
        category: string,
        crit_rate: number,
        drain: number,
        flinch_chance: number,
        healing: number,
        max_hits: number | null,
        max_turns: number | null,
        min_hits: number | null,
        min_turns: number | null,
        stat_chance: number
    } | null,
    generation: string,
    id: number,
    power: number | null,
    pp: number,
    priority: number,
    target: string,
    type: string
}