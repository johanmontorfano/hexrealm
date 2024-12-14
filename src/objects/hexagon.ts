import {
    Mesh, 
    Shape, 
    ExtrudeGeometry, 
    Box3,
    Vector3,
    MeshStandardMaterial,
    Scene,
    MeshPhysicalMaterial
} from "three";
import { getGLTF } from "./loader";
import hex from "../assets/hex.glb";

export const STATIC_RADIUS = 10;
// WARN: RECOMPUTE THOSE VALUES WHEN `STATIC_RADIUS` CHANGES (LAST: 10)
export const STATIC_X_SIZE = 20.00000501434065;
export const STATIC_Y_SIZE = 17.320512063901198;
export const STATIC_Z_SIZE = 1;
export const STATIC_HEX: Mesh = (await getGLTF(hex) as any).children[0];
const LOCAL_STATIC_HEXAGON = makeHexagonGeometry();

STATIC_HEX.material = new MeshPhysicalMaterial({color: 0x00FF00});

/** @deprecated use `STATIC_HEX` instead. */
export function makeHexagonGeometry() {
    const hex = new Shape();
    
    // Makes the 3D hexagon shape.
    for (let i = 0; i <= 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = STATIC_RADIUS * Math.cos(angle);
        const y = STATIC_RADIUS * Math.sin(angle);
    
        if (i < 1) hex.moveTo(x, y);
        else hex.lineTo(x, y);
    }
    hex.closePath();

    const geo = new ExtrudeGeometry(hex, {
        steps: 8,
        depth: 1,
        bevelEnabled: false
    });
    geo.computeVertexNormals();
    geo.computeBoundingBox();
    return geo;
}

/** @deprecated use `makeHexagon` instead. */
export function makeHexagonLegacy() {
    const mat = new MeshStandardMaterial({
        color: 0x00FF00, 
    });
    const mesh = new Mesh(LOCAL_STATIC_HEXAGON.clone(), mat);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

export function makeHexagon() {
    return STATIC_HEX.clone(true);
}
