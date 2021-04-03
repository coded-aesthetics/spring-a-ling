import p5 from 'p5';
import { Particle } from './particle';

export function particle_dist_2 (p, p2) {
    const distVec = p5.Vector.sub(p.pos, p2.pos);
    return distVec.magSq();
  }

  export function particle_dist (p, p2) {
    return p.pos.dist(p2.pos);
  }

export function create_random_particles(amount, minX, maxX, minY, maxY) {
    let particles = [];
    for (let i = 0; i < amount; i++) {
      particles.push(new Particle((Math.random()* (maxX - minX)) - minX, (Math.random()* (maxY - minY)) - minY));
    }
    return particles;
  }

export function sort_particles_by_vicinity(particles) {
    let sorted_particles = [];
    sorted_particles.push(particles[0]);
    for (let i = 0; i < particles.length - 1; i++) {
      const restArray = particles.slice( i + 1 );
      restArray.sort((a, b) => particle_dist(a, particles[i]) - particle_dist(b, particles[i]))
      sorted_particles.push(restArray[0]);
      particles = sorted_particles.concat(restArray.slice(1));
    }
    return sorted_particles;
  }