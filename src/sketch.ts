/// <reference path="../global.d.ts" />

import p5 from 'p5';
import { swingy_christmas_bulb_scene } from './scene/swingy-christmas-bulb.scene';

var sketch = function (p: p5) {
  // let ding: p5.SoundFile

  let then = Date.now();

  let fr = 60;

  const layers = [
    swingy_christmas_bulb_scene(p),
  ]

  p.mousePressed = (e) => {
    fr = fr === 10 ? 60 : 10;
    p.frameRate(fr);
    layers.forEach(scene => scene.mousePressed());
  }

  p.mouseDragged = () => {
    layers.forEach(scene => scene.mouseDragged());
  }

  p.mouseReleased = () => {
    layers.forEach(scene => scene.mouseReleased());
  }

  p.mouseMoved = () => {
    layers.forEach(scene => scene.mouseMoved());
  }

  p.mouseWheel = (event) => {
    layers.forEach(scene => scene.mouseWheel(event));
  }

  p.preload = () => {
    // const DING_FILE = require("./ding.mp3").default
    // ding = new p5.SoundFile(DING_FILE)
    layers.forEach(scene => scene.preload());
  }

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight - 20);
    p.frameRate(fr);
    layers.forEach(scene => scene.setup());
    layers.forEach(scene => scene.on_resize(p.windowWidth, p.windowHeight - 20));
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight - 20);
    layers.forEach(scene => scene.on_resize(p.windowWidth, p.windowHeight - 20));
  }

  p.draw = function () {
    const deltaTime = (Date.now() - then);
    then = Date.now();

    p.background(0);

    const time_slice = deltaTime / 1000;

    layers.forEach(scene => scene.draw(time_slice));

  }
}

new p5(sketch)
