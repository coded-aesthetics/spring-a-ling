import p5 from 'p5';

export function Particle(x_, y_, velocity_ = new p5.Vector().set(0,0), stationary = false) {
  this.velocity = velocity_;
  this.pos = new p5.Vector().set(x_ , y_);

  this.act = function (velocity) {
    if (stationary) return;
    this.velocity.add(velocity);
  }

  this.update = function (time_slice, surface_smoothness) {
    if (stationary) return;
    this.velocity.mult(1- ((1 - surface_smoothness) * time_slice));
    this.pos.add(p5.Vector.mult(this.velocity, time_slice));
  }

  this.emit_particles = function(amount) {
    const particles = [];
    for (let i = 0; i < amount; i++) {
      particles.push(
        new Particle(this.pos.x, this.pos.y,
          p5.Vector.add(this.velocity, new p5.Vector().set(
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500)
          ))
        );
    }
    return particles;
  }
}