import p5 from 'p5';
import { spring_view } from './spring.view';

export const springy_solid_view = function(p:p5) {
  const utils = spring_view(p);

  function drawSpringySolid(bouncySolid) {
    bouncySolid.springs.forEach(utils.drawSpringFunk);
  }

  return { drawSpringySolid }
}