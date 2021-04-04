import { SpringRing } from './spring-ring';
import { calculate_centroid } from './particle-utils';
import { Spring } from './spring';
import { Particle } from './particle';

export function BouncyBlob(amount) {
    this.springRing = new SpringRing(amount);
    this.update = function(time_slice, surface_smoothness) {
      this.springRing.update(time_slice, surface_smoothness);
      const centroid_vector = calculate_centroid(this.springRing.springs.map(x => x.particle_center.pos));
      const centroid = new Particle(centroid_vector.x, centroid_vector.y);
      const springs = this.springRing.springs.map(x => new Spring(x.particle_center, centroid, 0.0005));
      console.log(centroid)
      console.log(springs)
      springs.forEach(spring => spring.update(time_slice, surface_smoothness));
    }
}