import p5 from 'p5';
import { Particle } from './particle';
import { calculate_centroid, polar_to_cartesian } from './particle-utils';
import { Spring } from './spring';
import Delaunay from 'delaunay-fast';

const create_delaunay_solid = (radius, amount_vertices) => {
    const vertices = [];
    for (let i = 0; i < amount_vertices; i++) {
        vertices.push([Math.random() * radius - radius/2, Math.random() * radius - radius/2])
    }
    const triangles = Delaunay.triangulate(vertices);
    return {vertices, triangles};
}

export function DelaunaySolid(vector_center_, min_radius_, max_radius_, amount_vertices = 10) {
    this.vector_center_world = vector_center_;
    this.particle_center_world = new Particle(this.vector_center_world.x, this.vector_center_world.y)

    this.springs = [];

    const {vertices, triangles} = create_delaunay_solid(200, 15);
    const particles = vertices.map(x => new Particle(x[0] + this.vector_center_world.x, x[1] + this.vector_center_world.y));

    for (let i = 0; i < triangles.length; i+=3) {
      const particle_1 = particles[triangles[i]];
      const particle_2 = particles[triangles[i + 1]];
      const particle_3 = particles[triangles[i + 2]];
      const length_1 = p5.Vector.sub(particle_1.pos, particle_2.pos).mag();
      const length_2 = p5.Vector.sub(particle_2.pos, particle_3.pos).mag();
      const length_3 = p5.Vector.sub(particle_3.pos, particle_1.pos).mag();

      this.springs.push(new Spring(particle_1, particle_2, length_1, 15))
      this.springs.push(new Spring(particle_2, particle_3, length_2, 15))
      this.springs.push(new Spring(particle_3, particle_1, length_3, 15))
    }

    this.update = function(time_slice, surface_smoothness) {
        this.springs.forEach(x => x.update(time_slice, surface_smoothness));
    }
};