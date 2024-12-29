import { getVersionColors } from "./colors";
import { formatVersionName } from "./string";

export function getVersionData(version: string, options?: { angle?: number, opacity?: string }) {
    const opacity = options?.opacity ?? "40";
    const versionColors = getVersionColors(version);
    const background = versionColors.length > 1 ? `linear-gradient(${options?.angle ?? 90}deg,${getVersionColors(version).join(`${opacity}, `)}${opacity})` : `${versionColors[0]}${opacity}`;
    const name = formatVersionName(version).join(" ");

    return {
        name,
        background,
    }
}