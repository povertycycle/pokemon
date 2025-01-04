import { BerryDetails } from "@/common/interfaces/berry";
import { ItemData } from "@/common/interfaces/item";

export type BerryFullData = {
    details: BerryDetails;
    itemData: ItemData;
    palette: string[];
}

export const FLAVORS: Record<string, string> = {
    "spicy": "#ff9a82",
    "dry": "#abc2f8",
    "sweet": "#f7d3de",
    "bitter": "#9ad67d",
    "sour": "#f7d961",
}
