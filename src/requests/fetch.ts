/**
 * GET service wrapper with error checking
 *
 * @param url URL string
 * @returns Object data as a promise
 */
export function getService(url: string): Promise<any> {
    return fetch(url).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data from API");
        return res.json();
    });
}
