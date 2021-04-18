import p5 from 'p5';
import { intersect } from './intersection-utils';

export function Wall(particle_start_, particle_end_, bounciness) {
    this.particle_start = particle_start_;
    this.particle_end = particle_end_;
    const intersection_with_particle_trajectory = (particle, particle_update_preview) => {
        const {x: ax, y: ay} = particle_end_.pos;
        const {x: bx, y: by} = particle_start_.pos;
        const {x: cx, y: cy} = particle.pos;
        const {x: dx, y: dy} = particle_update_preview.pos;

        return intersect(ax, ay, bx, by, cx, cy, dx, dy);
    }

    this.collide = function(particle, time_slice, surface_smoothness) {
        const particle_update_preview = particle.update_preview(time_slice, surface_smoothness);
        const intersection = intersection_with_particle_trajectory(particle, particle_update_preview);
        if (intersection) {
            const vec_intersection = new p5.Vector().set(intersection.x, intersection.y);
            const vec_from_particle_to_intersection = p5.Vector.sub(vec_intersection, particle.pos);
            const wall_vector = p5.Vector.sub(particle_end_.pos, particle_start_.pos);
            const wall_normal = new p5.Vector().set(-wall_vector.y, wall_vector.x);
            const new_direction = (vec_from_particle_to_intersection as any).copy().reflect(wall_normal).normalize();
            const length_to_line = vec_from_particle_to_intersection.mag();
            const full_length = p5.Vector.sub(particle.pos, particle_update_preview.pos).mag();
            const remaining_length = full_length - length_to_line;
            particle.pos = p5.Vector.add(vec_intersection, new_direction.mult(remaining_length));
            particle.velocity = new_direction.mult(particle_update_preview.velocity.mag() * bounciness);
            return true;
        }
        return false;
    }

    this.act = function() {}

    this.get_walls = function() {
        return [this];
    }

    this.get_particles = function() {
        return [particle_start_, particle_end_];
    }
}