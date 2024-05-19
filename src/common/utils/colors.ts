import { prominent } from "color.js";

export function getLuma(c:string){var rgb=parseInt(c.slice(c.indexOf("#")+1,c.indexOf("#")+7),16);return(0.2126*((rgb>>16)&0xff)+0.7152*((rgb>>8)&0xff)+0.0722*((rgb>>0)&0xff));}
export function isDark(c?:string){return c?getLuma(c)<156:false;}
export function getColorBetween(a:string,b:string){const p=(color: any)=>parseInt(color,16);const d=[p(b.slice(1,3)),p(b.slice(3, 5)),p(b.slice(5))];return `#${[p(a.slice(1,3)),p(a.slice(3, 5)),p(a.slice(5))].map((l,i)=>Math.round(l+(d[i]-l)*0.5)).map(l=>l.toString(16).padStart(2,'0')).join('')}`;}
function cc(c:string){const x=c.replace(/#/g,'');const r=parseInt(x.substring(0,2),16)/255;const g=parseInt(x.substring(2,4),16)/255;const b=parseInt(x.substring(4,6),16)/255;const z=Math.max.apply(Math,[r,g,b]);const y=Math.min.apply(Math,[r,g,b]);let o=z-y;let e=0;let l=z;let t=0;if(l>0){t=o/l;if(t>0){if(r===z){e=60*((g-y-(b-y))/o);if(e<0){e+=360;};}else if(g===z){e=120+60*((b-y-(r-y))/o);}else if(b===z){e=240+60*((r-y-(g-y))/o);}}}return {"hue":e,"hex":c};};
export function sortByHue(s:string[]):string[]{return s.map(c=>cc(c)).sort((a,b)=>(a.hue-b.hue)).map(c=>c.hex);};





export function generateBackground(sprite: string): Promise<string[]> {
    return new Promise(result => {
        prominent(sprite, { amount: 7, group: 15, format: "hex" }).then(color => {
            const newPalette = sortByHue((color as string[]).filter(c => {
                const luma = getLuma(c);
                return (luma % 1 !== 0 || luma > 60) && luma < 245
            })).reduce((acc: { twoPalette: string[], max: number }, color: string, _, nP: string[]) => {
                nP.forEach((color2: string) => {
                    if (color !== color2) {
                        const dE = Math.abs(getLuma(color) - getLuma(color2));
                        if (acc.max < dE) {
                            acc.max = dE;
                            acc.twoPalette = [color2, color];
                        }
                    }
                })
                return acc;
            }, { twoPalette: [], max: 0 }).twoPalette.sort((a: string, b: string) => (getLuma(a) - getLuma(b)));
            result(newPalette.length === 0 ? ["#000000"] : newPalette);
        })
    })
}