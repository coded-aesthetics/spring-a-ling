let particle, particle2, particle3;

let then = Date.now();

let spring;
let spring2;
let spring3;
let spring4;

const fr = 60.0;
const surface_friction = 2.5;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(fr);

  spring = new Spring(new Particle(Math.random()* window.innerWidth, Math.random()* window.innerHeight), Math.random() * 0.1);

  spring2 = new Spring(new Particle(Math.random()* window.innerWidth, Math.random()* window.innerHeight), Math.random() * 0.1);
  spring3 = new Spring(new Particle(Math.random()* window.innerWidth, Math.random()* window.innerHeight), Math.random() * 0.1);
  spring4 = new Spring(new Particle(Math.random()* window.innerWidth, Math.random()* window.innerHeight), Math.random() * 0.1);
  particle = new Particle(Math.random()* window.innerWidth, Math.random()* window.innerHeight, createVector(Math.random()* window.innerWidth - window.innerWidth/2, Math.random()* 1000 -500));
}

function Particle(x_, y_, velocity_ = createVector(0,0)) {
  this.velocity = velocity_;
  this.pos = createVector(x_ , y_);
  this.nudge = function (dx, dy) {
    return new Particle(x_ + dx, y_ + dy, velocity_);
  }
  this.act = function (velocity) {
    this.velocity.add(velocity);
  }
  this.update = function (time_slice, friction) {
    this.velocity.mult(1- ((1 - friction) * time_slice));
    // this.velocity.mult(friction);
    this.pos.add(p5.Vector.mult(this.velocity, time_slice));
  }
  this.emit_particles = function(amount) {
    const particles = [];
    for (let i = 0; i < amount; i++) {
      particles.push(
        new Particle(this.pos.x, this.pos.y,
          p5.Vector.add(this.velocity, createVector(
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500)
          ))
        );
    }
    return particles;
  }
}

function Spring(particle_center_, tension_) {
  this.particle_center = particle_center_;
  this.tension = tension_;
  this.act_on_particle = function(particle, time_slice) {
    const dist = particleDist2(this.particle_center, particle);
    const direction = p5.Vector.sub(this.particle_center.pos, particle.pos).normalize();
    particle.act(direction.mult(this.tension * time_slice * dist));
  }
}

function particleDist2 (p, p2) {
  const distVec = p5.Vector.sub(p.pos, p2.pos);
  return distVec.magSq();
}

function particleDist (p, p2) {
  return p.pos().dist(p2.pos());
}

function drawParticle(particle) {
    fill(255);
    ellipse(particle.pos.x, particle.pos.y, 10, 10)
  }

function drawParticleFunk(particle) {
  const radius = particle.velocity.mag() / 50;
  fill(Math.abs(Math.round(particle.velocity.x/10,)), Math.abs(Math.round(particle.velocity.y/10,)) ,radius*5);
  ellipse(particle.pos.x, particle.pos.y, radius, radius)
}

function drawParticleFunk2(particle) {
  stroke(0, 0, 0, 1.0);
  const radius = particle.velocity.mag() / 10;
  // Math.random() > 0.5 ? fill(radius * 5, 0 ,radius * 5) : fill(0, radius * 5 ,0);
  fill(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
  ellipse(particle.pos.x, particle.pos.y, radius, radius)
}


function drawSpring(spring) {
  drawParticle(spring.particle_center);
}

function drawLine(p, p2) {
  stroke(255);
  line(p.pos.x, p.pos.y, p2.pos.x, p2.pos.y);
}

let particles = [];

function draw() {
  const deltaTime = (Date.now() - then);
  background(0);

  const time_slice = deltaTime / 1000;

  spring.act_on_particle(particle, time_slice);
  spring2.act_on_particle(particle, time_slice);
  spring3.act_on_particle(particle, time_slice);
  spring4.act_on_particle(particle, time_slice);

  particle.update(time_slice, 1 / surface_friction);
  drawParticleFunk(particle);
  drawSpring(spring);
  drawSpring(spring2);
  drawSpring(spring3);
  drawSpring(spring4);
  drawLine(spring.particle_center, particle);
  drawLine(spring2.particle_center, particle);
  drawLine(spring3.particle_center, particle);
  drawLine(spring4.particle_center, particle);


  particles.forEach(p => p.update(time_slice, 1 / surface_friction))
  particles.forEach(drawParticleFunk)

  then = Date.now();
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode === ENTER) {
    particles = particles.concat(particle.emit_particles(18));
  }
  if (keyCode === 32) {
    particles = [];
  }
}
