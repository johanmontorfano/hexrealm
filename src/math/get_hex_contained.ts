/** Returns an hexagon tile area */
export function getHexContained(w: number) {
    let len = 0;
    let i = 0;
    let row_modifier = 1;

    while (i < Math.floor(w / 2)) {
        if (i < 1) len = 1;
        else len += w + row_modifier;
        i++;
    }

    return len;
}
