import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Group, Mesh, Object3D, Scene } from "three";
import palmtree from "../assets/palmtree.glb";
import firtree from "../assets/firtree.glb";


export type Trees = "palmtree" | "firtree";

const loader = new GLTFLoader();
/** When module is loaded, every tree is loaded in global context. Geometries
* are copied when needed. */
const STATIC_TREES: {[key in Trees]: Scene} = {} as any;

STATIC_TREES.palmtree = (await loader.loadAsync(palmtree)).scene as any;
STATIC_TREES.firtree = (await loader.loadAsync(firtree)).scene as any;

function enableShadows(object: Scene) {
    object.receiveShadow = true;
    object.traverse((child: any) => {
        if (!child.isMesh) return;
        child.receiveShadow = true;
        child.geometry.computeVertexNormals();
    });
}

enableShadows(STATIC_TREES.palmtree);
enableShadows(STATIC_TREES.firtree);

export function makeTree(kind: Trees) {
    return STATIC_TREES[kind]?.clone(true);
}
