export async function imageUrlToLocalUrl(imageUrl: string) {
    return fetch(imageUrl).then(
        res => res.blob()
    ).then(res => (
        URL.createObjectURL(res)
    ));
}