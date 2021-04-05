import { RubberBand } from './rubber-band';
import { calculate_centroid } from './particle-utils';
import { RubberString } from './rubber-string';
import { Particle } from './particle';
import p5 from 'p5';
import { Repeller } from './repeller';

export function BouncyBlob(amount) {
    this.springRing = new RubberBand(amount);
    this.update = function(time_slice, surface_smoothness) {
      this.springRing.update(time_slice, surface_smoothness);
      const centroid_vector = calculate_centroid(this.springRing.springs.map(x => x.particle_center.pos));
      const centroid = new Particle(centroid_vector.x, centroid_vector.y, new p5.Vector().set(0,0));

      const repellers = this.springRing.springs.map(x => {
        return new Repeller(centroid, x.particle_center, 70);
      });
      repellers.forEach(repeller => repeller.update(time_slice, surface_smoothness));

      const springs = this.springRing.springs.map(x => {
       const p = new Particle(x.particle_center.pos.x,x.particle_center.pos.y, x.particle_center.velocity, true)
       return new RubberString(p, centroid, 0.0005)
      });
      springs.forEach(spring => spring.update(time_slice, surface_smoothness));
    }
}