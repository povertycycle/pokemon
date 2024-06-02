export function errorCheck(res: Response) {
    if (!res.ok) throw new Error("Failed to fetch data from API");
    return res.json();
}