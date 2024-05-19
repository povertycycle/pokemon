import { MoveDetailsType } from "./moves"
import { SpritesData } from "./sprites"

export type Stats = {
    [key: string]: {
        base_stat: number,
        effort: number,
    }
}

export type Pokemon = {
    abilities: string[],
    name: string,
    index: number,
    base_experience: number,
    cries: string,
    height: number,
    held_items: string[],
    main_sprite: string,
    moves: string[],
    species: string,
    stats: Stats,
    types: string[],
    weight: number
}

export type SecondaryData = {
    moveDetails: MoveDetailsType, 
    spritesData: SpritesData
}