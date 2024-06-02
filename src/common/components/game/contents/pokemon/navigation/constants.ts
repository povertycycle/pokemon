export enum OptionTag {
    NAME_ASC = 0,
    NAME_DESC = 1,
    ID_ASC = 2,
    ID_DESC = 3
}
export const COMPARATOR: { [key in OptionTag]: (a: Element, b: Element) => number } = {
    [OptionTag.NAME_ASC]: (a: Element, b: Element) => ((a.getAttribute("data-name") || "") > (b.getAttribute("data-name") || "") ? 1 : -1),
    [OptionTag.NAME_DESC]: (a: Element, b: Element) => ((a.getAttribute("data-name") || "") > (b.getAttribute("data-name") || "") ? -1 : 1),
    [OptionTag.ID_ASC]: (a: Element, b: Element) => (parseInt(a.getAttribute("data-index") || "") > parseInt(b.getAttribute("data-index") || "") ? 1 : -1),
    [OptionTag.ID_DESC]: (a: Element, b: Element) => (parseInt(a.getAttribute("data-index") || "") > parseInt(b.getAttribute("data-index") || "") ? -1 : 1)
}
export type Option = {
    name: string,
    tag: OptionTag
}
export const OPTIONS: Option[] = [
    { name: "Id (Ascending)", tag: OptionTag.ID_ASC },
    { name: "Id (Descending)", tag: OptionTag.ID_DESC },
    { name: "Name (Ascending)", tag: OptionTag.NAME_ASC },
    { name: "Name (Descending)", tag: OptionTag.NAME_DESC },
]