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
import { IActor } from '../interfaces';

const renderer = (p) => (world) => (get_actors: () => {kites: IActor[], magnetic_repulsor: IActor, particle_spawner: IActor, walls: IActor[]}) => (invert_zoom = false) => {
  let viewport_adjustment_strategy = MouseControlledViewportAdjustment({get_world_bounds: () => world.get_bounds()})(invert_zoom);
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

  const on_resize = (width_, height_) => {
    viewport_adjustment_strategy.on_resize(width_, height_);
  }

  let magnetic_repulsor_view;
  let particle_spawner_view;
  let wall_views;
  let kite_views;


  const {translate} = viewport_adjustment_strategy;

  const init = () => {
    const actors = get_actors();

    magnetic_repulsor_view = particles_view(p)(translate)(actors.magnetic_repulsor.get_particles);
    particle_spawner_view = particles_view(p)(translate)(actors.particle_spawner.get_particles);
    wall_views = [];
    kite_views = [];
    for (let i = 0; i < actors.walls.length; i++) {
      wall_views.push(wall_view(p)(translate)(actors.walls[i]));
    }
    for (let i = 0; i < actors.kites.length; i++) {
      kite_views.push(kite_renderer(p)(translate)(actors.kites[i]));
    }
  }

  const render = () => {
    for (let cur of wall_views) {
      cur.drawWall();
    }
    for (let cur of kite_views) {
      cur();
    }
    magnetic_repulsor_view.drawParticles();
    particle_spawner_view.drawParticlesFunk();
    particle_spawner_view.drawParticles();
  }

  return {
    init,
    render,
    on_resize, mousePressed,
    mouseDragged, mouseReleased, mouseWheel,mouseMoved
  }
}

const scene_renderers = (p) => (world) => (get_actors: () => {kites: IActor[], magnetic_repulsor: IActor, particle_spawner: IActor, walls: IActor[]}) => {
  let scene_renderer = renderer(p)(world)(get_actors)();
  let scene_renderer_2 = renderer(p)(world)(get_actors)(true);
  const mousePressed = () => {
    scene_renderer.mousePressed();
    scene_renderer_2.mousePressed();
  }

  const mouseDragged = () => {
    scene_renderer.mouseDragged();
    scene_renderer_2.mouseDragged();
  }

  const mouseReleased = () => {
    scene_renderer.mouseReleased();
    scene_renderer_2.mouseReleased();
  }

  const mouseWheel = (event) => {
    scene_renderer.mouseWheel(event);
    scene_renderer_2.mouseWheel(event);
  }

  const mouseMoved = () => {
    scene_renderer.mouseMoved();
    scene_renderer_2.mouseMoved();
  }

  const on_resize = (width_, height_) => {
    scene_renderer.on_resize(width_, height_);
    scene_renderer_2.on_resize(width_, height_);
  }
  const init = () => {
    scene_renderer.init();
    scene_renderer_2.init();
  }
  const render = () => {
    scene_renderer.render();
    scene_renderer_2.render();
  }
  return {
    init,
    render,
    on_resize, mousePressed,
    mouseDragged, mouseReleased, mouseWheel,mouseMoved
  }
}

export const swingy_christmas_bulb_scene = (p: p5) => {
  const surface_friction = 0.9; // 0 to 1
  const amount_walls = 10;
  const amount_kites = 5;

  let walls = [];
  let kites = [];
  let particle_spawner;
  let magnetic_repulsor;

  let world = new GravityWorld(400);

  let scene_renderer = scene_renderers(p)(world)(() => ({kites, magnetic_repulsor, particle_spawner, walls}));

  const preload = () => {
  }

  const setup = () => {
    const min_x = p.windowWidth * 1 / 4;
    const max_x = p.windowWidth * 3 / 4;

    particle_spawner = new RandomParticleSpawner(0, p.windowWidth, 0, p.windowHeight, 100, 150, 3, 12);

    for (let i = 0; i < amount_kites; i++) {
      const kite = new Kite(p);
      kites.push(kite);
      world.add_actor(kite);

    }
    for (let i = 0; i < amount_walls; i++) {
      const wall = new Wall(
        create_random_particle(0, p.windowWidth, p.windowHeight * 0 / 6,p.windowHeight * 6 / 6, true),
        create_random_particle(0, p.windowWidth, p.windowHeight * 0 / 6,p.windowHeight * 6 / 6, true),
        10
      );
      walls.push(wall);
      world.add_actor(wall);
    }

    const repulsor_center_vector = randomVector(min_x, max_x, p.windowHeight * 5 / 6,p.windowHeight * 6 / 6);
    const repulsor_center = new Particle(repulsor_center_vector.x, repulsor_center_vector.y, new p5.Vector().set(0, 0), true);
    magnetic_repulsor = new MagneticRepulsor(repulsor_center, () => world.get_particles(), -20);

    world.add_actor(magnetic_repulsor);
    world.add_actor(particle_spawner);
    scene_renderer.init();
  }

  const draw = (time_slice) => {
    world.update(time_slice, surface_friction);
    scene_renderer.render();
  }

  return ({
    preload,
    setup,
    draw,
    ...scene_renderer
  })
}