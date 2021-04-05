import { particle_view } from './particle.view';

export const rubber_string_view = function(p:p5) {
    function drawRubberString(spring) {
        particle_view(p).drawParticle(spring.particle_center);
    }

    return { drawRubberString };
}
