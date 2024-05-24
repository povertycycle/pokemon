export const NAV_WIDTH = 20;
export const DISPLAY_ID = "Hd3WH54nB4fsopLZLi0UgAEdXLgOSKmR";
export const NAV_ID = "4eLO8HScAoEC6jpXQfGkq6RB5kyrQARI";
export const CONTAINER_ID = "Pvpkew5r1AM6tiDutcTI86CWYQGXFZFN";
export const FILTER_TYPE_COLORS: { [key: string]: string } = {
    bug: "#91A119",
    dark: "#624D4E",
    dragon: "#5060E1",
    electric: "#FAC000",
    fairy: "#EF70EF",
    fighting: "#FF8000",
    fire: "#E62829",
    flying: "#81B9EF",
    ghost: "#704170",
    grass: "#3FA129",
    ground: "#915121",
    ice: "#3DCEF3",
    normal: "#9FA19F",
    rock: "#AFA981",
    steel: "#60A1B8",
    poison: "#9141CB",
    psychic: "#EF4179",
    water: "#2980EF",
}
export enum OptionTag {
    NAME_ASC = 0,
    NAME_DESC = 1,
    ID_ASC = 2,
    ID_DESC = 3
}
export type Option = {
    name: string,
    tag: OptionTag
}
export const OPTIONS: Option[] = [
    { name: "Name (Ascending)", tag: OptionTag.NAME_ASC },
    { name: "Name (Descending)", tag: OptionTag.NAME_DESC },
    { name: "Id (Ascending)", tag: OptionTag.ID_ASC },
    { name: "Id (Descending)", tag: OptionTag.ID_DESC },
]
export const COMPARATOR: { [key in OptionTag]: (a: Element, b: Element) => number } = {
    [OptionTag.NAME_ASC]: (a: Element, b: Element) => ((a.getAttribute("data-name") || "") > (b.getAttribute("data-name") || "") ? 1 : -1),
    [OptionTag.NAME_DESC]: (a: Element, b: Element) => ((a.getAttribute("data-name") || "") > (b.getAttribute("data-name") || "") ? -1 : 1),
    [OptionTag.ID_ASC]: (a: Element, b: Element) => (parseInt(a.getAttribute("data-index") || "") > parseInt(b.getAttribute("data-index") || "") ? 1 : -1),
    [OptionTag.ID_DESC]: (a: Element, b: Element) => (parseInt(a.getAttribute("data-index") || "") > parseInt(b.getAttribute("data-index") || "") ? -1 : 1)
}
export const VERSION_NAME: { [key: string]: string } = {
    "red-blue": "Red & Blue",
    "yellow": "Yellow",
    "gold-silver": "Gold & Silver",
    "crystal": "Crystal",
    "ruby-sapphire": "Ruby & Sapphire",
    "emerald": "Emerald",
    "firered-leafgreen": "FireRed & LeafGreen",
    "diamond-pearl": "Diamond & Pearl",
    "platinum": "Platinum",
    "heartgold-soulsilver": "HeartGold & SoulSilver",
    "black-white": "Black & White",
    "colosseum": "Colosseum",
    "xd": "XD: Gale of Darkness",
    "black-2-white-2": "Black 2 & White 2",
    "x-y": "X & Y",
    "omegaruby-alphasapphire": "Omega Ruby & Alpha Sapphire",
    "sun-moon": "Sun & Moon",
    "ultra-sun-ultra-moon": "Ultra Sun & Ultra Moon",
    "lets-go-pikachu-lets-go-eevee": "Let's Go Pikachu & Let's Go Eevee",
    "sword-shield": "Sword & Shield",
    "the-isle-of-armor": "The Isle of Armor",
    "the-crown-tundra": "The Crown Tundra",
    "brilliant-diamond-and-shining-pearl": "Brilliant Diamond & Shining Pearl",
    "legends-arceus": "Legends: Arceus",
    "scarlet-violet": "Scarlet & Violet",
    "the-teal-mask": "The Teal Mask",
    "the-indigo-disk": "The Indigo Disk",
    "dream_world": "Dream World",
    "home": "Pokemon: Home",
    "showdown": "Showdown",
    "official-artwork": "Official Artwork",
    "base_default": "Base Sprite",
    "icons": "Icons"
}