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

const constructColor = (hexString: string) => {
    const hex = hexString.replace(/#/g, '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const max = Math.max.apply(Math, [r, g, b]);
    const min = Math.min.apply(Math, [r, g, b]);
    let chr = max - min;
    let hue = 0;
    let val = max;
    let sat = 0;

    if (val > 0) {
        sat = chr / val;
        if (sat > 0) {
            if (r === max) {
                hue = 60 * ((g - min - (b - min)) / chr);
                if (hue < 0) {
                    hue += 360;
                }
            } else if (g === max) {
                hue = 120 + 60 * ((b - min - (r - min)) / chr);
            } else if (b === max) {
                hue = 240 + 60 * ((r - min - (g - min)) / chr);
            }
        }
    }
    const colorObj: any = {};
    colorObj["hue"] = hue;
    colorObj["hex"] = hexString;
    return colorObj;
};

export const sortByHue = (colors: string[]) => {
    return colors.map(color => constructColor(color)).sort((a, b) => (a.hue - b.hue)).map(color => color.hex);
};




