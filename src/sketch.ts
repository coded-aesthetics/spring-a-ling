/// <reference path="../global.d.ts" />

import p5 from 'p5';
import { SpringySolid } from './model/springy-solid';
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

    const min_x = window.innerWidth * 1 / 4;
    const max_x = window.innerWidth * 3 / 4;
    const min_y = window.innerHeight * 1 / 6;
    const max_y = window.innerHeight * 2 / 6;

    springy_solid = new SpringySolid(new p5.Vector().set(Math.random()* (max_x - min_x) + min_x, Math.random()* (max_y - min_y) + min_y), 110, 120,7);
    springy_solid_renderer = springy_solid_view(p);
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight-20);
  }

  p.draw = function () {
    const deltaTime = (Date.now() - then);
    p.background(0);

    const time_slice = deltaTime / 1000;

    springy_solid.springs.forEach(x => x.connected_particle.act(new p5.Vector().set(0, 8)))
    const under_0 = springy_solid.springs.find(y => y.particle_center.pos.y > p.windowHeight-100);
    if (under_0) {
      under_0.particle_center.velocity.reflect(new p5.Vector().set(0, -1)).mult(2.3);
      under_0.connected_particle.velocity.reflect(new p5.Vector().set(0, -1)).mult(2.3);
          springy_solid.springs.forEach(x => {
            x.particle_center.velocity = under_0.particle_center.velocity.copy();
            x.connected_particle.velocity = under_0.connected_particle.velocity.copy();
          }
      )
    }

    //springy_solid.springs.forEach(x => x.particle_center.pos.y =  x.particle_center.pos.y > p.windowHeight-200 ?  p.windowHeight-200 : x.particle_center.pos.y)
    springy_solid.springs.forEach(x => x.particle_center.velocity =  x.particle_center.pos.x < 0 ? x.particle_center.velocity.reflect(new p5.Vector().set(1, 0)) : x.particle_center.velocity)

    springy_solid.update(time_slice, 1/surface_friction);
    springy_solid_renderer.drawSpringySolid(springy_solid);

    then = Date.now();
  }
}

new p5(sketch)
