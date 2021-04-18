import p5 from 'p5';
import { ITranslationFunction } from './interfaces';
import { view_utils } from './view-utils';

export const wall_view = (p: p5) => (translate: ITranslationFunction = () => ({zoom_factor: 1, translate: x => x})) => (wall) => {
    const view_utils_ = view_utils(p)(translate);

    function drawWall() {
        view_utils_.drawVectorLine(wall.particle_start.pos, wall.particle_end.pos);
    }

    return { drawWall };
}