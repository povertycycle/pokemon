export type VersionDetails = {
    min_level: number,
    method: string,
    version: string
}

export type MoveVersions = {
    [moveId: string]: VersionDetails[]
}

export type MoveData = {
    damage_class: string,
    flavor_text: string,
    type: string,
    target: string,
    pp: number,
    priority: number,
    power?: number,
    accuracy?: number,
    effect?: string,
    machines?: { machine: string, version: string, }[],
    games?: string[]
}

export type PokeMove = { name: string, data: MoveData, pokemons: string[] }
