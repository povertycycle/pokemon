import {
    GAMES,
    VERSION_DATA,
    VERSION_GROUP_GAMES,
} from "../constants/constants";

/**
 * Get version data display constants
 * @param version Game version
 * @param options custom angle and opacity of background color
 */
export function getVersionData(
    version: string | null,
    options?: { angle?: number; opacity?: string }
) {
    if (!!!version) {
        return {
            name: !!version
                ? `Version '${version}' data not found`
                : "No Move Found",
            background: "",
        };
    }
    const opacity = options?.opacity ?? "40";
    let versionColors = getVersionColors(version);
    const background =
        versionColors.length > 1
            ? `linear-gradient(${options?.angle ?? 90}deg,${getVersionColors(
                  version
              ).join(`${opacity}, `)}${opacity})`
            : `${versionColors[0]}${opacity}`;
    const name = formatVersionName(version).join(" ");

    return {
        name,
        background,
    };
}

/**
 * Helper function to get version color
 */
function getVersionColors(version: string): string[] {
    return (GAMES[version] ?? VERSION_GROUP_GAMES[version] ?? [version]).reduce(
        (acc, g) => {
            return [...acc, ...VERSION_DATA[g]?.colors];
        },
        [] as string[]
    );
}

/**
 * Helper function to format version to readable names
 */
export function formatVersionName(game: string): string[] {
    return (GAMES[game] ?? [game]).map(
        (t) =>
            VERSION_DATA[t]?.title ??
            `Gen ${t.split("-")[1].toUpperCase()} icon`
    );
}
