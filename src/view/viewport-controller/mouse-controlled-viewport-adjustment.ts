import p5 from 'p5';

export const MouseControlledViewportAdjustment = (deps: {
    get_world_bounds: () => ({min: p5.Vector, max: p5.Vector, width: number, height: number})
}) => (invert_zoom = false) => {
    let width, height;
    let bx = 0, by = 0, x_offset, y_offset, locked, zoom = 1;

    const mousePressed = (mouseX, mouseY) => {
      locked = true;
      x_offset = (mouseX / zoom) - bx;
      y_offset = (mouseY / zoom) - by;
    }

    const mouseDragged = (mouseX, mouseY) => {
      if (locked) {
        bx = (mouseX / zoom) - x_offset;
        by = (mouseY / zoom) - y_offset;
      }
    }

    const mouseReleased = (mouseX, mouseY) => {
      locked = false;
    }

    const mouseWheel = (delta, mouseX, mouseY) => {
      bx -= (mouseX / zoom);
      by -= (mouseY / zoom);
      //delta = delta * (invert_zoom ? -1 : 1);
      zoom = zoom + delta / 1000;
      bx += (mouseX / zoom);
      by += (mouseY / zoom);
    }

    const on_resize = (width_, height_) => {
      width = width_;
      height = height_;
    }
    const translate = () => {
        if (!width || !height) {
            return {
                zoom_factor: 1,
                translate: x => x
            }
        }
        return {
          zoom_factor: zoom* (invert_zoom ? -1 : 1),
          translate: (v: p5.Vector) => p5.Vector.add(v, new p5.Vector().set(bx* (invert_zoom ? -1 : 1), by* (invert_zoom ? -1 : 1))).mult(zoom* (invert_zoom ? -1 : 1))
        }
      }
      return {
        translate,
        on_resize,
        mousePressed,
        mouseDragged,
        mouseReleased,
        mouseMoved: (mouseX, mouseY) => {},
        mouseWheel,
      }
}