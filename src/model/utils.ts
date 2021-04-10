import p5 from 'p5';

export function smoothstep (edge0, edge1, x) {
    const t = Math.max(0.0, Math.min(1.0, (x - edge0) / (edge1 - edge0)));
    return t * t * (3.0 - 2.0 * t);
}

export function randomVector (min_x, max_x, min_y, max_y) {
    return new p5.Vector().set(Math.random()* (max_x - min_x) + min_x, Math.random()* (max_y - min_y) + min_y)
}