# Hexagonal World

A side project to learn more about 3D rendering and make something pretty.

### Roadmap
- [-] Fix trees not casting shadow
- [ ] Fix buffer overdraw
- [ ] Fix lights and shadows lines effect due to DirectionalLight -> perf issue
- [-] Improve light effects
- [ ] Increase color palette
- [ ] Add planes
- [ ] Add clouds
- [ ] Add water effects

### Fix infos

##### `Fix buffer overdraw`

For some reason, when zooming into a scene with relief, fps drops. The most
logical issue, after digging on the internet, is `buffer overdraw`.

I found no efficient way of fixing this yet.
