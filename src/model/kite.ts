import p5 from 'p5';
import { Particle } from './particle';
import { SpringString } from './spring-string';
import { SpringySolid } from './springy-solid';
import { randomVector } from './utils';

export function Kite(p: p5) {
    const min_x = p.windowWidth * 0 / 4;
    const max_x = p.windowWidth * 4 / 4;
    const min_y = p.windowHeight * 5 / 6;
    const max_y = p.windowHeight * 6 / 6;

    const min_y_2 = p.windowHeight * 0 / 6;
    const max_y_2 = p.windowHeight * 1 / 6;
    this.springy_solid = new SpringySolid(randomVector(min_x, max_x, min_y_2, max_y_2), 220, 340, 5);
    const vector_start = randomVector(min_x, max_x, min_y, max_y);
    const particle_start = new Particle(vector_start.x, vector_start.y, new p5.Vector().set(0,0), false);
    this.spring_string = new SpringString(particle_start, this.springy_solid.springs[0].particle_center);

    this.act = function(time_slice) {
        this.springy_solid.act(time_slice);
        this.spring_string.act(time_slice);
    }

    this.get_particles = function() {
        return this.springy_solid.get_particles().concat(this.spring_string.get_particles());
    }

    this.get_walls = function() {
        return this.springy_solid.get_walls();
    }
}