import { Box3, Mesh, Vector3 } from "three";
import { STATIC_Z_SIZE } from "../objects/hexagon";

/** Since scaling happens uniformly on an object, it moves it's position. Hence
* we have to compensate the scaling. That's what is done here. */
export function setZCompensated(item: Mesh, z: number) {
    item.scale.setZ(z);
    item.position.y = z * (STATIC_Z_SIZE - 1) / 2;
}
