import p5 from 'p5';

export const HyperactiveViewportAdjustment = (deps: {
    get_world_bounds: () => ({min: p5.Vector, max: p5.Vector, width: number, height: number})
}) => {
    let width, height, aspect_ratio;
    const on_resize = (width_, height_) => {
      width = width_;
      height = height_;
      aspect_ratio = width / height;
    }
    const translate = () => {
        if (!width || !height) {
            return {
                zoom_factor: 1,
                translate: x => x
            }
        }
        const bounds = deps.get_world_bounds();
        const world_aspect_ratio = bounds.width / bounds.height;
        const zoom_factor = world_aspect_ratio > aspect_ratio ? width / bounds.width : height / bounds.height;
        return {
          zoom_factor,
          translate: (v: p5.Vector) => p5.Vector.add(v, p5.Vector.mult(bounds.min, -1)).mult(zoom_factor),
        }
      }

      return {
        translate,
        on_resize,
        mousePressed: (mouseX, mouseY) => {},
        mouseDragged: (mouseX, mouseY) => {},
        mouseReleased: (mouseX, mouseY) => {},
        mouseMoved: (mouseX, mouseY) => {},
        mouseWheel: (event, mouseX, mouseY) => {},
      }
}