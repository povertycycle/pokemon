export function getLuma(color: string) {
    let c = color.slice(color.indexOf("#")+1, color.indexOf("#")+7);
    var rgb = parseInt(c, 16);
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >>  8) & 0xff;
    var b = (rgb >>  0) & 0xff;

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma;
}

export function isDark(color: string) {
    return getLuma(color) < 156;
}

export function getColorBetween(color1: string, color2: string,) {
    const parseHexColor = (color: any) => parseInt(color, 16);
    const color1RGB = [parseHexColor(color1.slice(1, 3)), parseHexColor(color1.slice(3, 5)), parseHexColor(color1.slice(5))];
    const color2RGB = [parseHexColor(color2.slice(1, 3)), parseHexColor(color2.slice(3, 5)), parseHexColor(color2.slice(5))];
    const interpolatedRGB = color1RGB.map((channel, i) => Math.round(channel + (color2RGB[i] - channel) * 0.5));
    const interpolatedColor = '#' + interpolatedRGB.map(channel => channel.toString(16).padStart(2, '0')).join('');
    return interpolatedColor;
}

export function hexToHSB(hex: string) {
    console.log(`%c ${hex}`, `A: ${hex}`)
    hex = hex.replace(/^#/, '');
    hex = hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex;

    var red = parseInt(hex.slice(0, 2), 16) / 255,
        green = parseInt(hex.slice(2, 4), 16) / 255,
        blue = parseInt(hex.slice(4, 6), 16) / 255;

    var cMax = Math.max(red, green, blue),
        cMin = Math.min(red, green, blue),
        delta = cMax - cMin,
        saturation = cMax ? (delta / cMax) : 0;

    switch (cMax) {
        default:
        case 0:
            return [0, 0, 0];
        case cMin:
            return [0, 0, cMax];
        case red:
            return [60 * (((green - blue) / delta) % 6) || 0, saturation, cMax];
        case green:
            return [60 * (((blue - red) / delta) + 2) || 0, saturation, cMax];
        case blue:
            return [60 * (((red - green) / delta) + 4) || 0, saturation, cMax];
    }
}