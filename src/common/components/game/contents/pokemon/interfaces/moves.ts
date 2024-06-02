export type VersionDetails = {
    min_level: number,
    method: string,
    version: string
}

export type MoveVersions = {
    [moveId: string]: VersionDetails[]
}

export type MoveData = {
    accuracy?: number,
    effect_chance?: number,
    pp: number,
    priority: number,
    power?: number,
    damage_class: string,
    effect?: string,
    short_effect?: string,
    flavor_text_entries?: {
        flavor_text: string,
        version: string,
    }[],
    machines: {
        id: string,
        item: {name: string, id: string}
        version: string,
    }[],    
    meta?: {
        [tag: string]: number | string
    },
    target: string,
    type: string
}