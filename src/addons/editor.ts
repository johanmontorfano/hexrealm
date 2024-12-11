import { Context, useContext } from "../context";
import "./editor.css";

/** An input for values in `window.ctx` */
function inputCtx(
    name: string, 
    kind: "string" | "number", 
    attr: keyof Context
) {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.textContent = name;
    input.type = kind;
    input.value = useContext()[attr].toString();
    if (kind === "number") {
        input.min = "0";
        input.step = attr !== "seed" ? ".1" : "1";
    }
    input.onchange = (ev) => {
        const val = (ev.target as any).value as any;
        (useContext()[attr] as any) = 
            kind === "number" ? parseFloat(val) : val;
    };
    return [label, input];
}

const container = document.createElement("div");
const title = document.createElement("h3");

title.textContent = "Scene Context";
container.append(title);
Object.keys(useContext()).forEach(key => {
    if (key[0] === "_") return;

    const kind = typeof useContext()[key];

    container.append(...inputCtx(key, kind as any, key as keyof Context));
});
container.classList.add("addon_editor");
document.body.append(container);
