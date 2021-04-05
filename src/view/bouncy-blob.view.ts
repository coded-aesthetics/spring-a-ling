import { spring_ring_view } from './spring-ring.view';

export const bouncy_blob_view = function(p:p5) {
  const utils = spring_ring_view(p);

  function drawBouncyBlob(bouncyBlob) {
    utils.drawSpringRing(bouncyBlob.springRing);
  }

  return { drawBouncyBlob };
}