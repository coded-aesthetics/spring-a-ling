import { Particle } from './particle';
import { randomVector } from './utils';

export function RandomParticleSpawner(min_x, max_x, min_y, max_y, min_amount_particles, max_amount_particles, min_ttl_seconds, max_ttl_seconds) {
    let particles = [];

    const spawn_particle = () => {
        const vector = randomVector(min_x, max_x, min_y, max_y);
        const particle = new Particle(vector.x, vector.y);
        const ttl = Math.random() * (max_ttl_seconds - min_ttl_seconds) + min_ttl_seconds;
        particles.push({ttl, particle});
    }

    const spawn_particles = () => {
        const max_amount_particles_to_spawn = particles.length >= max_amount_particles ? 0 : max_amount_particles - particles.length;
        const min_amount_particles_to_spawn = particles.length >= min_amount_particles ? 0 : Math.max(0, min_amount_particles - particles.length);

        const amount_particles_to_spawn = Math.round(Math.random() * (max_amount_particles_to_spawn - min_amount_particles_to_spawn)) + min_amount_particles_to_spawn;

        for (let i = 0; i < amount_particles_to_spawn; i++) {
            spawn_particle();
        }
    }

    spawn_particles();

    this.act = function(time_slice) {
        spawn_particles();
        particles.forEach(particle => particle.ttl -= time_slice);
        particles = particles.filter(particle => particle.ttl > 0);
      }

      this.get_particles = function() {
          return particles.map(particle => particle.particle);
      }
}