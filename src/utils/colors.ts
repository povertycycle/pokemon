import { prominent } from "color.js";

/**
 * Background color generator from pokemon sprite
 *
 * @param p Pokemon sprite url or element
 * @param amount Custom color.js amount
 * @param group Custom color.js group
 * @returns Array of [lighter, darker] colors
 */
export function generateBackground(
    p: string | HTMLImageElement,
    amount?: number,
    group?: number
): Promise<string[]> {
    return new Promise((rp) => {
        prominent(p, { amount: amount ?? 7, group: group ?? 33, format: "hex" })
            .then((c) => {
                let filter = (c as string[]).filter((color) => {
                    let l = Math.round(getLuma(color));
                    return l > 60 && l < 235 ? color : undefined;
                });
                if (filter.length < 2) {
                    filter = c as string[];
                }
                const sort = sortByHue(filter)
                    .reduce(
                        (
                            a: { tp: string[]; m: number },
                            c: string,
                            _,
                            nP: string[]
                        ) => {
                            nP.forEach((d: string) => {
                                if (c !== d) {
                                    const dE = Math.abs(
                                        getLuma(c) - getLuma(d)
                                    );
                                    if (a.m < dE) {
                                        a.m = dE;
                                        a.tp = [d, c];
                                    }
                                }
                            });
                            return a;
                        },
                        { tp: [], m: 0 }
                    )
                    .tp.sort((a: string, b: string) => getLuma(b) - getLuma(a));
                rp(sort);
            })
            .catch((err) => {
                rp(["#000000", "#000000"]);
            });
    });
}

/**
 * Luma calcualtor helper
 * @param c Color hex string
 * @returns Luma value
 */
function getLuma(c: string) {
    var rgb = parseInt(c.slice(c.indexOf("#") + 1, c.indexOf("#") + 7), 16);
    return (
        0.2126 * ((rgb >> 16) & 0xff) +
        0.7152 * ((rgb >> 8) & 0xff) +
        0.0722 * ((rgb >> 0) & 0xff)
    );
}

/**
 * Helper to sort colors by hues
 * @param s Color array
 * @returns Sorted array
 */
function sortByHue(s: string[]): string[] {
    function cc(c: string) {
        const x = c.replace(/#/g, "");
        const r = parseInt(x.substring(0, 2), 16) / 255;
        const g = parseInt(x.substring(2, 4), 16) / 255;
        const b = parseInt(x.substring(4, 6), 16) / 255;
        const z = Math.max.apply(Math, [r, g, b]);
        const y = Math.min.apply(Math, [r, g, b]);
        let o = z - y;
        let e = 0;
        let l = z;
        let t = 0;
        if (l > 0) {
            t = o / l;
            if (t > 0) {
                if (r === z) {
                    e = 60 * ((g - y - (b - y)) / o);
                    if (e < 0) {
                        e += 360;
                    }
                } else if (g === z) {
                    e = 120 + 60 * ((b - y - (r - y)) / o);
                } else if (b === z) {
                    e = 240 + 60 * ((r - y - (g - y)) / o);
                }
            }
        }
        return { hue: e, hex: c };
    }

    return s
        .map((c) => cc(c))
        .sort((a, b) => a.hue - b.hue)
        .map((c) => c.hex);
}

/**
 * Check if a color is dark via luma count
 */
export function isDark(c?: string) {
    return c ? getLuma(c) < 156 : false;
}
