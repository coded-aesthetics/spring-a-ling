import p5 from 'p5';
import { calculate_centroid, cartesian_to_polar, polar_to_cartesian } from './particle-utils';

const create_solid = (min_radius_, max_radius_, amount_vertices) => {
    const vertices_polar = [];
    for (let i = 0; i < amount_vertices; i++) {
        const r = Math.random() * ( max_radius_ - min_radius_) + min_radius_;
        const min_theta = i * 2 * Math.PI / amount_vertices;
        const max_theta = (i + 1) * 2 * Math.PI / amount_vertices;
        const theta = Math.random() * ( max_theta - min_theta) + min_theta;
        vertices_polar.push({r, theta});
    }
    const vectors_cartesian = vertices_polar.map(polar_to_cartesian);
    const centroid = calculate_centroid(vectors_cartesian);
    // make centroid ursprung of local coordinate system
    return vectors_cartesian.map(x => p5.Vector.sub(x, centroid))
}

export function BouncySolid(vector_center_, min_radius_, max_radius_, amount_vertices = 10) {
    this.vector_center_world = vector_center_;
    this.angular_momentum = 0.1;
    this.vertices_polar = [];

    this.vertices_polar =
      create_solid(min_radius_, max_radius_, amount_vertices)
      .map(cartesian_to_polar)

    this.get_vertices_cartesian = function() {
        return this.vertices_polar.map(polar_to_cartesian);
    }

    this.get_vertices_cartesion_world = function() {
        return this.vertices_polar.map(polar_to_cartesian).map(vec => p5.Vector.add(vec, this.vector_center_world));
    }

    this.update = function(time_slice, surface_smoothness) {
        this.angular_momentum = this.angular_momentum * (1 - ((1 - surface_smoothness) * time_slice));
        this.vertices_polar.forEach(x => x.theta += this.angular_momentum);

        for (let i = 0; i < this.vertices_polar.length; i++) {
            // this.particles[i].pos = polar_to_cartesian(this.vertices_polar[i]);
            //springRing.springRing.springs.forEach(x => x.particle_center.act(new p5.Vector().set(0, 2)))
            //springRing.springRing.springs.forEach(x => x.particle_center.velocity =  x.particle_center.pos.y > p.windowHeight-50 ?  x.particle_center.velocity.reflect(new p5.Vector().set(0, -1)) : x.particle_center.velocity)

        }
    }
};