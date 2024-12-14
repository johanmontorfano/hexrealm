import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Scene } from "three";
import palmtree from "../assets/palmtree.glb";
import firtree from "../assets/firtree.glb";
import { getGLTF } from "./loader";


export type Trees = "palmtree" | "firtree";

/** When module is loaded, every tree is loaded in global context. Geometries
* are copied when needed. */
const STATIC_TREES: {[key in Trees]: Scene} = {
    palmtree: await getGLTF(palmtree) as any,
    firtree: await getGLTF(firtree) as any
};

export function makeTree(kind: Trees) {
    if(STATIC_TREES[kind].rotation.z === 0)
        STATIC_TREES[kind]?.rotateZ(-Math.PI / 2);
    return STATIC_TREES[kind]?.clone(true);
}
