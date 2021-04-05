import { particle_view } from './particle.view';

export const spring_view = function(p:p5) {
    function drawSpring(spring) {
        particle_view(p).drawParticle(spring.particle_center);
    }

    return {drawSpring};
}
