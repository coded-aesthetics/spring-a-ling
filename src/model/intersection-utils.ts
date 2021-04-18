export function rotation_direction(p1x, p1y, p2x, p2y, p3x, p3y) {
  if (((p3y - p1y) * (p2x - p1x)) > ((p2y - p1y) * (p3x - p1x)))
    return 1;
  else if (((p3y - p1y) * (p2x - p1x)) == ((p2y - p1y) * (p3x - p1x)))
    return 0;

  return -1;
}

export function contains_segment(x1, y1, x2, y2, sx, sy) {
  if (x1 < x2 && x1 < sx && sx < x2) return true;
  else if (x2 < x1 && x2 < sx && sx < x1) return true;
  else if (y1 < y2 && y1 < sy && sy < y2) return true;
  else if (y2 < y1 && y2 < sy && sy < y1) return true;
  else if (x1 == sx && y1 == sy || x2 == sx && y2 == sy) return true;
  return false;
}

export function has_intersection(x1, y1, x2, y2, x3, y3, x4, y4) {
  var f1 = rotation_direction(x1, y1, x2, y2, x4, y4);
  var f2 = rotation_direction(x1, y1, x2, y2, x3, y3);
  var f3 = rotation_direction(x1, y1, x3, y3, x4, y4);
  var f4 = rotation_direction(x2, y2, x3, y3, x4, y4);

  // If the faces rotate opposite directions, they intersect.
  var intersect = f1 != f2 && f3 != f4;

  // If the segments are on the same line, we have to check for overlap.
  if (f1 == 0 && f2 == 0 && f3 == 0 && f4 == 0) {
    intersect = contains_segment(x1, y1, x2, y2, x3, y3) || contains_segment(x1, y1, x2, y2, x4, y4) ||
    contains_segment(x3, y3, x4, y4, x1, y1) || contains_segment(x3, y3, x4, y4, x2, y2);
  }

  return intersect;
}


// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
export function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Check if none of the lines are of length 0
      if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
          return false
      }

      const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    // Lines are parallel
      if (denominator === 0) {
          return false
      }

      let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
      let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    // is the intersection along the segments
      if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
          return false
      }

    // Return a object with the x and y coordinates of the intersection
      let x = x1 + ua * (x2 - x1)
      let y = y1 + ua * (y2 - y1)

      return {x, y}
  }