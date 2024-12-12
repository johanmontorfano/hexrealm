export interface Context {
    seed: number;
    noise: number; // Recomended between 0 and 1
    scale: number;
    water_level: number; // Recommended between 0 and 1
    sand_level: number;  // Recommended between 0 and 1
    dirt_level: number;  // Recommended between 0 and 1
    _seed: number;
    _noise: number;
    _scale: number;
    _water_level: number;
    _sand_level: number;
    _dirt_level: number;
    _render_effects: boolean;
    _contextDepsUpdateRequested: boolean;
}

(window as any).ctx = {
    _seed: 72,
    _noise: 2.6,
    _scale: 4,
    _water_level: .2,
    _sand_level: .3,
    _dirt_level: .6,
    _render_effects: false,
    _contextDepsUpdateRequested: false,
    get seed(): number {
        return this._seed;
    },
    set seed(seed: number) {
        this._seed = seed;
        this._contextDepsUpdateRequested = true;
    },
    get noise(): number {
        return this._noise;
    },
    set noise(noise: number) {
        this._noise = noise;
        this._contextDepsUpdateRequested = true;
    },
    get scale(): number {
        return this._scale;
    },
    set scale(scale: number) {
        this._scale = scale;
        this._contextDepsUpdateRequested = true;
    },
    get water_level(): number {
        return this._water_level;
    },
    set water_level(level: number) {
        this._water_level = level;
        this._contextDepsUpdateRequested = true;
    },
    get sand_level(): number {
        return this._sand_level;
    },
    set sand_level(level: number) {
        this._sand_level = level;
        this._contextDepsUpdateRequested = true;
    },
    get dirt_level(): number {
        return this._dirt_level;
    },
    set dirt_level(level: number) {
        this._dirt_level = level;
        this._contextDepsUpdateRequested = true;
    }
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
