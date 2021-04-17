import p5 from 'p5';
import { ITranslationFunction } from './interfaces';
import { view_utils } from './view-utils';

export const particle_view = (p:p5) => (translate: ITranslationFunction = () => ({zoom_factor: 1, translate: x => x})) => {
    const view_utils_ = view_utils(p)(translate);

    function drawParticle(particle, size = 10, color: number | number[] = 255) {
        p.fill(color as any);
        view_utils_.drawVector(particle.pos, size, color);
      }

      function drawParticleFunk(particle) {
        p.stroke(0, 0, 0, 1.0);
        let trans = translate();
        const radius = particle.velocity.mag() / 5 * trans.zoom_factor;
        p.fill(Math.abs(Math.round(particle.velocity.x/2,)), Math.abs(Math.round(particle.velocity.y/2,)) ,radius*5);
        const vec_translate = trans.translate(particle.pos);
        p.ellipse(vec_translate.x, vec_translate.y, radius, radius)
      }

      function drawParticleFunk2(particle) {
        p.stroke(0, 0, 0, 1.0);
        let trans = translate();
        const radius = particle.velocity.mag() / 10 * trans.zoom_factor;
        p.fill(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
        const vec_translate = trans.translate(particle.pos);
        p.ellipse(vec_translate.x, vec_translate.y, radius, radius)
      }

      function drawParticleLine(part1, part2) {
        p.stroke(255);
        view_utils_.drawVectorLine(part1.pos, part2.pos);
      }

      return { drawParticle, drawParticleFunk, drawParticleFunk2, drawParticleLine }
}
