import { ISpring } from '../model/spring';
import { particle_view } from './particle.view';
import { spring_view } from './spring.view';
import p5 from 'p5';
import { ITranslationFunction } from './interfaces';

export interface ISpringArrayContainer {
    springs: ISpring[];
}

export const spring_array_view = (p: p5) => (translate: ITranslationFunction = () => ({zoom_factor: 1, translate: x => x})) => (spring_array_container: ISpringArrayContainer ) => {
    const particle_utils = particle_view(p)(translate);
    const spring_utils = spring_view(p)(translate);

    function draw_centers_as_loop_funky_particles() {
      spring_array_container.springs.forEach((spring, index) => particle_utils.drawParticleFunk(spring.particle_center));
      for (let i = 0; i < spring_array_container.springs.length - 1; i++) {
        particle_utils.drawParticleLine(spring_array_container.springs[i].particle_center, spring_array_container.springs[i + 1].particle_center)
      }
      particle_utils.drawParticleLine(spring_array_container.springs[spring_array_container.springs.length - 1].particle_center, spring_array_container.springs[0].particle_center);
    }

    function draw_all_white() {
      spring_array_container.springs.forEach(spring_utils.drawSpring);
    }

    function draw_all_funk() {
        spring_array_container.springs.forEach(spring_utils.drawSpringFunk);
      }

    return { draw_centers_as_loop_funky_particles, draw_all_white, draw_all_funk };
}

export const spring_array_random_renderer = (p: p5) => (translate: ITranslationFunction = () => ({zoom_factor: 1, translate: x => x})) => (spring_array_container: ISpringArrayContainer, filter_view_names: (view_name: string) => boolean = () => true) => {
    const view = spring_array_view(p)(translate)(spring_array_container);
    let then = Date.now();
    const get_random_view = () => {
        const methods = Object.keys(view).filter(filter_view_names);
        return view[methods[Math.floor(Math.random() * methods.length)]];
    }

    let renderer = get_random_view();

    const render = () => {
        const time_passed = Date.now() - then;
        if (time_passed > 2000) {
            renderer = get_random_view();
            then = Date.now();
        }
        renderer();
    }

    return render;
}