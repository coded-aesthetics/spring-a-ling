/// <reference path="../global.d.ts" />

import p5 from 'p5';
import { BouncySolid } from './model/bouncy-solid';
import { bouncy_solid_view } from './view/bouncy-solid.view';

var sketch = function (p: p5) {
  // let ding: p5.SoundFile

  let then = Date.now();

  let bouncy_solid;
  let bouncy_solid_renderer;

  const fr = 60.0;
  const surface_friction = 25;

  p.preload = () => {
    // const DING_FILE = require("./ding.mp3").default
    // ding = new p5.SoundFile(DING_FILE)
  }

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight-20);
    p.frameRate(fr);

    bouncy_solid = new BouncySolid(new p5.Vector().set(Math.random()* window.innerWidth, Math.random()* window.innerHeight), 80, 120);
    bouncy_solid_renderer = bouncy_solid_view(p);
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight-20);
  }

  p.draw = function () {
    const deltaTime = (Date.now() - then);
    p.background(0);

    const time_slice = deltaTime / 1000;

    bouncy_solid.update(time_slice, 1/surface_friction);
    bouncy_solid_renderer.drawBouncySolid(bouncy_solid);

    then = Date.now();
  }
}

new p5(sketch)
