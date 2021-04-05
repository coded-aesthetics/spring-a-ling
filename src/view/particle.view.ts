import { view_utils } from './view-utils';

export const particle_view = function(p:p5) {
    function drawParticle(particle, size = 10, color = 255) {
        p.fill(color);
        view_utils(p).drawVector(particle.pos, size, color);
      }

      function drawParticleFunk(particle) {
        p.stroke(0, 0, 0, 1.0);
        const radius = particle.velocity.mag() / 5;
        p.fill(Math.abs(Math.round(particle.velocity.x/2,)), Math.abs(Math.round(particle.velocity.y/2,)) ,radius*5);
        p.ellipse(particle.pos.x, particle.pos.y, radius, radius)
      }

      function drawParticleFunk2(particle) {
        p.stroke(0, 0, 0, 1.0);
        const radius = particle.velocity.mag() / 10;
        // Math.random() > 0.5 ? fill(radius * 5, 0 ,radius * 5) : fill(0, radius * 5 ,0);
        p.fill(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
        p.ellipse(particle.pos.x, particle.pos.y, radius, radius)
      }

      function drawParticleLine(part1, part2) {
        p.stroke(255);
        p.line(part1.pos.x, part1.pos.y, part2.pos.x, part2.pos.y);
      }

      return {drawParticle, drawParticleFunk, drawParticleFunk2, drawParticleLine}
}
