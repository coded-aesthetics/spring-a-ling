import p5 from 'p5';
import { DelaunaySolid } from '../model/delaunay-solid';
import { SpringString } from '../model/spring-string';
import { randomVector } from '../model/utils';
import { springy_solid_view } from '../view/springy-solid.view';

export const swingy_christmas_bulb_scene = (p: p5) => {
  const surface_friction = 1.5200;
  let spring_string;
  let spring_string_renderer;

  const preload = () => {
  }

  const setup = () => {
    const min_x = p.windowWidth * 0 / 4;
    const max_x = p.windowWidth * 4 / 4;
    const min_y = p.windowHeight * 0 / 6;
    const max_y = p.windowHeight * 1 / 6;

    const min_y_2 = p.windowHeight * 3 / 6;
    const max_y_2 = p.windowHeight * 4 / 6;
    spring_string = new SpringString(randomVector(min_x, max_x, min_y, max_y), randomVector(min_x, max_x, min_y_2, max_y_2));
    spring_string_renderer = springy_solid_view(p);
  }

  const draw = (time_slice) => {
    spring_string.update(time_slice, 1/surface_friction)
    spring_string.springs.forEach(x => x.connected_particle.act(new p5.Vector().set(0, 8)))
    spring_string.springs[spring_string.springs.length - 1].particle_center.act(new p5.Vector().set(0, 10));
    spring_string.springs.forEach((spring) => spring.particle_center.update(time_slice, 1/surface_friction))
    spring_string.springs.forEach((spring) => spring.connected_particle.update(time_slice, 1/surface_friction))
    spring_string_renderer.drawSpringySolid(spring_string);
  }

  return ({
    preload,
    setup,
    draw
  })
}