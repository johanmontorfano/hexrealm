import { Color } from "three";

export interface Biomes {
    name: string
    threshold: number;
    color: Color;
    altitudeDecay?: Color; // not implemented
    enabledTreeType?: "palm_tree" | "fir_tree";
    altitudeModifier?: number;
}

export interface Context {
    seed: number;
    noise: number; // Recomended between 0 and 10
    scale: number;
    biomes_data: Biomes[],
    trees_offset: number,
    rotation: boolean;
    render_effects: boolean;
    _contextDepsUpdateRequested: boolean;
}

(window as any).ctx = {
    seed: 72,
    noise: 2.6,
    scale: 4,
    biomes_data: [
        {
            name: "water",
            threshold: .1,
            color: new Color(0x4A4AD9),
            altitudeModifier: .18
        },
        {
            name: "shore",
            threshold: .18,
            color: new Color(0x588CD0),
            altitudeModifier: .18
        },
        {
            name: "beach",
            threshold: .24,
            color: new Color(0xAAAA97),
            enabledTreeType: "palm_tree"
        },
        {
            name: "grass",
            threshold: .38,
            color: new Color(0x4B8B3B),
            enabledTreeType: "fir_tree"
        },
        {
            name: "mountain",
            threshold: 1,
            color: new Color(0xFFFFFF),
            enabledTreeType: "fir_tree"
        }
    ],
    trees_offset: .3,
    rotation: true,
    render_effects: false,
    _contextDepsUpdateRequested: false,
} as Context;


/** WARN: This function aknowledges a deps update. */
export function contextDepsUpdateRequested() {
    const isRequested = useContext()._contextDepsUpdateRequested;
    useContext()._contextDepsUpdateRequested = false;
    return isRequested;
}

/** This context is accessible through the window interface. */
export function useContext(): Context {
    return (window as any).ctx;
}
