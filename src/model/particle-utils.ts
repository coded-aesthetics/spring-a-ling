import p5 from 'p5';
import { Particle } from './particle';

export function particle_dist_2 (p, p2) {
    const distVec = p5.Vector.sub(p.pos, p2.pos);
    return distVec.magSq();
  }

  export function particle_dist (p, p2) {
    return p.pos.dist(p2.pos);
  }

  export function create_random_particle(minX, maxX, minY, maxY, fixed = false) {
    return new Particle((Math.random()* (maxX - minX)) + minX, (Math.random()* (maxY - minY)) + minY, new p5.Vector().set(0,0), fixed);
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

  export function calculate_centroid(vectors) {
    const sumVector = vectors.reduce((acc, cur) => p5.Vector.add(acc, cur), new p5.Vector().set(0, 0))
    return sumVector.mult(1 / vectors.length);
  }

  export function polar_to_cartesian({ r, theta }) {
    let x = r * Math.cos(theta);
    let y = r * Math.sin(theta);
    return new p5.Vector().set(x, y);
  }

  export function cartesian_to_polar({x, y}){
    const r = Math.sqrt(x*x + y*y)
    const theta = Math.atan2(y,x) //This takes y first
    return { r, theta }
}