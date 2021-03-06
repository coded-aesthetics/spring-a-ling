import { IParticle } from '../interfaces';
import { create_random_particles, sort_particles_by_vicinity } from './particle-utils';
import { RubberString } from './rubber-string';

export function RubberBand(amount, sort = true) {
    this.springs = [];

    let particles = create_random_particles(amount, 0, window.innerWidth, 0, window.innerHeight);
    let sorted_particles = sort ? sort_particles_by_vicinity(particles) : particles;
    for (let i = 0; i < sorted_particles.length - 1; i++) {
      this.springs.push(new RubberString(sorted_particles[i], sorted_particles[i + 1], Math.random() * 0.1));
    }
    this.springs.push(new RubberString(sorted_particles[sorted_particles.length - 1], sorted_particles[0], Math.random() * 0.1));

    this.act = function(time_slice) {
      this.springs.forEach(spring =>
        spring.act(time_slice)
      );
    }
    this.get_particles = function(): IParticle[] {
      return this.springs.map(spring => spring.get_particles()).reduce((acc, cur) => acc.concat(cur), []);
    }
  }