import { GAMES, VERSION_DATA } from "../constants/constants";

export function capitalize(s?: string | null) { return (s?.split(/[.,\/ -]/).map(t => (`${t.charAt(0).toUpperCase()}${t.slice(1).toLowerCase()}`)).join(" ") ?? "") }
export function trimUrl(url?: string) { return url?.split("/").slice(-2)[0] ?? "-1"; }
export function formatVersionName(game: string): string[] { return (GAMES[game] ?? [game]).map(t => VERSION_DATA[t]?.title ?? `Gen ${t.split("-")[1].toUpperCase()} Icon`); }