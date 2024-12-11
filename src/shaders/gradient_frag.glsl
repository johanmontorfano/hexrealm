varying vec2 vuv;
uniform vec3 from;
uniform vec3 to;

void main() {
    gl_FragColor = vec4(mix(from, to, vec3(vuv.y)), 1.);
}
