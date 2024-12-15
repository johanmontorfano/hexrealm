import { getGLTF } from "./loader";
import { Mesh } from "three";
import palmtree from "../assets/palmtree.glb";
import firtree from "../assets/firtree.glb";

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
    return STATIC_TREES[kind].clone();
}
