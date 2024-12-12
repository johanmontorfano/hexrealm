import {
    ACESFilmicToneMapping,
    Color,
    DirectionalLight, 
    Group, 
    HemisphereLight, 
    Mesh, 
    PCFSoftShadowMap, 
    PerspectiveCamera, 
    PlaneGeometry, 
    PMREMGenerator, 
    Scene, 
    WebGLRenderer
} from "three";
import { contextDepsUpdateRequested } from "./context";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useTerrain } from "./terrain";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { makeGradientShader } from "./shaders/gradient";
import { initEffectComposer } from "./effects";
import hdrLighting from "./shaders/environment.hdr";
import Stats from "three/examples/jsm/libs/stats.module";
import "./addons/editor";
import "./objects/tree";

const terrain_width = 50;
const renderer = new WebGLRenderer({antialias: true});
const pmremgen = new PMREMGenerator(renderer);
const camera = new PerspectiveCamera(75);
const bg = makeGradientShader(new Color(0x666666), new Color(0x553333));
const bgPlane = new PlaneGeometry(2, 2);
const bgMesh = new Mesh(bgPlane, bg);
const sun = new DirectionalLight(0xE65C19);
const hemisphere = new HemisphereLight(0xFFFFFF, 0x333333, .4);
const scene = new Scene();
const controls = new OrbitControls(camera, renderer.domElement);
const terrain = useTerrain(terrain_width);
const terrain_group = new Group();
const stats = new Stats();
const composer = initEffectComposer(renderer, scene, camera);

console.log(terrain.hexs.length * 3, "objects created !");

function animate() {
    if (contextDepsUpdateRequested())
        terrain.onContextUpdate();
    terrain_group.rotation.y += 0.001;
    if ((window as any).ctx._render_effects)
        composer.render();
    renderer.render(scene, camera);
    stats.update();
}

function resize() {
    const {innerWidth, innerHeight} = window;
   
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
}

new RGBELoader().load(hdrLighting, function (texture) {
    scene.environment = pmremgen.fromEquirectangular(texture).texture;
});
resize();
window.onresize = resize;
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = .5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animate);
sun.position.set(terrain_width * 6, 100, 0);
sun.castShadow = true;
sun.intensity = 50;
sun.shadow.bias = -.0002;
sun.shadow.camera.top = 1000;
sun.shadow.camera.bottom = -1000;
sun.shadow.camera.left = -1000;
sun.shadow.camera.right = 1000;
sun.shadow.camera.near = 1;
sun.shadow.camera.far = 2000;
camera.position.set(500, 500, 500);
camera.lookAt(scene.position);
controls.autoRotate = true;
controls.autoRotateSpeed = .6;
controls.enablePan = false;
controls.update();
scene.add(sun);
scene.add(hemisphere);
scene.add(bgMesh);
scene.add(terrain_group);
terrain_group.add(...terrain.hexs);
terrain_group.add(...terrain.trees.palmtree);
terrain_group.add(...terrain.trees.firtree);
document.body.append(renderer.domElement);
document.body.append(stats.dom);
