import Alea from "alea";
import { createNoise2D, NoiseFunction2D } from "simplex-noise";
import { getZScaling } from "./get_z_scaling_factor";
import { useContext } from "../context";

/** From -1.0:1.0 to 0.0:1.0 noises */
export function rescaledNoise(gen: NoiseFunction2D, nx: number, ny: number) {
    return gen(nx, ny) / 2 + .5;
}

export function getHexagonalNoise(w: number) {
    const prng = Alea(useContext().seed);
    const gen = createNoise2D(prng);
    const noise: number[] = [];
    let side_size = Math.floor(w / 3);
    let row_size = side_size;
    let row_offset = 1;
    let row_i = 0;
    let rows = 0;

    while (!(row_size < side_size && row_offset === -1)) {
        const nx = row_i / w - .5;
        const ny = rows / w - .5;

        noise.push(Math.pow(
            (rescaledNoise(gen, nx, ny)
            + .5 * rescaledNoise(gen, 2 * nx, 2 * ny)
            + .25 * rescaledNoise(gen, 4 * nx, 4 * ny))
            / 1.75,
            useContext().noise
        ));
        row_i++;
        if (row_i === row_size) {
            row_offset = rows < side_size && row_offset === 1 ? 1 : -1;
            row_i = 0;
            rows += 1;
            row_size += row_offset;
        } 
    }
    return noise;
}
