import { particle_view } from './particle.view';

export const spring_view = function(p:p5) {
    function drawSpring(spring) {
        particle_view(p).drawParticle(spring.particle_center);

        particle_view(p).drawParticleLine(spring.particle_center, spring.connected_particle);
    }
    function drawSpringFunk(spring) {
        p.stroke(0, 0, 0, 1.0);
        const radius = spring.current_tension / 50;
        const particle = spring.particle_center;

        const color = particle.velocity.x < 0 ? [Math.abs(Math.round(particle.velocity.x/2)), Math.abs(Math.round(particle.velocity.y/2)), radius*4] :
        [Math.abs(Math.round(particle.velocity.y/2)), Math.abs(Math.round(particle.velocity.x/2)), radius*4];

        particle_view(p).drawParticle(spring.particle_center, radius, color);
        particle_view(p).drawParticle(spring.particle_center, 10, [255,255,255,90]);
        particle_view(p).drawParticleLine(spring.particle_center, spring.connected_particle);
    }

    return { drawSpring, drawSpringFunk };
}
