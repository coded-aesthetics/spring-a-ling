import p5 from 'p5';
import { Particle } from '../model/particle';
import { randomVector } from '../model/utils';
import { GravityWorld } from '../world/gravity-world';
import { MagneticRepulsor } from '../model/magnetic-repulsor';
import { particles_view } from '../view/particles.view';
import { RandomParticleSpawner } from '../model/random-particle-spawner';
import { Kite } from '../model/kite';
import { kite_renderer } from '../view/kite.view';
import { MouseControlledViewportAdjustment } from '../view/viewport-controller/mouse-controlled-viewport-adjustment';
import { Wall } from '../model/wall';
import { create_random_particle } from '../model/particle-utils';
import { wall_view } from '../view/wall.view';

export const swingy_christmas_bulb_scene = (p: p5) => {
  const surface_friction = 0.9; // 0 to 1
  const amount_kites = 10;

  let walls = [];
  let wall_views = [];
  let magnetic_repulsor_view;

  let particle_spawner;
  let particle_spawner_view;

  let magnetic_repulsor;

  let world = new GravityWorld(400);

  let viewport_adjustment_strategy = MouseControlledViewportAdjustment({get_world_bounds: () => world.get_bounds()})

  const mousePressed = () => {
    viewport_adjustment_strategy.mousePressed(p.mouseX, p.mouseY);
  }

  const mouseDragged = () => {
    viewport_adjustment_strategy.mouseDragged(p.mouseX, p.mouseY);
  }

  const mouseReleased = () => {
    viewport_adjustment_strategy.mouseReleased(p.mouseX, p.mouseY);
  }

  const mouseWheel = (event) => {
    viewport_adjustment_strategy.mouseWheel(event.delta, p.mouseX, p.mouseY);
  }

  const mouseMoved = () => {
    viewport_adjustment_strategy.mouseMoved(p.mouseX, p.mouseY);
  }

  const preload = () => {
  }



  const setup = () => {
    const min_x = p.windowWidth * 1 / 4;
    const max_x = p.windowWidth * 3 / 4;

    const { translate } = viewport_adjustment_strategy;

    particle_spawner = new RandomParticleSpawner(0, p.windowWidth, 0, p.windowHeight, 100, 150, 3, 12);
    particle_spawner_view = particles_view(p)(translate)(particle_spawner.get_particles);

    for (let i = 0; i < amount_kites; i++) {
      const wall = new Wall(
        create_random_particle(0, p.windowWidth, p.windowHeight * 0 / 6,p.windowHeight * 6 / 6, true),
        create_random_particle(0, p.windowWidth, p.windowHeight * 0 / 6,p.windowHeight * 6 / 6, true),
        10
      );
      wall_views.push(wall_view(p)(translate)(wall));
      walls.push(wall);
      world.add_actor(wall);
    }

    const repulsor_center_vector = randomVector(min_x, max_x, p.windowHeight * 5 / 6,p.windowHeight * 6 / 6);
    const repulsor_center = new Particle(repulsor_center_vector.x, repulsor_center_vector.y, new p5.Vector().set(0, 0), true);
    magnetic_repulsor = new MagneticRepulsor(repulsor_center, () => world.get_particles(), -20);
    magnetic_repulsor_view = particles_view(p)(translate)(magnetic_repulsor.get_particles);

    world.add_actor(magnetic_repulsor);
    world.add_actor(particle_spawner);
  }

  const draw = (time_slice) => {
    world.update(time_slice, surface_friction);
    for (let cur of wall_views) {
      cur.drawWall();
    }
    magnetic_repulsor_view.drawParticles();
    particle_spawner_view.drawParticlesFunk();
    particle_spawner_view.drawParticles();
  }

  const on_resize = (width_, height_) => {
    viewport_adjustment_strategy.on_resize(width_, height_);
  }

  return ({
    preload,
    setup,
    draw,
    on_resize, mousePressed,
    mouseDragged, mouseReleased, mouseWheel,mouseMoved
  })
}