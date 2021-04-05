/// <reference path="../global.d.ts" />

import p5 from 'p5';
import { DelaunaySolid } from './model/delaunay-solid';
import { Particle } from './model/particle';
import { Spring } from './model/spring';
import { SpringySolid } from './model/springy-solid';
import { spring_view } from './view/spring.view';
import { springy_solid_view } from './view/springy-solid.view';

var sketch = function (p: p5) {
  // let ding: p5.SoundFile

  let then = Date.now();

  let springy_solid;
  let springy_solid_renderer;

  const fr = 60.0;
  const surface_friction = 25;

  p.preload = () => {
    // const DING_FILE = require("./ding.mp3").default
    // ding = new p5.SoundFile(DING_FILE)
  }

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight-20);
    p.frameRate(fr);

    springy_solid = new DelaunaySolid(new p5.Vector().set(Math.random()* window.innerWidth, Math.random()* window.innerHeight), 80, 120,7);
    springy_solid_renderer = springy_solid_view(p);
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight-20);
  }

  p.draw = function () {
    const deltaTime = (Date.now() - then);
    p.background(0);

    const time_slice = deltaTime / 1000;

    springy_solid.springs.forEach(x => x.particle_center.act(new p5.Vector().set(0, 5)))
    springy_solid.springs.forEach(x => x.particle_center.velocity =  x.particle_center.pos.y > p.windowHeight-50 ?  x.particle_center.velocity.reflect(new p5.Vector().set(0, -1)) : x.particle_center.velocity)

    springy_solid.update(time_slice, 1/surface_friction);
    springy_solid_renderer.drawSpringySolid(springy_solid);

    then = Date.now();
  }
}

new p5(sketch)
