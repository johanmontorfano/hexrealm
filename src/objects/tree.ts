import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, MeshPhysicalMaterial, Scene } from "three";
import palmtree from "../assets/palmtree.glb";
import firtree from "../assets/firtree.glb";
import { getGLTF } from "./loader";


export type Trees = "palmtree" | "firtree";

/** When module is loaded, every tree is loaded in global context. Geometries
* are copied when needed. */
const STATIC_TREES: {[key in Trees]: Mesh} = {
    palmtree: (await getGLTF(palmtree) as any),
    firtree: (await getGLTF(firtree) as any)
};

STATIC_TREES.palmtree.rotateZ(-Math.PI / 2);
STATIC_TREES.firtree.rotateZ(-Math.PI / 2);

export function makeTree(kind: Trees) {
    console.log(STATIC_TREES[kind]);
    return STATIC_TREES[kind].clone();
}
