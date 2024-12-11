import Alea from "alea";
import { useContext } from "../context";
import { createNoise2D } from "simplex-noise";

/** This noise is used to place trees on the map, it doesn't use regular noise
* functions since it needs to be really messy. Trees are set as `1` or `0` */
export function getHexagonalTreeNoise(hNoise: number[], w: number): number[] {
    const {seed} = useContext();
    const noise: number[] = [];
    let side_size = Math.floor(w / 3);
    let row_size = side_size;
    let row_offset = 1;
    let row_i = 0;
    let rows = 0;
    let i = 0;

    while (!(row_size < side_size && row_offset === -1)) {
        const nx = row_i / w - .5;
        const ny = rows / w - .5;
        const prng = Alea(seed + (nx * 2) + (ny / 2));
        const gen = createNoise2D(prng);

        noise.push(gen(nx, ny) * hNoise[i]);
        row_i++;
        i++;
        if (row_i === row_size) {
            row_offset = rows < side_size && row_offset === 1 ? 1 : -1;
            row_i = 0;
            rows += 1;
            row_size += row_offset;
        } 
    }
    return noise;
}
