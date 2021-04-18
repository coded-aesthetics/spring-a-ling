import p5 from 'p5';
import { IActor, IParticle, IWall } from '../interfaces';

export function GravityWorld(gravity = 300) {
    const actors: IActor[] = [];

    let particles = new Set<IParticle>();
    let walls = new Set<IWall>();

    this.add_actor = function (actor) {
        actors.push(actor);

        actors.forEach(actor => actor.get_walls ? actor.get_walls().forEach(wall => walls.add(wall)): '');
    }

    this.update = function(time_slice, surface_smoothness) {
        particles = new Set<IParticle>();
        actors.forEach(actor => actor.get_particles().forEach(particle => particles.add(particle)));
        actors.forEach(actor => actor.act(time_slice));
        for (let particle of particles.values()) {
            particle.apply_force(new p5.Vector().set(0, gravity * time_slice))
        }
        for (let particle of particles.values()) {
            let collides = false;
            for (let wall of walls.values()) {
                collides = collides || wall.collide(particle, time_slice, surface_smoothness);
            }
            if (!collides) {
                particle.update(time_slice, surface_smoothness);
            }
        }
    }

    this.get_particles = () => {
        const particles_array = [];
        for (let particle of particles.values()) {
            particles_array.push(particle);
        }
        return particles_array;
    }

    this.get_bounds = function() {
        let max_x = Number.NEGATIVE_INFINITY;
        let max_y = Number.NEGATIVE_INFINITY;
        let min_x = Number.POSITIVE_INFINITY;
        let min_y = Number.POSITIVE_INFINITY;
        for (let particle of particles.values()) {
            max_x = Math.max(particle.pos.x, max_x);
            min_x = Math.min(particle.pos.x, min_x);
            max_y = Math.max(particle.pos.y, max_y);
            min_y = Math.min(particle.pos.y, min_y);
        }
        return {
          min: new p5.Vector().set(min_x, min_y),
          max: new p5.Vector().set(max_x, max_y),
          width: max_x - min_x,
          height: max_y - min_y,
        }
    }
}