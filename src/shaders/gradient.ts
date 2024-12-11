import * as THREE from "three";
import fragmentShader from "./gradient_frag.glsl?raw";
import vertexShader from "./gradient_vert.glsl?raw";

export function makeGradientShader(from: THREE.Color, to: THREE.Color) {
    return new THREE.ShaderMaterial({
        uniforms: {
            from: {value: from}, 
            to: {value: to}
        },
        vertexShader,
        fragmentShader
    });
}
