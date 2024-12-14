import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();

function traverse(gltf: any) {
    gltf.traverse((c: any) => {
        c.receiveShadow = true;
        c.castShadow = true;
        if (c.isGroup) c.children.forEach((d: any) => traverse(d));
        if (c.isMesh) {
            c.geometry.computeVertexNormals();
            c.geometry.computeBoundingBox();
        }
    });
}

/** Returns the first scene of a GLTF object and enable shadows. */
export async function getGLTF(path: string, shadows = true): Promise<Scene> {
    const gltf = await loader.loadAsync(path);

    if (shadows) traverse(gltf.scene);
    return gltf.scene as any;
}
