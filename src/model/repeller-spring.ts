import p5 from 'p5';
import { IParticle } from '../interfaces';
/**
 * This is like the rubber-string, but it wants to have a certain length.
 *
 * @param particle_center_ First particle
 * @param connected_particle_ Second particle
 * @param length_ Length the spring wants to have
 * @param tension_ Tension the spring has
 */
export function RepellerSpring(particle_center_, connected_particle_, length_, tension_) {
  this.particle_center = particle_center_;
  this.connected_particle = connected_particle_;
  this.length = length_;
  this.tension = tension_;
  this.current_tension = tension_;

  const act_on_particle = (stationary, moving, time_slice) => {
    // The point the stationary particle is trying to pull/push the other particle to is
    // this.length away in the direction of the moving particle
    const direction_from_stationary_to_moving = p5.Vector.sub(moving.pos, stationary.pos).normalize();
    const point_the_stationary_particle_wants_to_have_the_moving_particle_at = p5.Vector.add(stationary.pos, direction_from_stationary_to_moving.mult(this.length))

    // Acts like the rubber-string from here on up
    const direction = p5.Vector.sub(point_the_stationary_particle_wants_to_have_the_moving_particle_at, moving.pos);
    let dist_squared = direction.mag();

    this.current_tension = this.tension * dist_squared;

    moving.act(direction.normalize().mult(this.tension * time_slice * dist_squared));
  }

  this.act = function(time_slice) {
    act_on_particle(this.particle_center, this.connected_particle, time_slice);
  }
  this.get_particles = function(): IParticle[] {
    return [this.particle_center, this.connected_particle];
  };
}
