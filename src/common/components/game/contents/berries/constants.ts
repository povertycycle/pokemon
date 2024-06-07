export type BerryData = {
    firmness: string,
    flavors: { flavor: string, potency: number }[],
    growth_time: number,
    item: string,
    max_harvest: number,
    natural_gift: {
        power: number,
        type: string
    },
    size: number,
    smoothness: number,
    soil_dryness: number
}