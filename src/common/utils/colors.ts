export function isDark(color: string) {
    let c = color.slice(color.indexOf("#")+1, color.indexOf("#")+7);
    var rgb = parseInt(c, 16);
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >>  8) & 0xff;
    var b = (rgb >>  0) & 0xff;

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma < 156;
}

export function getColorBetween(color1: string, color2: string,) {
    const parseHexColor = (color: any) => parseInt(color, 16);
    const color1RGB = [parseHexColor(color1.slice(1, 3)), parseHexColor(color1.slice(3, 5)), parseHexColor(color1.slice(5))];
    const color2RGB = [parseHexColor(color2.slice(1, 3)), parseHexColor(color2.slice(3, 5)), parseHexColor(color2.slice(5))];
    const interpolatedRGB = color1RGB.map((channel, i) => Math.round(channel + (color2RGB[i] - channel) * 0.5));
    const interpolatedColor = '#' + interpolatedRGB.map(channel => channel.toString(16).padStart(2, '0')).join('');
    return interpolatedColor;
}
