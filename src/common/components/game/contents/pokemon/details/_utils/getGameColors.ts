import { GAME_COLORS } from "../constants";

export function getGameColors(tag:string){let colors=GAME_COLORS[tag]??(()=>{let s=tag.split("-").filter(t=>t!=="and");let l=Math.floor(s.length/2);return [s.slice(0,l),s.slice(l)];})().reduce((acc: string[], t: string[])=>{return acc.concat(GAME_COLORS[t.join("-")]) },[]);return colors.length>1?`linear-gradient(90deg,${colors.join(',')})`:colors[0];} 