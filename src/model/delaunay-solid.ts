import p5 from 'p5';
import { Particle } from './particle';
import { calculate_centroid, polar_to_cartesian } from './particle-utils';
import { Spring } from './spring';
import Delaunay from 'delaunay-fast';
import { RepellerSpring } from './repeller-spring';

const get_triangle_center = (vertex_1, vertex_2, vertex_3) => {
    const middle_of_line = p5.Vector.add(vertex_1, p5.Vector.sub(vertex_2, vertex_1).mult(0.5));
    return p5.Vector.add(vertex_3, p5.Vector.sub(middle_of_line, vertex_3).mult(2.0/3.0));
}

const create_solid = (min_radius_, max_radius_, amount_vertices) => {
    const vertices_polar = [];
    for (let i = 0; i < amount_vertices; i++) {
        const r = Math.random() * ( max_radius_ - min_radius_) + min_radius_;
        const min_theta = (i +0.25) * 2 * Math.PI / amount_vertices;
        const max_theta = (i + 0.75) * 2 * Math.PI / amount_vertices;
        const theta = Math.random() * ( max_theta - min_theta) + min_theta;
        vertices_polar.push({r, theta});
    }
    const vectors_cartesian = vertices_polar.map(polar_to_cartesian);
    const centroid = calculate_centroid(vectors_cartesian);
    // make centroid ursprung of local coordinate system
    for (let i = 0; i < amount_vertices; i++) {
        const vertex_1 = vectors_cartesian[i];
        const vertex_2 = vectors_cartesian[i === amount_vertices - 1 ? 0 : i + 1];
        const triangle_center = get_triangle_center(vertex_1, vertex_2, centroid);
        // calculate middle point of triangles formed by two successive vertices and the centroid
        // and create three new triangles...
        vectors_cartesian.push(triangle_center);
    }

    vectors_cartesian.push(centroid);
    return vectors_cartesian;
}

const create_delaunay_solid = (min_radius_, max_radius_, amount_vertices) => {
    const vertices = create_solid(min_radius_, max_radius_, amount_vertices).map(x => ([x.x, x.y]))
    const triangles = Delaunay.triangulate(vertices);
    return {vertices, triangles};
}

export function DelaunaySolid(vector_center_, min_radius_, max_radius_, amount_vertices = 10) {
    this.vector_center_world = vector_center_;
    this.particle_center_world = new Particle(this.vector_center_world.x, this.vector_center_world.y)

    this.springs = [];

    const {vertices, triangles} = create_delaunay_solid(min_radius_, max_radius_, amount_vertices);
    const particles = vertices.map(x => new Particle(x[0] + this.vector_center_world.x, x[1] + this.vector_center_world.y));
    console.log(triangles)
    for (let i = 0; i < triangles.length; i+=3) {
      const particle_1 = particles[triangles[i]];
      const particle_2 = particles[triangles[i + 1]];
      const particle_3 = particles[triangles[i + 2]];
      const length_1 = p5.Vector.sub(particle_1.pos, particle_2.pos).mag();
      const length_2 = p5.Vector.sub(particle_2.pos, particle_3.pos).mag();
      const length_3 = p5.Vector.sub(particle_3.pos, particle_1.pos).mag();

      this.springs.push(new Spring(particle_1, particle_2, length_1, 3.2))
      this.springs.push(new Spring(particle_2, particle_3, length_2, 3.2))
      this.springs.push(new Spring(particle_3, particle_1, length_3, 3.2))
    }

    this.update = function(time_slice, surface_smoothness) {
        /*
        const centroid = calculate_centroid(this.springs.map((spring) => spring.particle_center.pos))
        const particle_centroid = new Particle(centroid.x, centroid.y);
        const repellers = this.springs.map((spring) => {
            const length = p5.Vector.sub(spring.particle_center.pos, centroid).mag();
            return new RepellerSpring(particle_centroid, spring.particle_center, length, 1.0);
        })
        repellers.forEach((repeller) => repeller.update(time_slice, surface_smoothness));
        */
        this.springs.forEach(x => x.update(time_slice, surface_smoothness));
        //repellers.forEach((repeller) => repeller.update(time_slice, surface_smoothness));
    }
};