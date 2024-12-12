import {
    Mesh, 
    Shape, 
    ExtrudeGeometry, 
    FrontSide, 
    MeshPhongMaterial,
    MeshPhysicalMaterial,
    Box3,
    Vector3,
    MeshStandardMaterial
} from "three";

export const STATIC_RADIUS = 10;
// WARN: RECOMPUTE THOSE VALUES WHEN `STATIC_RADIUS` CHANGES (LAST: 10)
export const STATIC_X_SIZE = 20
export const STATIC_Y_SIZE = 17.32050895690918;
export const STATIC_Z_SIZE = 1;
const LOCAL_STATIC_HEXAGON = makeHexagonGeometry();


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

export function makeHexagon() {
    const mat = new MeshStandardMaterial({
        color: 0x00FF00, 
    });
    const mesh = new Mesh(LOCAL_STATIC_HEXAGON.clone(), mat);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
}

console.log(new Box3().setFromObject(makeHexagon()).getSize(new Vector3()));
