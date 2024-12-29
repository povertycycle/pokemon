import { prominent } from "color.js";
import { GAMES, VERSION_DATA, VERSION_GROUP_GAMES } from "../constants/constants";

export function getLuma(c: string) { var rgb = parseInt(c.slice(c.indexOf("#") + 1, c.indexOf("#") + 7), 16); return (0.2126 * ((rgb >> 16) & 0xff) + 0.7152 * ((rgb >> 8) & 0xff) + 0.0722 * ((rgb >> 0) & 0xff)); }
export function isDark(c?: string) { return c ? getLuma(c) < 156 : false; }
export function getColorBetween(a: string, b: string) { const p = (color: any) => parseInt(color, 16); const d = [p(b.slice(1, 3)), p(b.slice(3, 5)), p(b.slice(5))]; return `#${[p(a.slice(1, 3)), p(a.slice(3, 5)), p(a.slice(5))].map((l, i) => Math.round(l + (d[i] - l) * 0.5)).map(l => l.toString(16).padStart(2, '0')).join('')}`; }
function cc(c: string) { const x = c.replace(/#/g, ''); const r = parseInt(x.substring(0, 2), 16) / 255; const g = parseInt(x.substring(2, 4), 16) / 255; const b = parseInt(x.substring(4, 6), 16) / 255; const z = Math.max.apply(Math, [r, g, b]); const y = Math.min.apply(Math, [r, g, b]); let o = z - y; let e = 0; let l = z; let t = 0; if (l > 0) { t = o / l; if (t > 0) { if (r === z) { e = 60 * ((g - y - (b - y)) / o); if (e < 0) { e += 360; }; } else if (g === z) { e = 120 + 60 * ((b - y - (r - y)) / o); } else if (b === z) { e = 240 + 60 * ((r - y - (g - y)) / o); } } } return { "hue": e, "hex": c }; };
export function sortByHue(s: string[]): string[] { return s.map(c => cc(c)).sort((a, b) => (a.hue - b.hue)).map(c => c.hex); };
export function generateBackground(p: string | HTMLImageElement, amount?: number, group?: number): Promise<string[]> {
    return new Promise((rp) => {
        prominent(p, { amount: (amount ?? 7), group: (group ?? 33), format: "hex" })
            .then(c => {
                const filter = (c as string[]).filter(
                    color => {
                        let l = Math.round(getLuma(color));
                        return (l > 75 && l < 230) ? color : undefined;
                    }
                )
                const sort = sortByHue(filter).reduce(
                    (a: { tp: string[], m: number }, c: string, _, nP: string[]) => {
                        nP.forEach((d: string) => {
                            if (c !== d) {
                                const dE = Math.abs(getLuma(c) - getLuma(d));
                                if (a.m < dE) {
                                    a.m = dE; a.tp = [d, c];
                                }
                            }
                        });
                        return a;
                    }, { tp: [], m: 0 }).tp.sort(
                        (a: string, b: string) =>
                            (getLuma(b) - getLuma(a))
                    );
                rp(sort)
            })
            .catch(err => { rp(["#000000", "#000000"]) })
    })
};
export function getVersionColors(version: string): string[] {
    return (GAMES[version] ?? VERSION_GROUP_GAMES[version] ?? [version]).reduce((acc, g) => {
        return [...acc, ...VERSION_DATA[g].colors]
    }, [] as string[]);
}


