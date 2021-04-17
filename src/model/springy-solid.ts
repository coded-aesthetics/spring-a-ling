import p5 from 'p5';
import { IParticle } from '../interfaces';
import { Particle } from './particle';
import { calculate_centroid, polar_to_cartesian } from './particle-utils';
import { Spring } from './spring';

const create_solid = (min_radius_, max_radius_, amount_vertices) => {
    const vertices_polar = [];
    for (let i = 0; i < amount_vertices; i++) {
        const r = Math.random() * ( max_radius_ - min_radius_) + min_radius_;
        const min_theta = (i + 0.25) * 2 * Math.PI / amount_vertices;
        const max_theta = (i + 0.75) * 2 * Math.PI / amount_vertices;
        const theta = Math.random() * ( max_theta - min_theta) + min_theta;
        vertices_polar.push({r, theta});
    }
    const vectors_cartesian = vertices_polar.map(polar_to_cartesian);
    const centroid = calculate_centroid(vectors_cartesian);
    // make centroid ursprung of local coordinate system
    return { centroid, vectors_cartesian: vectors_cartesian.map(x => p5.Vector.sub(x, centroid)) }
}

export function SpringySolid(vector_center_, min_radius_, max_radius_, amount_vertices = 10) {
    this.vector_center_world = vector_center_;
    this.particle_center_world = new Particle(this.vector_center_world.x, this.vector_center_world.y)

    this.springs = [];

    const solid = create_solid(min_radius_, max_radius_, amount_vertices);
    const particles_world = solid.vectors_cartesian.map(x => new Particle(x.x + vector_center_.x, x.y + vector_center_.y));
    particles_world.push(particles_world[0]);

    for (let i = 0; i < particles_world.length - 1; i++) {
      const coors = particles_world[i]
      const coors2 = particles_world[i + 1]
      const length = p5.Vector.sub(coors2.pos, coors.pos).mag();
      this.springs.push(new Spring(coors, coors2, length, 7))
      const length_center = p5.Vector.sub(coors.pos, this.vector_center_world).mag();
      this.springs.push(new Spring(this.particle_center_world, coors, length_center, 3))
    }

    this.get_vertices_cartesian = function() {
        return this.vertices_polar.map(polar_to_cartesian);
    }

    this.get_vertices_cartesion_world = function() {
        return this.vertices_polar.map(polar_to_cartesian).map(vec => p5.Vector.add(vec, this.vector_center_world));
    }

    this.act = function(time_slice) {
        this.springs.forEach(x => x.act(time_slice));
    }

    this.get_particles = function(): IParticle[] {
      return this.springs.map(spring => spring.get_particles()).reduce((acc, cur) => acc.concat(cur), []);
    };
};