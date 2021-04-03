import p5 from 'p5';
import { particle_dist_2 } from './particle-utils';

export function Spring(particle_center_, connected_particle_, tension_) {
    this.particle_center = particle_center_;
    this.connected_particle = connected_particle_;
    this.tension = tension_;
    this.update = function(time_slice, surface_smoothness) {
      const dist = particle_dist_2(this.particle_center, this.connected_particle);
      const direction = p5.Vector.sub(this.particle_center.pos, this.connected_particle.pos).normalize();
      this.connected_particle.act(direction.mult(this.tension * time_slice * dist));
      this.connected_particle.update(time_slice, surface_smoothness);
      this.particle_center.update(time_slice, surface_smoothness);
    }
  }
