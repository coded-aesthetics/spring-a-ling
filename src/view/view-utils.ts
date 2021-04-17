import p5 from 'p5';
import { ITranslationFunction } from './interfaces';

export const view_utils = (p:p5) => (translate: ITranslationFunction = () => ({zoom_factor: 1, translate: x => x})) => {

  function drawVector(vector, size = 10, color: any = 255) {
    p.fill(color);
    let trans = translate();
    const zoom_factor = trans.zoom_factor;
    const vec_translate = trans.translate(vector);
    p.ellipse(vec_translate.x, vec_translate.y, size * zoom_factor, size * zoom_factor)
  }

  function drawVectorLine(vec1, vec2) {
    p.stroke(255);
    let trans = translate();
    const vec1_translate = trans.translate(vec1);
    const vec2_translate = trans.translate(vec2);
    p.line(vec1_translate.x, vec1_translate.y, vec2_translate.x, vec2_translate.y);
  }

  return {drawVector, drawVectorLine}
}