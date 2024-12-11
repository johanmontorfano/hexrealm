import { Camera, Renderer, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

export function initEffectComposer(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
    const composer = new EffectComposer(renderer);
    const fxaa = new ShaderPass(FXAAShader);
    const ssao = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
 
    fxaa.renderToScreen = true;
    ssao.kernelRadius = 20;
    composer.addPass(fxaa);
    composer.addPass(ssao);
}
