import p5 from 'p5';
import { Spring } from './spring';
import { Particle } from './particle';

export function SpringString(vector_start_, vector_end_, amount_segments = 10) {
    this.springs = [];

    const vector_from_start_to_end = p5.Vector.sub(vector_end_, vector_start_).mult(1 / amount_segments);
    let particle_start, particle_end;
    for (var i = 0; i < amount_segments; i++) {
        const cur_vector_start = p5.Vector.add(vector_start_, vector_from_start_to_end.copy().mult(i));
        const cur_vector_end = p5.Vector.add(vector_start_, vector_from_start_to_end.copy().mult(i + 1));
        particle_start = particle_end || new Particle(cur_vector_start.x, cur_vector_start.y, new p5.Vector().set(0,0), i === 0);
        particle_end = new Particle(cur_vector_end.x, cur_vector_end.y);
        this.springs.push(new Spring(particle_start, particle_end, vector_from_start_to_end.mag(), 7.500));
    }

    this.update = function(time_slice, surface_smoothness) {
        this.springs.forEach(spring => spring.update(time_slice, surface_smoothness));
    }

}