import p5 from 'p5';
import { particle_dist, particle_dist_2 } from './particle-utils';

export function Repeller(particle_center_, connected_particle_, repelling_force_) {
    this.particle_center = particle_center_;
    this.connected_particle = connected_particle_;
    this.repelling_force = repelling_force_;
    const act_on_particle = (stationary, moving, time_slice, surface_smoothness) => {
      const dist = particle_dist(stationary, moving);
      const direction = p5.Vector.sub(moving.pos, stationary.pos).normalize();
      moving.act(direction.mult(this.repelling_force * time_slice * Math.sqrt(dist)));
      moving.update(time_slice, surface_smoothness);
    }
    this.update = function(time_slice, surface_smoothness) {
      act_on_particle(this.particle_center, this.connected_particle, time_slice, surface_smoothness);
    }
  }
