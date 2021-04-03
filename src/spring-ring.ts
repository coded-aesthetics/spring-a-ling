import { create_random_particles, sort_particles_by_vicinity } from './particle-utils';
import { Spring } from './spring';

export function SpringRing(amount, sort = true) {
    // const centerSpring = new Spring(new Particle(Math.random()* window.innerWidth, Math.random()* window.innerHeight), Math.random() * 0.0025);
    this.springs = [];
    let particles = create_random_particles(amount, 0, window.innerWidth, 0, window.innerHeight);
    let sorted_particles = sort ? sort_particles_by_vicinity(particles) : particles;
    for (let i = 0; i < sorted_particles.length - 1; i++) {
      this.springs.push(new Spring(sorted_particles[i], sorted_particles[i + 1], Math.random() * 0.075));
    }
    this.springs.push(new Spring(sorted_particles[sorted_particles.length - 1], sorted_particles[0], Math.random() * 0.075));

    this.update = function(time_slice, surface_smoothness) {
      this.springs.forEach(spring =>
        spring.update(time_slice, surface_smoothness)
      );
    }
  }