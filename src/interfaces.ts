import p5 from 'p5';

export interface IParticle {
    pos: p5.Vector;
    apply_force(velocity: p5.Vector): void;
    update(time_slice: number, surface_smoothness: number);
}

export interface IActor {
    act(time_slice: number): void;
    get_particles(): IParticle[];
    get_walls?(): IWall[];
}

export interface IWall {
    collide(particle, time_slice, surface_smoothness);
    get_particles(): IParticle[];
}