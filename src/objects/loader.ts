import { Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();

/** Returns the first scene of a GLTF object and enable shadows. */
export async function getGLTF(path: string, shadows = true): Promise<Scene> {
    const gltf = await loader.loadAsync(path);

    if(shadows) gltf.scene.traverse((c: any) => {
        if (!c.isMesh) return;
        c.receiveShadow = true;
        c.castShadow = true;
        c.geometry.computeVertexNormals();
        c.geometry.computeBoundingBox();
    });
    return gltf.scene as any;
}
