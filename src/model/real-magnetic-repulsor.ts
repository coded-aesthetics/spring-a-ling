import p5 from 'p5';
import { IParticle } from '../interfaces';
import { particle_dist } from './particle-utils';

export function RealMagneticRepulsor(particle_center, get_particles: () => IParticle[], force) {
    const apply_force_on_particles = (time_slice) => {
        get_particles().forEach(moving => {
           const dist = particle_dist(particle_center, moving);
           const direction = p5.Vector.sub(moving.pos, particle_center.pos).normalize();
           moving.apply_force(direction.mult(force * time_slice / Math.max(dist, 1)));
        })
    }

    this.act = function(time_slice) {
      apply_force_on_particles(time_slice);
    }

    this.get_particles = function() {
        return [particle_center];
    }
}