import { particle_view } from './particle.view';

export const spring_view = function(p:p5) {
    function drawSpring(spring) {
        particle_view(p).drawParticle(spring.particle_center);

        particle_view(p).drawParticleLine(spring.particle_center, spring.connected_particle);
    }

    return { drawSpring };
}
