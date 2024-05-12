export type Sprites = {
    [key: string]: string
}

export type GenSprites = {
    [gen: string]: Sprites
}

export type SpritesData = {
    others: Sprites,
    versions: GenSprites
}

