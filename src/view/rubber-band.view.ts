import { particle_view } from './particle.view';


export const rubber_band_view = function(p:p5) {
  const utils = particle_view(p);

  function drawRubberBand(springRing) {
    springRing.springs.forEach((spring, index) => utils.drawParticleFunk(spring.particle_center));
    for (let i = 0; i < springRing.springs.length - 1; i++) {
      utils.drawParticleLine(springRing.springs[i].particle_center, springRing.springs[i + 1].particle_center)
    }
    utils.drawParticleLine(springRing.springs[springRing.springs.length - 1].particle_center, springRing.springs[0].particle_center);
  }

  return { drawRubberBand };
}