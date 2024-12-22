export type MoveDataVersion = {
    [method: string]: string[];
}

export type MoveDataMini = {
    accuracy: number | null;
    pp: number;
    power: number | null;
    category: string;
    type: string;
    machines: Record<string, string>;
}

export type MoveData = {
    name: string;
    data: MoveDataMini;
}

export interface MoveInformation extends MoveData {
    info: MoveInformation | null;
}