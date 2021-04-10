/// <reference path="../global.d.ts" />

import p5 from 'p5';
import { DelaunaySolid } from './model/delaunay-solid';
import { nervous_christmas_tree_scene } from './scenes/nervous-christmas-tree.scene';
import { swingy_christmas_bulb_scene } from './scenes/swingy-christmas-bulb.scene';
import { springy_solid_view } from './view/springy-solid.view';

var sketch = function (p: p5) {
  // let ding: p5.SoundFile

  let then = Date.now();

  const fr = 60.0;

  const layers = [
    swingy_christmas_bulb_scene(p)
  ]

  p.preload = () => {
    // const DING_FILE = require("./ding.mp3").default
    // ding = new p5.SoundFile(DING_FILE)
    layers.forEach(scene => scene.preload());
  }

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight-20);
    p.frameRate(fr);
    layers.forEach(scene => scene.setup());
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight-20);
  }

  p.draw = function () {
    const deltaTime = (Date.now() - then);
    p.background(0);

    const time_slice = deltaTime / 1000;

    layers.forEach(scene => scene.draw(time_slice));

    then = Date.now();
  }
}

new p5(sketch)
