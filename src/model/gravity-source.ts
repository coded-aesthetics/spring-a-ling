import p5 from 'p5';
import { IParticle } from '../interfaces';

export function GravitySource(get_particles: () => IParticle[], force = 400) {
    this.act = function(time_slice) {
        for (let particle of get_particles().values()) {
            particle.apply_force(new p5.Vector().set(0, force * time_slice))
        }
    }

    this.get_particles = function() {
        return [];
    }
}