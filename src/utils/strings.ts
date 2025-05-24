/**
 * Get id from the url
 * @param url PokeAPI URL
 * @returns id number
 */
export function parseUrlAsId(url?: string): number {
    const id = url?.split("/").slice(-2)[0] ?? "-1";
    return parseInt(id);
}
