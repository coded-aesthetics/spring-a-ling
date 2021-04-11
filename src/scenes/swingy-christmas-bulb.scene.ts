import p5 from 'p5';
import { SpringySolid } from '../model/springy-solid';
import { Particle } from '../model/particle';
import { SpringString } from '../model/spring-string';
import { randomVector } from '../model/utils';
import { springy_solid_view } from '../view/springy-solid.view';

export const swingy_christmas_bulb_scene = (p: p5) => {
  const surface_friction = 1.5200;
  let spring_string;
  let spring_string_renderer;
  let springy_solid;
  let springy_solid_renderer;

  const preload = () => {
  }

  const setup = () => {


    const min_x = p.windowWidth * 1 / 4;
    const max_x = p.windowWidth * 3 / 4;
    const min_y = p.windowHeight * 0 / 6;
    const max_y = p.windowHeight * 1 / 6;

    const min_y_2 = p.windowHeight * 1 / 6;
    const max_y_2 = p.windowHeight * 2 / 6;

    springy_solid = new SpringySolid(randomVector(min_x, max_x, min_y_2, max_y_2), 120, 140, 5);
    springy_solid_renderer = springy_solid_view(p);
    const vector_start = randomVector(min_x, max_x, min_y, max_y);
    const particle_start = new Particle(vector_start.x, vector_start.y, new p5.Vector().set(0,0), true);
    spring_string = new SpringString(particle_start, springy_solid.springs[0].particle_center);
    spring_string_renderer = springy_solid_view(p);
  }

  const draw = (time_slice) => {
    spring_string.update(time_slice, 1/surface_friction)
    spring_string.springs.forEach(x => x.connected_particle.act(new p5.Vector().set(0, 8)))
    spring_string.springs[spring_string.springs.length - 1].connected_particle.act(new p5.Vector().set(0, 10));
    spring_string.springs.forEach((spring) => spring.particle_center.update(time_slice, 1/surface_friction))
    //spring_string.springs.forEach((spring) => spring.connected_particle.update(time_slice, 1/surface_friction))
    spring_string_renderer.drawSpringySolid(spring_string);
    springy_solid.update(time_slice, 1/surface_friction)
    spring_string_renderer.drawSpringySolid(springy_solid);
  }

  return ({
    preload,
    setup,
    draw
  })
}