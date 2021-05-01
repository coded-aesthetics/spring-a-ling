import p5 from 'p5';
import { ITranslationFunction } from './interfaces';
import { particle_view } from './particle.view';

export const spring_view = (p:p5) => (translate: ITranslationFunction = () => ({zoom_factor: 1, translate: x => x})) => {

    function drawSpring(spring) {
        if (spring.broken) return;
        particle_view(p)(translate).drawParticle(spring.particle_center);

        particle_view(p)(translate).drawParticleLine(spring.particle_center, spring.connected_particle);
    }

    function drawSpringFunk(spring) {
        if (spring.broken) return;
        p.stroke(0, 0, 0, 1.0);
        const radius = spring.current_tension / 120;
        const particle = spring.particle_center;

        const color = particle.velocity.x < 0 ? [Math.abs(Math.round(particle.velocity.x/2)), Math.abs(Math.round(particle.velocity.y/2)), radius*4] :
        [Math.abs(Math.round(particle.velocity.y/2)), Math.abs(Math.round(particle.velocity.x/2)), radius*4];

        particle_view(p)(translate).drawParticle(spring.particle_center, radius, color);
        particle_view(p)(translate).drawParticle(spring.particle_center, 10, [255,255,255,90]);
        particle_view(p)(translate).drawParticleLine(spring.particle_center, spring.connected_particle);
    }

    return { drawSpring, drawSpringFunk };
}
