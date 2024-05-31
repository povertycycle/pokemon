export function trimUrl(url?: string) {
    return url?.split("/").slice(-2)[0] ?? "-1";
}
