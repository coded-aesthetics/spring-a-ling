import p5 from 'p5';
import { particle_dist } from './particle-utils';

export function Repeller(particle_center_, connected_particle_, repelling_force_) {
    this.particle_center = particle_center_;
    this.connected_particle = connected_particle_;
    this.repelling_force = repelling_force_;

    const apply_force_on_particle = (stationary, moving, time_slice) => {
      const dist = particle_dist(stationary, moving);
      const direction = p5.Vector.sub(moving.pos, stationary.pos).normalize();
      moving.apply_force(direction.mult(this.repelling_force * time_slice * Math.sqrt(dist)));
    }

    this.act = function(time_slice) {
      apply_force_on_particle(this.particle_center, this.connected_particle, time_slice);
    }
  }
