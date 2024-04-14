export function isDark(color: string) {
    let c = color.slice(color.indexOf("#")+1, color.indexOf("#")+7);
    var rgb = parseInt(c, 16);
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >>  8) & 0xff;
    var b = (rgb >>  0) & 0xff;

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma < 156;
}