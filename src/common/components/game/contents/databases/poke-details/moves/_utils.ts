import { MoveData, MoveDataMini } from "@/common/interfaces/move";

export type MoveId = {
    id: string;
    level?: number;
}

export type GroupedMoveSets = {
    [version: string]: {
        [method: string]: MoveId[];
    };
}

export type MoveIdData = MoveId & Partial<MoveData>