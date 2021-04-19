import p5 from 'p5';
import { IParticle } from '../interfaces';
import { ITranslationFunction } from './interfaces';
import { particle_view } from './particle.view';

export const particles_view = (p:p5) => (translate: ITranslationFunction = () => ({zoom_factor: 1, translate: x => x})) => (get_particles: () => IParticle[]) =>  {
    const particle_view_ = particle_view(p)(translate);

    function drawParticles() {
        get_particles().forEach(particle => particle_view_.drawParticle(particle));
      }

      function drawParticlesFunk() {
        get_particles().forEach(particle => particle_view_.drawParticleFunk(particle));
      }

      function drawParticlesFunk2() {
        get_particles().forEach(particle => particle_view_.drawParticleFunk2(particle));
      }

      return { drawParticles, drawParticlesFunk, drawParticlesFunk2 }
}
