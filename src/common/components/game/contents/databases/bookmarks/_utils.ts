export enum Bookmark {
    Flavor = "Profile",
    Effectiveness = "Type Effectiveness",
    Stats = "Stats",
    Species = "Species Information",
    Abilities = "Abilities",
    Forms = "Forms & Evolutions",
    Moves = "Moves",
    Encounters = "Encounters",
    BugReport = "Bug Reports",
}

export const BOOKMARK_DATA: Record<Bookmark, { icon: string; id: string }> = {
    [Bookmark.Flavor]: {
        icon: "ri-double-quotes-r",
        id: "hOASEz102uMjCETDkIsCT3K7xyMUUTeG"
    },
    [Bookmark.Effectiveness]: {
        icon: "ri-fire-fill",
        id: "zyDQ7LRRURXfwVKHmF2OiWkI5PaydPoM"
    },
    [Bookmark.Stats]: {
        icon: "ri-bar-chart-horizontal-fill",
        id: "z9CLCg0crhswKgmiUMo0QlnIrkLtrFFE"
    },
    [Bookmark.Species]: {
        icon: "ri-info-i",
        id: "MFYDhCQCTFo8hFNwEZwq21s3IeLUzBmj"
    },
    [Bookmark.Abilities]: {
        icon: "ri-leaf-fill",
        id: "VrXWgWQLkf59OQj7MD2hzlasqZPcLkTb"
    },
    [Bookmark.Forms]: {
        icon: "ri-recycle-fill",
        id: "mcKvPUTPtI3lSPjUiUgD5TUV8rSUTvXf"
    },
    [Bookmark.Moves]: {
        icon: "ri-boxing-fill",
        id: "0HehCrr6obHw3zZansZl4EE9QzxdXTlW"
    },
    [Bookmark.Encounters]: {
        icon: "ri-map-pin-2-fill",
        id: "XcWiOkm1OTvPYYzGFcX6zCjpjZzxAESj"
    },
    [Bookmark.BugReport]: {
        icon: "ri-bug-fill",
        id: "LPkr8QlmIA5QL3A5nvFqYweYbvNTWP0m"
    }
}