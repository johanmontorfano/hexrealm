import { Mesh, MeshPhysicalMaterial, Object3D } from "three";
import { getHexagonalNoise } from "./math/combined_noise";
import { honeycomb } from "./math/honeycomb";
import { makeHexagon, STATIC_Z_SIZE } from "./objects/hexagon";
import { getZScaling } from "./math/get_z_scaling_factor";
import { setZCompensated } from "./math/compensated_z_scale";
import { useContext } from "./context";
import { getHexagonalTreeNoise } from "./math/tree_noise";
import { makeTree, Trees } from "./objects/tree";

const { biomes_data: biomes, trees_offset } = useContext();

function setMaterialWorldProperties(
    hex: Mesh, 
    palm_tree: Object3D, 
    fir_tree: Object3D,
    w: number,
    tree: boolean
) {
    const scale = getZScaling(w);
    const relative_scale = hex.scale.z / scale;
    const mat = (hex.material as MeshPhysicalMaterial);
    let biome_found = false;

    for (const biome in biomes) {
        if (biome_found || biomes[biome].threshold < relative_scale) continue;

        const bdata = biomes[biome];
        const has_tree = tree && bdata.enabledTreeType !== undefined;
        
        biome_found = true;
        mat.color.set(bdata.color);
        if (bdata.altitudeModifier)
            setZCompensated(hex, bdata.altitudeModifier * scale);
        palm_tree.visible = has_tree && bdata.enabledTreeType === "palm_tree";
        fir_tree.visible = has_tree && bdata.enabledTreeType === "fir_tree";
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
                treeNoise[i] > trees_offset
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
