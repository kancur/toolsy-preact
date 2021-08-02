function hex2(c) {
    /* Make sure the color luminance stays in bounds 0 - 255 */
    c = Math.round(c);
    if (c < 0)
        c = 0;
    if (c > 255)
        c = 255;

    let string = c.toString(16);
    if (string.length < 2)
        string = `0${  string}`; // make values lower than 10 use 2 characters, first one being zero

    return string;
}
function color(r, g, b) {
    /* Format r g b luminance values into one hex code preceded with # */
    return `#${hex2(r)}${hex2(g)}${hex2(b)}`; 
}
export function shade(col, light) {

    let r = parseInt(col.substr(1, 2), 16);
    let g = parseInt(col.substr(3, 2), 16);
    let b = parseInt(col.substr(5, 2), 16);

    if (light < 0) {
        r = (1 + light) * r;
        g = (1 + light) * g;
        b = (1 + light) * b;
    } else {
        r = (1 - light) * r + light * 255;
        g = (1 - light) * g + light * 255;
        b = (1 - light) * b + light * 255;
    }

    return color(r, g, b);
}
