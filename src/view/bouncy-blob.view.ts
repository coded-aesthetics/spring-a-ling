import { rubber_band_view } from './rubber-band.view';

export const bouncy_blob_view = function(p:p5) {
  const utils = rubber_band_view(p);

  function drawBouncyBlob(bouncyBlob) {
    utils.drawRubberBand(bouncyBlob.springRing);
  }

  return { drawBouncyBlob };
}