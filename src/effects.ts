import { Camera, Renderer, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

export function initEffectComposer(renderer: WebGLRenderer, scene: Scene, camera: Camera) {
    const composer = new EffectComposer(renderer);
    const render = new RenderPass(scene, camera);
    const fxaa = new ShaderPass(FXAAShader);
    const ssao = new SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
    const output = new OutputPass();

    fxaa.renderToScreen = true;
    ssao.kernelRadius = 20;
    ssao.minDistance = .1;
    ssao.maxDistance = 2000;
    composer.addPass(render);
    composer.addPass(ssao);
    composer.addPass(fxaa);
    composer.addPass(output);

    return composer;
}
