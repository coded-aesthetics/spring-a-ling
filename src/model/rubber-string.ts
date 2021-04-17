import p5 from 'p5';
import { IParticle } from '../interfaces';
import { particle_dist_2 } from './particle-utils';

export function RubberString(particle_center_, connected_particle_, tension_) {
    this.particle_center = particle_center_;
    this.connected_particle = connected_particle_;
    this.tension = tension_;
    const act_on_particle = (stationary, moving, time_slice) => {
      const dist = particle_dist_2(stationary, moving);
      const direction = p5.Vector.sub(stationary.pos, moving.pos).normalize();
      moving.act(direction.mult(this.tension * time_slice * dist));
    }
    this.act = function(time_slice) {
      act_on_particle(this.particle_center, this.connected_particle, time_slice);
      act_on_particle(this.connected_particle, this.particle_center, time_slice);
    }
    this.get_particles = function(): IParticle[] {
      return [this.particle_center, this.connected_particle];
    };
  }
