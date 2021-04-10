import p5 from 'p5';
import { DelaunaySolid } from '../model/delaunay-solid';
import { springy_solid_view } from '../view/springy-solid.view';

export const nervous_christmas_tree_scene = (p: p5) => {
  const surface_friction = 5200;
  let springy_solid;
  let springy_solid_renderer;

  const preload = () => {
  }

  const setup = () => {
    const min_x = p.windowWidth * 1 / 4;
    const max_x = p.windowWidth * 3 / 4;
    const min_y = p.windowHeight * 1 / 6;
    const max_y = p.windowHeight * 2 / 6;

    springy_solid = new DelaunaySolid(new p5.Vector().set(Math.random()* (max_x - min_x) + min_x, Math.random()* (max_y - min_y) + min_y), 250, 280,7);
    springy_solid_renderer = springy_solid_view(p);
  }

  const draw = (time_slice) => {
    springy_solid.springs.forEach(x => x.connected_particle.act(new p5.Vector().set(0, 8)))
    const under_0 = springy_solid.springs.find(y => y.particle_center.pos.y > p.windowHeight - 40);
    if (under_0) {
      const dir = Math.random() > 0.5 ? 1 : -1;
      under_0.particle_center.velocity = under_0.particle_center.average_velocity().reflect(new p5.Vector().set(dir * Math.random(), -4)).mult(2.3);
          springy_solid.springs.forEach(x  => {
            x.particle_center.velocity = under_0.particle_center.velocity.copy();
          }
      )
    }

    const under_1 = springy_solid.springs.find(y => y.particle_center.pos.x < 0);
    if (under_1) {
      under_1.particle_center.velocity = under_1.particle_center.average_velocity().reflect(new p5.Vector().set(1, 0)).mult(1.0);
          springy_solid.springs.forEach(x => {
            x.particle_center.velocity = under_1.particle_center.velocity.copy();
          }
      )
    }

    const over_1 = springy_solid.springs.find(y => y.particle_center.pos.x > p.windowWidth);
    if (over_1) {
      over_1.particle_center.velocity = over_1.particle_center.average_velocity().reflect(new p5.Vector().set(-1, 0)).mult(1.0);
          springy_solid.springs.forEach(x => {
            x.particle_center.velocity = over_1.particle_center.velocity.copy();
          }
      )
    }

    springy_solid.update(time_slice, 1/surface_friction);
    springy_solid.springs.forEach((spring) => spring.particle_center.update(time_slice, 1/surface_friction))
    springy_solid_renderer.drawSpringySolid(springy_solid);
  }

  return ({
    preload,
    setup,
    draw
  })
}