import { useContext } from "../context";

/** The z scaling factor defines the maximum height of hexagons */
export function getZScaling(w: number) {
    return w * useContext().scale;
}
