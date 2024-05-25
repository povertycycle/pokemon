export const baseCalc = (value: number, iv: number, ev: number) => {
    return Math.floor((2 * value) + iv + Math.floor(ev / 4));
}

export const calculateStats = (tag: string, stat: number, iv: number, ev: number, nature?: number) => {
    return (
        tag === "hp" || !nature ?
            baseCalc(stat, iv, ev) + 110 :
            Math.floor((baseCalc(stat, iv, ev) + 5) * nature)
    )
}