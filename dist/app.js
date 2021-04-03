(function() {
  var f = window.__fuse = window.__fuse || {};
  var modules = f.modules = f.modules || {}; f.dt = function (x) { return x && x.__esModule ? x : { "default": x }; };

f.modules = modules;
  f.bundle = function(collection, fn) {
    for (var num in collection) {
      modules[num] = collection[num];
    }
    fn ? fn() : void 0;
  };
  f.c = {};
  f.r = function(id) {
    var cached = f.c[id];
    if (cached) return cached.m.exports;
    var module = modules[id];
    if (!module) {
      
      throw new Error('Module ' + id + ' was not found');
    }
    cached = f.c[id] = {};
    cached.exports = {};
    cached.m = { exports: cached.exports };
    module(f.r, cached.exports, cached.m);
    return cached.m.exports;
  }; 
})();
__fuse.bundle({

// src/particle.ts @4
4: function(__fusereq, exports, module){
exports.__esModule = true;
var p5_1 = __fusereq(5);
var p5_1d = __fuse.dt(p5_1);
function Particle(x_, y_, velocity_ = new p5_1d.default.Vector().set(0, 0)) {
  this.velocity = velocity_;
  this.pos = new p5_1d.default.Vector().set(x_, y_);
  this.nudge = function (dx, dy) {
    return new Particle(x_ + dx, y_ + dy, velocity_);
  };
  this.act = function (velocity) {
    this.velocity.add(velocity);
  };
  this.update = function (time_slice, surface_smoothness) {
    this.velocity.mult(1 - (1 - surface_smoothness) * time_slice);
    this.pos.add(p5_1d.default.Vector.mult(this.velocity, time_slice));
  };
  this.emit_particles = function (amount) {
    const particles = [];
    for (let i = 0; i < amount; i++) {
      particles.push(new Particle(this.pos.x, this.pos.y, p5_1d.default.Vector.add(this.velocity, new p5_1d.default.Vector().set(Math.random() * 1000 - 500, Math.random() * 1000 - 500))));
    }
    return particles;
  };
}
exports.Particle = Particle;

},

// src/spring-ring.ts @6
6: function(__fusereq, exports, module){
exports.__esModule = true;
var particle_utils_1 = __fusereq(8);
var spring_1 = __fusereq(9);
function SpringRing(amount) {
  this.springs = [];
  let particles = particle_utils_1.create_random_particles(amount, 0, window.innerWidth, 0, window.innerHeight);
  let sorted_particles = particle_utils_1.sort_particles_by_vicinity(particles);
  for (let i = 0; i < sorted_particles.length - 1; i++) {
    this.springs.push(new spring_1.Spring(sorted_particles[i], sorted_particles[i + 1], Math.random() * 0.0025));
  }
  this.springs.push(new spring_1.Spring(sorted_particles[sorted_particles.length - 1], sorted_particles[0], Math.random() * 0.0025));
  this.update = function (time_slice, surface_smoothness) {
    this.springs.forEach(spring => spring.update(time_slice, surface_smoothness));
  };
}
exports.SpringRing = SpringRing;

},

// src/sketch.ts @1
1: function(__fusereq, exports, module){
exports.__esModule = true;
var particle_1 = __fusereq(4);
var p5_1 = __fusereq(5);
var p5_1d = __fuse.dt(p5_1);
var spring_ring_1 = __fusereq(6);
var sketch = function (p) {
  let then = Date.now();
  let springRing;
  let particle;
  const fr = 60.0;
  const surface_friction = 5;
  function calculate_centroid(vectors) {
    const sumVector = vectors.reduce((acc, cur) => p5_1d.default.Vector.add(acc, cur), p.createVector(0, 0));
    return sumVector.mult(1 / vectors.length);
  }
  function drawSpringRing(springRing) {
    springRing.springs.forEach((spring, index) => drawParticle(spring.particle_center, (index + 1) * 3));
    for (let i = 0; i < springRing.springs.length - 1; i++) {
      drawLine(springRing.springs[i].particle_center, springRing.springs[i + 1].particle_center);
    }
    drawLine(springRing.springs[springRing.springs.length - 1].particle_center, springRing.springs[0].particle_center);
  }
  function drawParticle(particle, size = 10, color = 255) {
    p.fill(color);
    p.ellipse(particle.pos.x, particle.pos.y, size, size);
  }
  function drawParticleFunk(particle) {
    const radius = particle.velocity.mag() / 50;
    p.fill(Math.abs(Math.round(particle.velocity.x / 10)), Math.abs(Math.round(particle.velocity.y / 10)), radius * 5);
    p.ellipse(particle.pos.x, particle.pos.y, radius, radius);
  }
  function drawParticleFunk2(particle) {
    p.stroke(0, 0, 0, 1.0);
    const radius = particle.velocity.mag() / 10;
    p.fill(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
    p.ellipse(particle.pos.x, particle.pos.y, radius, radius);
  }
  function drawSpring(spring) {
    drawParticle(spring.particle_center);
  }
  function drawLine(part1, part2) {
    p.stroke(255);
    p.line(part1.pos.x, part1.pos.y, part2.pos.x, part2.pos.y);
  }
  let particles = [];
  p.preload = () => {};
  p.setup = function () {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.frameRate(fr);
    springRing = new spring_ring_1.SpringRing(50);
    particle = new particle_1.Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, p.createVector(Math.random() * window.innerWidth - window.innerWidth / 2, Math.random() * 1000 - 500));
  };
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
  p.draw = function () {
    const deltaTime = Date.now() - then;
    p.background(0);
    const time_slice = deltaTime / 1000;
    springRing.update(time_slice, 1 / surface_friction);
    drawSpringRing(springRing);
    particles.forEach(part => part.update(time_slice, 1 / surface_friction));
    particles.forEach(drawParticleFunk);
    then = Date.now();
  };
};
new p5_1d.default(sketch);

},

// src/particle-utils.ts @8
8: function(__fusereq, exports, module){
exports.__esModule = true;
var p5_1 = __fusereq(5);
var p5_1d = __fuse.dt(p5_1);
var particle_1 = __fusereq(4);
function particle_dist_2(p, p2) {
  const distVec = p5_1d.default.Vector.sub(p.pos, p2.pos);
  return distVec.magSq();
}
exports.particle_dist_2 = particle_dist_2;
function particle_dist(p, p2) {
  return p.pos.dist(p2.pos);
}
exports.particle_dist = particle_dist;
function create_random_particles(amount, minX, maxX, minY, maxY) {
  let particles = [];
  for (let i = 0; i < amount; i++) {
    particles.push(new particle_1.Particle(Math.random() * (maxX - minX) - minX, Math.random() * (maxY - minY) - minY));
  }
  return particles;
}
exports.create_random_particles = create_random_particles;
function sort_particles_by_vicinity(particles) {
  let sorted_particles = [];
  sorted_particles.push(particles[0]);
  for (let i = 0; i < particles.length - 1; i++) {
    const restArray = particles.slice(i + 1);
    restArray.sort((a, b) => particle_dist(a, particles[i]) - particle_dist(b, particles[i]));
    sorted_particles.push(restArray[0]);
    particles = sorted_particles.concat(restArray.slice(1));
  }
  return sorted_particles;
}
exports.sort_particles_by_vicinity = sort_particles_by_vicinity;

},

// src/spring.ts @9
9: function(__fusereq, exports, module){
exports.__esModule = true;
var p5_1 = __fusereq(5);
var p5_1d = __fuse.dt(p5_1);
var particle_utils_1 = __fusereq(8);
function Spring(particle_center_, connected_particle_, tension_) {
  this.particle_center = particle_center_;
  this.connected_particle = connected_particle_;
  this.tension = tension_;
  this.update = function (time_slice, surface_smoothness) {
    const dist = particle_utils_1.particle_dist_2(this.particle_center, this.connected_particle);
    const direction = p5_1d.default.Vector.sub(this.particle_center.pos, this.connected_particle.pos).normalize();
    this.connected_particle.act(direction.mult(this.tension * time_slice * dist));
    this.connected_particle.update(time_slice, surface_smoothness);
    this.particle_center.update(time_slice, surface_smoothness);
  };
}
exports.Spring = Spring;

}
})
//# sourceMappingURL=app.js.map