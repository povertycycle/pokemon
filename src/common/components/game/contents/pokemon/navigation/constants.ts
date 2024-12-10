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
    { name: "Id (Ascending)", tag: OptionTag.ID_ASC },
    { name: "Id (Descending)", tag: OptionTag.ID_DESC },
    { name: "Name (Ascending)", tag: OptionTag.NAME_ASC },
    { name: "Name (Descending)", tag: OptionTag.NAME_DESC },
]