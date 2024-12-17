import { capitalize } from "@/common/utils/string";
import { GAME_NAME } from "../../constants";

export function getGameName(tag: string) {
    return GAME_NAME[tag] ??
        (() => {
            let s = tag.split("-").filter(t => t !== "and");
            let l = Math.floor(s.length / 2);
            return l > 0 ? `${s.slice(0, l).map(t => capitalize(t)).join(" ")} & ${s.slice(l).map(t => capitalize(t)).join(" ")}` : capitalize(tag);
        })()
}