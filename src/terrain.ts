import { Color, Group, Mesh, MeshPhysicalMaterial, Object3D } from "three";
import { getHexagonalNoise } from "./math/combined_noise";
import { honeycomb } from "./math/honeycomb";
import { makeHexagon, STATIC_X_SIZE, STATIC_Y_SIZE, STATIC_Z_SIZE } from "./objects/hexagon";
import { getZScaling } from "./math/get_z_scaling_factor";
import { setZCompensated } from "./math/compensated_z_scale";
import { useContext } from "./context";
import { getHexagonalTreeNoise } from "./math/tree_noise";
import { makeTree, Trees } from "./objects/tree";

function setMaterialWorldProperties(
    hex: Mesh, 
    palm_tree: Object3D, 
    fir_tree: Object3D,
    w: number,
    tree: boolean
) {
    const max_scale = getZScaling(w);
    const scale = hex.scale.z;
    const mat = (hex.material as MeshPhysicalMaterial);
    const {water_level, sand_level, dirt_level} = useContext(); 

    if (scale / max_scale < water_level) {
        const rate = scale  / max_scale / water_level;
        const b = 0x0000FF * rate;
        const g = Math.round(0x00FF * rate + .1) * 0x000100;
        mat.color.setHex(Math.min(b + g, 0xFFD68F));
        setZCompensated(hex, max_scale * water_level);
    }
    else if (scale / max_scale < sand_level) {
        mat.color.setHex(0xAAAA97);
        palm_tree.visible = true;
        fir_tree.visible = false;
    }
    else if (scale / max_scale < dirt_level) {
        mat.color.setHex(0x4B8B3B);
        palm_tree.visible = false;
        fir_tree.visible = true;
    }
    else {
        mat.color.setHex(0xFFFFFF);
        palm_tree.visible = false;
        fir_tree.visible = true;
    }

    if (!tree) {
        palm_tree.visible = false;
        fir_tree.visible = false;
    }
}

/** Manages the terrain creation and appearance */
export function useTerrain(w: number) {
    const hexs: Mesh[] = [];
    const trees: {[type in Trees]: Object3D[]} = {
        palmtree: [],
        firtree: []
    };

    function generate(update = true) {
        const z_scale = getZScaling(w);
        const {water_level} = useContext();

        /** Noise map to generate terrain variations */
        const noise = getHexagonalNoise(w);
        const treeNoise = getHexagonalTreeNoise(noise, w);
        noise.forEach((n, i) => {
            if (!update) {
                hexs.push(makeHexagon());
                trees.palmtree.push(makeTree("palmtree") as Object3D);
                trees.firtree.push(makeTree("firtree") as Object3D);
            };
            trees.palmtree[i].position.y = n * z_scale * STATIC_Z_SIZE;
            trees.firtree[i].position.y = n * z_scale * STATIC_Z_SIZE;
            setZCompensated(hexs[i], n * z_scale);
            setMaterialWorldProperties(
                hexs[i], 
                trees.palmtree[i], 
                trees.firtree[i], 
                w, 
                treeNoise[i] > water_level
            );
        });
    }

    generate(false);
    honeycomb(hexs, w);
    honeycomb(trees.palmtree as any[], w);
    honeycomb(trees.firtree as any[], w);

    return {
        hexs,
        trees,
        onContextUpdate: generate
    };
}
