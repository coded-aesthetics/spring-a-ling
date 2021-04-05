import { view_utils } from './view-utils';

export const bouncy_solid_view = function(p:p5) {
  const utils = view_utils(p);

  function drawBouncySolid(bouncySolid) {
    utils.drawVector(bouncySolid.vector_center_world)
    const vertices_cartesian_world = bouncySolid.get_vertices_cartesion_world();

    vertices_cartesian_world.forEach(x => utils.drawVector(x));

    for (let i = 0; i < vertices_cartesian_world.length - 1; i++) {
      const coors = vertices_cartesian_world[i]
      const coors2 = vertices_cartesian_world[i + 1]
      utils.drawVectorLine(coors, coors2);
    }
    utils.drawVectorLine(
      vertices_cartesian_world[vertices_cartesian_world.length - 1],
      vertices_cartesian_world[0]
    );
  }

  return {drawBouncySolid}
}