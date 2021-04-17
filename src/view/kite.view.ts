import p5 from 'p5';
import { ITranslationFunction } from './interfaces';
import { spring_array_random_renderer } from './spring-array.view';

export const kite_renderer = (p:p5) => (translate: ITranslationFunction = () => ({zoom_factor: 1, translate: x => x})) => (kite) =>  {

    let spring_string_renderer = spring_array_random_renderer(p)(translate)(
        kite.spring_string,
        (view_name) => view_name !== 'draw_centers_as_loop_funky_particles'
      );
      let springy_solid_renderer = spring_array_random_renderer(p)(translate)(kite.springy_solid,
        (view_name) => view_name !== 'draw_centers_as_loop_funky_particles');



    return () => {
        spring_string_renderer();
        springy_solid_renderer();
    };
}
