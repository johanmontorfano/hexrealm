import { Mesh } from "three";
import { STATIC_X_SIZE, STATIC_Y_SIZE } from "../objects/hexagon";

/** Compute the position of hexagons on a 3d space to form a bigger hexagon and
* set it. */
export function honeycomb(hexs: Mesh[], w: number) {
    const x_terrain_offset = -(w / 4 * STATIC_X_SIZE);
    const y_terrain_offset = -(w / 6 * STATIC_Y_SIZE);
    let side_size = Math.floor(w / 3);
    let row_size = side_size;
    let row_offset = 1;
    let row_i = 0;
    let rows = 0;
    let x_offset = 0;
    let y_offset = 0;
    let i = 0;

    while (!(row_size < side_size && row_offset === -1)) {
        const hex = hexs[i];
        hex.position.setX(rows * STATIC_X_SIZE + x_offset + x_terrain_offset);
        hex.position.setZ(row_i * STATIC_Y_SIZE + y_offset + y_terrain_offset);
        hex.rotateX(-Math.PI / 2);
        row_i++;
        i++;
        if (row_i === row_size) {
            row_offset = rows < side_size && row_offset === 1 ? 1 : -1;
            row_i = 0;
            rows += 1;
            row_size += row_offset;
            x_offset = -STATIC_X_SIZE / 4 * rows;
            y_offset = STATIC_Y_SIZE / 2 * -(row_size - side_size);
        }
    }
}
