export const view_utils = function(p:p5) {

  function drawVector(vector, size = 10, color: any = 255) {
    p.fill(color);
    p.ellipse(vector.x, vector.y, size, size)
  }

  function drawVectorLine(part1, part2) {
    p.stroke(255);
    p.line(part1.x, part1.y, part2.x, part2.y);
  }

  return {drawVector, drawVectorLine}
}