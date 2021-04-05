import { spring_view } from './spring.view';

export const springy_solid_view = function(p:p5) {
  const utils = spring_view(p);

  function drawSpringySolid(bouncySolid) {
    bouncySolid.springs.forEach(utils.drawSpring);
  }

  return { drawSpringySolid }
}