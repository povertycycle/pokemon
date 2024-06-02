import { SpeciesData } from "../interface";
import { Pokemon, SecondaryData } from "../interfaces/pokemon";

export type PokePayload = {
    main?: Pokemon | null,
    secondary?: SecondaryData | null;
    species?: SpeciesData | null;
}

export const GAME_COLORS : {[key: string]: string[]} = {
    "red": ["#c43600"],
    "blue": ["#0079e1"],
    "yellow": ["#F1DC64", "#C6A909"],
    "gold": ["#967e2f"],
    "silver": ["#c0c0c0"],
    "crystal": ["#8683b8", "#09bed9"],
    "ruby": ["#ac3e1a"],
    "sapphire": ["#0646a8"],
    "emerald": ["#006e12","#88c33d"],
    "firered": ["#c43600"],
    "leafgreen": ["#006e12"],
    "diamond": ["#156e81"],
    "pearl": ["#e1d3e3"],
    "platinum": ["#c1c1c1","#422800"],
    "heartgold": ["#967e2f","#e2ad00"],
    "soulsilver": ["#c0c0c0", "#e3e3e3"],
    "black": ["#000000"],
    "white": ["#f0f0f0"],
    "colosseum": ["#c80000", "#800014"],
    "xd": ["#5b628f", "#2c2963"],
    "black-2": ["#000000", "#216171"],
    "white-2": ["#d08f19", "#f0f0f0"],
    "x": ["#0a377e", "#209598"],
    "y": ["#b81451", "#6f0c15"],
    "omega-ruby": ["#ffcf53", "#ac3e1a"],
    "alpha-sapphire": ["#0646a8", "#0becf9"],
    "sun": ["#d76902"],
    "moon": ["#004ca6"],
    "ultra-sun": ["#ffe187", "#d76902"],
    "ultra-moon": ["#004ca6", "#310081"],
    "lets-go-pikachu": ["#d6c416"],
    "lets-go-eevee": ["#c8932f"],
    "sword": ["#00549d"],
    "shield": ["#962900"],
    "the-isle-of-armor": ["#fce44d","#b39002"],
    "the-crown-tundra": ["#0fba67", "#058183"],
    "brilliant-diamond": ["#156e81", "#71c9db"],
    "shining-pearl": ["#a1a6fc", "#e1d3e3"],
    "legends-arceus": ["#0f81b9", "#83c29a"],
    "scarlet": ["#fa2e4e"],
    "violet": ["#7700bb"],
    "the-teal-mask": ["#00cbc1", "#00676f"],
    "the-indigo-disk": ["#4c9cc8", "#002978"],
    "home": ["#186646", "#33f1a3"],
    "dream_world": ["#810767", "#d62a95"],
    "showdown": ["#0176e3", "#183a5b"],
    "official-artwork": ["#e3e3e3", "#c7be3e 15%", "#c60000 85%", "#0a0069"],
}

export const VERSION_COLORS: { [key: string]: string[] } = {
    "iv": [...GAME_COLORS["diamond"], ...GAME_COLORS["heartgold"], ...GAME_COLORS["pearl"], ...GAME_COLORS["soulsilver"], ...GAME_COLORS["platinum"]],
    "vii": [...GAME_COLORS["sun"], ...GAME_COLORS["moon"], ...GAME_COLORS["ultra-sun"], ...GAME_COLORS["ultra-moon"], ...GAME_COLORS["lets-go-pikachu"], ...GAME_COLORS["lets-go-eevee"]],
    "viii": [...GAME_COLORS["sword"], ...GAME_COLORS["shield"], ...GAME_COLORS["the-isle-of-armor"], ...GAME_COLORS["the-crown-tundra"], ...GAME_COLORS["brilliant-diamond"], ...GAME_COLORS["shining-pearl"], ...GAME_COLORS["legends-arceus"]],
}

export enum Tab {
    Pokemon = "Pokemon",
    Items = "Items",
    Berries = "Berries",
    Moves = "Moves",
    Evolution = "Evolution",
    Machines = "Machines",


    X = "?????",
    Y = '???'
}
