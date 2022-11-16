export function extractIdFromUrl(url: URL) {
    let splitUrl = url.toString().split('/')
    return splitUrl[splitUrl.length - 1]
}