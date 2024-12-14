import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { useContext } from "../context";

const ui = new GUI();
const context = useContext();

const map = ui.addFolder("Map");
map.add(context, "scale", 0, 4);
map.add(context, "seed", 0, 9999);
map.add(context, "noise", 0, 10);
map.add(context, "trees_offset", 0, 1);

const biomes = ui.addFolder("Biomes");
context.biomes_data.forEach(biome => {
    const folder = biomes.addFolder(biome.name);
    folder.addColor(biome, "color");
    folder.add(biome, "threshold");
    if (biome.altitudeDecay)
        folder.add(biome, "altitudeDecay");
    if (biome.altitudeModifier)
       folder.add(biome, "altitudeModifier");
});

const rendering = ui.addFolder("Rendering");
rendering.add(context, "rotation");
rendering.add(context, "render_effects");

ui.onChange(() => window.ctx._contextDepsUpdateRequested = true);
