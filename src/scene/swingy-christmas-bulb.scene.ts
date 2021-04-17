import p5 from 'p5';
import { Particle } from '../model/particle';
import { randomVector } from '../model/utils';
import { GravityWorld } from '../world/gravity-world';
import { MagneticRepulsor } from '../model/magnetic-repulsor';
import { particles_view } from '../view/particles.view';
import { RandomParticleSpawner } from '../model/random-particle-spawner';
import { Kite } from '../model/kite';
import { kite_renderer } from '../view/kite.view';

export const swingy_christmas_bulb_scene = (p: p5) => {
  const surface_friction = 0.9; // 0 to 1
  let kite;
  let kite_view;
  let kite2;
  let kite2_view;
  let kite3;
  let kite3_view;
  let magnetic_repulsor_view;

  let particle_spawner;
  let particle_spawner_view;

  let magnetic_repulsor;

  let world = new GravityWorld(-400);

  let aspect_ratio, width, height;

  let bx = 0, by = 0, x_offset, y_offset, locked, zoom = 1;

  const mousePressed = () => {
    locked = true;
    x_offset = p.mouseX - bx;
    y_offset = p.mouseY - by;
  }

  const mouseDragged = () => {
    if (locked) {
      bx = p.mouseX - x_offset;
      by = p.mouseY - y_offset;
    }
  }

  const mouseReleased = () => {
    locked = false;
  }

  const mouseWheel = (event) => {
    zoom -= event.delta / 1000;
  }

  const translate = () => {
    const bounds = world.get_bounds();
    const world_aspect_ratio = bounds.width / bounds.height;
    const zoom_factor = world_aspect_ratio > aspect_ratio ? width / bounds.width : height / bounds.height;
    return {
      zoom_factor,
      translate: (v: p5.Vector) => p5.Vector.add(v, p5.Vector.mult(bounds.min, -1)).mult(zoom_factor),
    }
  }

  let zoom_factor, bounds;


  const translate_small = () => {
    if (!bounds) {
     bounds = world.get_bounds();
    }
    const world_aspect_ratio = bounds.width / bounds.height;
    if (!zoom_factor) {
      zoom_factor = world_aspect_ratio > aspect_ratio ? width * 0.23 / bounds.width : height * 0.23 / bounds.height;
    }
    return {
      zoom_factor: zoom_factor,
      translate: (v: p5.Vector) => p5.Vector.add(v, p5.Vector.mult(bounds.min, -1)).mult(zoom_factor).add(new p5.Vector().set(width/2-bounds.width*zoom_factor/2, height/2-bounds.height*zoom_factor/2)),
    }
  }

  const translate_dragged = () => {
    return {
      zoom_factor: zoom,
      translate: (v: p5.Vector) => p5.Vector.add(v, new p5.Vector().set(bx, by)).mult(zoom)
    }
  }

  const preload = () => {
  }

  const setup = () => {
    const min_x = p.windowWidth * 1 / 4;
    const max_x = p.windowWidth * 3 / 4;

    particle_spawner = new RandomParticleSpawner(0, p.windowWidth, 0, p.windowHeight, 100, 120, 0.2, 1);
    particle_spawner_view = particles_view(p)(translate_small)(particle_spawner.get_particles);

    kite = new Kite(p);
    kite_view = kite_renderer(p)(translate_small)(kite);
    kite2 = new Kite(p);
    kite2_view = kite_renderer(p)(translate_small)(kite2);
    kite3 = new Kite(p);
    kite3_view = kite_renderer(p)(translate_small)(kite3);

    const repulsor_center_vector = randomVector(min_x, max_x, p.windowHeight * 5 / 6,p.windowHeight * 6 / 6);
    const repulsor_center = new Particle(repulsor_center_vector.x, repulsor_center_vector.y, new p5.Vector().set(0, 0), true);
    magnetic_repulsor = new MagneticRepulsor(repulsor_center, () => world.get_particles(), 20);
    magnetic_repulsor_view = particles_view(p)(translate_small)(magnetic_repulsor.get_particles);

    world.add_actor(kite);
    world.add_actor(kite2);
    world.add_actor(kite3);
    world.add_actor(magnetic_repulsor);
    world.add_actor(particle_spawner);
  }

  const draw = (time_slice) => {
    world.update(time_slice, surface_friction);
    kite_view();
    kite2_view();
    kite3_view();
    magnetic_repulsor_view.drawParticles();
    particle_spawner_view.drawParticlesFunk();
  }

  const on_resize = (width_, height_) => {
    width = width_;
    height = height_;
    aspect_ratio = width / height;
  }

  return ({
    preload,
    setup,
    draw,
    on_resize, mousePressed,
    mouseDragged, mouseReleased, mouseWheel
  })
}