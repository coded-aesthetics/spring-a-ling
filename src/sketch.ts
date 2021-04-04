/// <reference path="../global.d.ts" />
import {Particle} from './particle';
import p5 from 'p5';
import { SpringRing } from './spring-ring';
import { BouncyBlob } from './bouncy-blob';

var sketch = function (p: p5) {
  // let ding: p5.SoundFile

  let then = Date.now();

  let springRing;
  let particle;

  const fr = 60.0;
  const surface_friction = 25;

function drawSpringRing(springRing) {
  springRing.springs.forEach((spring, index) => drawParticleFunk(spring.particle_center));
  for (let i = 0; i < springRing.springs.length - 1; i++) {
    drawLine(springRing.springs[i].particle_center, springRing.springs[i + 1].particle_center)
  }
  drawLine(springRing.springs[springRing.springs.length - 1].particle_center, springRing.springs[0].particle_center);
}

function drawBouncyBlob(bouncyBlob) {
  drawSpringRing(bouncyBlob.springRing);
}

  function drawParticle(particle, size = 10, color = 255) {
    p.fill(color);
    p.ellipse(particle.pos.x, particle.pos.y, size, size)
  }

function drawParticleFunk(particle) {
  p.stroke(0, 0, 0, 1.0);
  const radius = particle.velocity.mag() / 5;
  p.fill(Math.abs(Math.round(particle.velocity.x/2,)), Math.abs(Math.round(particle.velocity.y/2,)) ,radius*5);
  p.ellipse(particle.pos.x, particle.pos.y, radius, radius)
}

function drawParticleFunk2(particle) {
  p.stroke(0, 0, 0, 1.0);
  const radius = particle.velocity.mag() / 10;
  // Math.random() > 0.5 ? fill(radius * 5, 0 ,radius * 5) : fill(0, radius * 5 ,0);
  p.fill(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
  p.ellipse(particle.pos.x, particle.pos.y, radius, radius)
}

function drawSpring(spring) {
  drawParticle(spring.particle_center);
}

function drawLine(part1, part2) {
  p.stroke(255);
  p.line(part1.pos.x, part1.pos.y, part2.pos.x, part2.pos.y);
}

let particles = [];

  p.preload = () => {
    // const DING_FILE = require("./ding.mp3").default
    // ding = new p5.SoundFile(DING_FILE)
  }

  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight-20);
    p.frameRate(fr);

    springRing = new BouncyBlob(10);

    particle = new Particle(Math.random()* window.innerWidth, Math.random()* window.innerHeight, p.createVector(Math.random()* window.innerWidth - window.innerWidth/2, Math.random()* 1000 -500));
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight-20);
  }

  p.draw = function () {
    const deltaTime = (Date.now() - then);
    p.background(0);

    const time_slice = deltaTime / 1000;

    springRing.update(time_slice, 1 / surface_friction)

    drawBouncyBlob(springRing);
    springRing.springRing.springs.forEach(x => x.particle_center.act(new p5.Vector().set(0, 2)))
    springRing.springRing.springs.forEach(x => x.particle_center.velocity =  x.particle_center.pos.y > p.windowHeight-50 ?  x.particle_center.velocity.reflect(new p5.Vector().set(0, -1)) : x.particle_center.velocity)

    particles.forEach(part => part.update(time_slice, 1 / surface_friction))
    particles.forEach(drawParticleFunk)

    then = Date.now();
  }
}

new p5(sketch)
