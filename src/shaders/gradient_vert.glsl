varying vec2 vuv;

void main() {
    vuv = uv;
    float depth = 1.;
    gl_Position = vec4(position.xy, depth, 1.);
}
