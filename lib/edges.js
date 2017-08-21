import { Point, Rectangle } from "./geom.js";

/**
 * A {@link Line} object represents a line segment on the 2D space.
 *
 * @implements {IEdge}
 */
export class Line {
  /**
   * Create a new {@link Line} object.
   *
   * @param {Point} start - The start point of the line segment.
   * @param {Point} end - The end point of the line segment.
   */
  constructor(start, end) {
    /**
     * The start point of the line segment.
     *
     * @type {Point}
     */
    this.start = start;
    /**
     * The end point of the line segment.
     *
     * @type {Point}
     */
    this.end = end;
  }

  /**
   * Get a degree of line.
   *
   * @returns {number} `1`.
   */
  degree() {
    return 1;
  }

  /**
   * Create a copy of the line segment.
   *
   * @returns {Line} A copy of the line segment.
   */
  clone() {
    return new Line(this.start.clone(), this.end.clone());
  }

  /**
   * Translate the line segment.
   *
   * @param {Point} dist -The distance the line segment is translated by for both X and Y directions.
   * @returns {Line} The translated line segment.
   */
  translate(dist) {
    return new Line(this.start.add(dist), this.end.add(dist));
  }

  /**
   * Rotate the line segment around the speified origin.
   *
   * @param {number} angle - The angle the line segment is rotated.
   * @param {Point} [origin=new Point(0, 0)] The origin the line segment is rotated around.
   * @returns {Line} The rotated line segment.
   */
  rotate(angle, origin = new Point(0, 0)) {
    return new Line(this.start.rotate(angle, origin), this.end.rotate(angle, origin));
  }

  /**
   * Return a point at `t` on the line segment.
   *
   * @param {number} t - A number between 0 and 1.
   * @returns {Point} A point on the line segment.
   */
  pointAt(t) {
    return this.start.scale(1 - t).add(this.end.scale(t));
  }

  /**
   * Split the line segment at `t` and return two new line segments.
   *
   * @param {number} t - A number between 0 and 1.
   * @returns {Array<Line>} An array of split lines.
   */
  splitAt(t) {
    const middle = this.pointAt(t);
    return [
      new Line(this.start.clone(), middle),
      new Line(middle.clone(), this.end.clone())
    ];
  }

  /**
   * Get the extreme points.
   *
   * @returns {Array<{ t: number, point: Point }>} An array of the object,
   * each contains information about an extreme point.
   */
  extremePoints() {
    return [
      { t: 0, point: this.start.clone() },
      { t: 1, point: this.end.clone() }
    ];
  }

  /**
   * Get the bounding box of the line segment.
   *
   * @returns {Rectangle} A rectangle object representing the bounding box.
   */
  boundingBox() {
    const eps = this.extremePoints();
    const xs = eps.map(ep => ep.point.x);
    const ys = eps.map(ep => ep.point.y);
    const left   = Math.min(...xs);
    const right  = Math.max(...xs);
    const top    = Math.min(...ys);
    const bottom = Math.max(...ys);
    return new Rectangle(left, top, right - left, bottom - top);
  }

  /**
   * Returns the degree of deviation from the line between the start and the end,
   * where the degree of deviation is defined as the ratio of the maximum deviation from the line to the line length.
   * If there are no perpendicular line between some point on a curve and the line segment, the curve's degree of deviation is infinity.
   *
   * @returns {number} 0.
   */
  deviationFromLine() {
    return 0;
  }
}


/**
 * A {@link QuadraticBezier} object represents a quadratic Bezier curve on the 2D space.
 *
 * @implements {IEdge}
 */
export class QuadraticBezier {
  /**
   * Create a new {@link QuadraticBezier} object.
   *
   * @param {Point} start - The start point of the curve.
   * @param {Point} control - The control point of the curve.
   * @param {Point} end - The end point of the curve.
   */
  constructor(start, control, end) {
    /**
     * The start point of the curve.
     *
     * @type {Point}
     */
    this.start = start;
    /**
     * The control point of the curve.
     *
     * @type {Point}
     */
    this.control = control;
    /**
     * The end point of the curve.
     *
     * @type {Point}
     */
    this.end = end;
  }

  /**
   * Get a degree of curve.
   *
   * @returns {number} `2`.
   */
  degree() {
    return 2;
  }

  /**
   * Create a copy of the curve.
   *
   * @returns {QuadraticBezier} A copy of the curve.
   */
  clone() {
    return new QuadraticBezier(this.start.clone(), this.control.clone(), this.end.clone());
  }

  /**
   * Translate the curve.
   *
   * @param {Point} dist -The distance the curve is translated by for both X and Y directions.
   * @returns {QuadraticBezier} The translated curve.
   */
  translate(dist) {
    return new QuadraticBezier(this.start.add(dist), this.control.add(dist), this.end.add(dist));
  }

  /**
   * Rotate the curve around the speified origin.
   *
   * @param {number} angle - The angle the curve is rotated.
   * @param {Point} [origin=new Point(0, 0)] The origin the curve is rotated around.
   * @returns {QuadraticBezier} The rotated curve.
   */
  rotate(angle, origin = new Point(0, 0)) {
    return new QuadraticBezier(
      this.start.rotate(angle, origin),
      this.control.rotate(angle, origin),
      this.end.rotate(angle, origin)
    );
  }

  /**
   * Return a point at `t` on the curve.
   *
   * @param {number} t - A number between 0 and 1.
   * @returns {Point} A point on the curve.
   */
  pointAt(t) {
    return this.start.scale((1 - t) ** 2)
      .add(this.control.scale(2 * (1 - t) * t))
      .add(this.end.scale(t ** 2));
  }

  /**
   * Split the curve at `t` and return two new curves.
   *
   * @param {number} t - A number between 0 and 1.
   * @returns {Array<QuadraticBezier>} An array of split curves.
   */
  splitAt(t) {
    const middle = this.pointAt(t);
    const controlA = this.start.scale(1 - t).add(this.control.scale(t));
    const controlB = this.control.scale(1 - t).add(this.end.scale(t));
    return [
      new QuadraticBezier(this.start.clone(), controlA, middle),
      new QuadraticBezier(middle.clone(), controlB, this.end.clone())
    ];
  }

  /**
   * Get the extreme points.
   *
   * @returns {Array<{ t: number, point: Point }>} An array of the object,
   * each contains information about an extreme point.
   */
  extremePoints() {
    const eps = [
      { t: 0, point: this.start.clone() },
      { t: 1, point: this.end.clone() }
    ];
    const tx = (this.start.x - this.control.x) / (this.start.x - 2 * this.control.x + this.end.x);
    if (0 <= tx && tx <= 1) {
      eps.push({ t: tx, point: this.pointAt(tx) });
    }
    const ty = (this.start.y - this.control.y) / (this.start.y - 2 * this.control.y + this.end.y);
    if (0 <= ty && ty <= 1) {
      eps.push({ t: ty, point: this.pointAt(ty) });
    }
    return eps;
  }

  /**
   * Get the bounding box of the curve.
   *
   * @returns {Rectangle} - A rectangle object representing the bounding box.
   */
  boundingBox() {
    const eps = this.extremePoints();
    const xs = eps.map(ep => ep.point.x);
    const ys = eps.map(ep => ep.point.y);
    const left   = Math.min(...xs);
    const right  = Math.max(...xs);
    const top    = Math.min(...ys);
    const bottom = Math.max(...ys);
    return new Rectangle(left, top, right - left, bottom - top);
  }

  /**
   * Returns the degree of deviation from the line between the start and the end,
   * where the degree of deviation is defined as the ratio of the maximum deviation from the line to the line length.
   * If there are no perpendicular line between some point on a curve and the line segment, the curve's degree of deviation is infinity.
   *
   * @returns {number} The degree of deviation.
   */
  deviationFromLine() {
    const se = this.end.sub(this.start);
    const seSq = se.innerProd(se);
    const sc = this.control.sub(this.start);
    const l = se.innerProd(sc);
    if (l < 0 || seSq < l) {
      return Infinity;
    }
    const sp = this.pointAt(0.5).sub(this.start);
    const dp = se.outerProd(sp);
    return Math.abs(dp) / seSq;
  }
}


/**
 * A {@link CubicBezier} object represents a cubic Bezier curve on the 2D space.
 *
 * @implements {IEdge}
 */
export class CubicBezier {
  /**
   * Create a new {@link CubicBezier} object.
   *
   * @param {Point} start - The start point of the curve.
   * @param {Point} control1 - The first control point of the curve.
   * @param {Point} control2 - The second control point of the curve.
   * @param {Point} end - The end point of the curve.
   */
  constructor(start, control1, control2, end) {
    /**
     * The start point of the curve.
     *
     * @type {Point}
     */
    this.start = start;
    /**
     * The first control point of the curve.
     *
     * @type {Point}
     */
    this.control1 = control1;
    /**
     * The second control point of the curve.
     *
     * @type {Point}
     */
    this.control2 = control2;
    /**
     * The end point of the curve.
     *
     * @type {Point}
     */
    this.end = end;
  }

  /**
   * Get a degree of curve.
   *
   * @returns {number} `3`.
   */
  degree() {
    return 3;
  }

  /**
   * Create a copy of the curve.
   *
   * @returns {CubicBezier} A copy of the curve.
   */
  clone() {
    return new CubicBezier(
      this.start.clone(), this.control1.clone(), this.control2.clone(), this.end.clone()
    );
  }

  /**
   * Translate the curve.
   *
   * @param {Point} dist -The distance the curve is translated by for both X and Y directions.
   * @returns {CubicBezier} The translated curve.
   */
  translate(dist) {
    return new CubicBezier(
      this.start.add(dist), this.control1.add(dist), this.control2.add(dist), this.end.add(dist)
    );
  }

  /**
   * Rotate the curve around the speified origin.
   *
   * @param {number} angle - The angle the curve is rotated.
   * @param {Point} [origin=new Point(0, 0)] The origin the curve is rotated around.
   * @returns {CubicBezier} The rotated curve.
   */
  rotate(angle, origin = new Point(0, 0)) {
    return new CubicBezier(
      this.start.rotate(angle, origin),
      this.control1.rotate(angle, origin),
      this.control2.rotate(angle, origin),
      this.end.rotate(angle, origin)
    );
  }

  /**
   * Return a point at `t` on the curve.
   *
   * @param {number} t - A number between 0 and 1.
   * @returns {Point} A point on the curve.
   */
  pointAt(t) {
    return this.start.scale((1 - t) ** 3)
      .add(this.control1.scale(3 * (1 - t) ** 2 * t))
      .add(this.control2.scale(3 * (1 - t) * t ** 2))
      .add(this.end.scale(t ** 3));
  }

  /**
   * Split the curve at `t` and return two new curves.
   *
   * @param {number} t - A number between 0 and 1.
   * @returns {Array<CubicBezier>} An array of split curves.
   */
  splitAt(t) {
    const middle = this.pointAt(t);
    const control1A = this.start.scale(1 - t).add(this.control1.scale(t));
    const control2A = this.start.scale((1 - t) ** 2)
      .add(this.control1.scale(2 * (1 - t) * t))
      .add(this.control2.scale(t ** 2));
    const control1B = this.control1.scale((1 - t) ** 2)
      .add(this.control2.scale(2 * (1 - t) * t))
      .add(this.end.scale(t ** 2));
    const control2B = this.control2.scale(1 - t).add(this.end.scale(t));
    return [
      new CubicBezier(this.start.clone(), control1A, control2A, middle),
      new CubicBezier(middle.clone(), control1B, control2B, this.end.clone())
    ];
  }

  /**
   * Get the extreme points.
   *
   * @returns {Array<{ t: number, point: Point }>} An array of the object,
   * each contains information about an extreme point.
   */
  extremePoints() {
    const eps = [
      { t: 0, point: this.start.clone() },
      { t: 1, point: this.end.clone() }
    ];
    const ax = -this.start.x + 3 * this.control1.x - 3 * this.control2.x + this.end.x;
    if (ax !== 0) {
      const bx = this.start.x - 2 * this.control1.x + this.control2.x;
      const cx = -this.start.x + this.control1.x;
      const tx1 = -(bx - Math.sqrt(bx ** 2 - ax * cx)) / ax;
      const tx2 = -(bx + Math.sqrt(bx ** 2 - ax * cx)) / ax;
      if (0 <= tx1 && tx1 <= 1) {
        eps.push({ t: tx1, point: this.pointAt(tx1) });
      }
      if (0 <= tx2 && tx2 <= 1) {
        eps.push({ t: tx2, point: this.pointAt(tx2) });
      }
    }
    else {
      const tx = (this.start.x - this.control1.x)
        / (2 * (this.start.x - 2 * this.control1.x + this.control2.x));
      if (0 <= tx && tx <= 1) {
        eps.push({ t: tx, point: this.pointAt(tx) });
      }
    }
    const ay = -this.start.y + 3 * this.control1.y - 3 * this.control2.y + this.end.y;
    if (ay !== 0) {
      const by = this.start.y - 2 * this.control1.y + this.control2.y;
      const cy = -this.start.y + this.control1.y;
      const ty1 = -(by - Math.sqrt(by ** 2 - ay * cy)) / ay;
      const ty2 = -(by + Math.sqrt(by ** 2 - ay * cy)) / ay;
      if (0 <= ty1 && ty1 <= 1) {
        eps.push({ t: ty1, point: this.pointAt(ty1) });
      }
      if (0 <= ty2 && ty2 <= 1) {
        eps.push({ t: ty2, point: this.pointAt(ty2) });
      }
    }
    else {
      const ty = (this.start.y - this.control1.y)
        / (2 * (this.start.y - 2 * this.control1.y + this.control2.y));
      if (0 <= ty && ty <= 1) {
        eps.push({ t: ty, point: this.pointAt(ty) });
      }
    }
    return eps;
  }

  /**
   * Get the bounding box of the curve.
   *
   * @returns {Rectangle} - A rectangle object representing the bounding box.
   */
  boundingBox() {
    const eps = this.extremePoints();
    const xs = eps.map(ep => ep.point.x);
    const ys = eps.map(ep => ep.point.y);
    const left   = Math.min(...xs);
    const right  = Math.max(...xs);
    const top    = Math.min(...ys);
    const bottom = Math.max(...ys);
    return new Rectangle(left, top, right - left, bottom - top);
  }

  /**
   * Returns the degree of deviation from the line between the start and the end,
   * where the degree of deviation is defined as the ratio of the maximum deviation from the line to the line length.
   * If there are no perpendicular line between some point on a curve and the line segment, the curve's degree of deviation is infinity.
   *
   * @returns {number} The degree of deviation.
   */
  deviationFromLine() {
    const se = this.end.sub(this.start);
    const seSq = se.innerProd(se);
    const sc1 = this.control1.sub(this.start);
    const l1 = se.innerProd(sc1);
    if (l1 < 0 || seSq < l1) {
      return Infinity;
    }
    const sc2 = this.control2.sub(this.start);
    const l2 = se.innerProd(sc2);
    if (l2 < 0 || seSq < l2) {
      return Infinity;
    }
    const dc1 = se.outerProd(sc1);
    const dc2 = se.outerProd(sc2);
    if (dc1 !== dc2) {
      const u = Math.sqrt(dc1 ** 2 - dc1 * dc2 + dc2 ** 2);
      const t1 = dc1 / (2 * dc1 - dc2 + u);
      const t2 = dc1 / (2 * dc1 - dc2 - u);
      if (dc1 * dc2 > 0) {
        if (dc1 > 0) {
          const sp = this.pointAt(t1).sub(this.start);
          const dp = se.outerProd(sp);
          return Math.abs(dp) / seSq;
        }
        else {
          const sp = this.pointAt(t2).sub(this.start);
          const dp = se.outerProd(sp);
          return Math.abs(dp) / seSq;
        }
      }
      else {
        const sp1 = this.pointAt(t1).sub(this.start);
        const sp2 = this.pointAt(t2).sub(this.start);
        const dp1 = se.outerProd(sp1);
        const dp2 = se.outerProd(sp2);
        return Math.max(Math.abs(dp1), Math.abs(dp2)) / seSq;
      }
    }
    else {
      const sp = this.pointAt(0.5).sub(this.start);
      const dp = se.outerProd(sp);
      return Math.abs(dp) / seSq;
    }
  }
}

// pair type
const PT = {
  PP: "point-point",
  PE: "point-edge",
  EP: "edge-point",
  EE: "edge-edge"
};

// make pair object
function mp(i, type, pair, t1, t2) {
  return { i, type, pair, t1, t2 };
}

// make result object
function mr(t1, t2, err) {
  return { t1, t2, err };
}

// check if two numbers are very close
function simeq(x, y) {
  return Math.abs(x - y) <= Number.EPSILON;
}

/**
 * Compute intersections of two line segments.
 *
 * @private
 * @param {Line} line1 - An line segment.
 * @param {Line} line2 - Another line segment.
 * @returns {Array<{ t1: number, t2: number, point: Point }>|undefined} - An array of the intersections.
 * If there are infinitely many intersections, it returns `undefined`.
 */
export function intersectionsLL(line1, line2) {
  const bb1 = line1.boundingBox();
  const bb2 = line2.boundingBox();
  if (!bb1.overlaps(bb2)) {
    if (bb1.contacts(bb2)) {
      const res = [];
      const eps1 = line1.extremePoints();
      const eps2 = line2.extremePoints();
      for (const ep1 of eps1) {
        for (const ep2 of eps2) {
          if (ep1.point.equals(ep2.point)) {
            res.push({ t1: ep1.t, t2: ep2.t, point: ep1.point });
          }
        }
      }
      return res;
    }
    else {
      return [];
    }
  }
  const dx1 = line1.end.x - line1.start.x;
  const dy1 = line1.end.y - line1.start.y;
  const dx2 = line2.end.x - line2.start.x;
  const dy2 = line2.end.y - line2.start.y;
  const dsx = line1.start.x - line2.start.x;
  const dsy = line1.start.y - line2.start.y;
  const a = dx1 * dy2 - dx2 * dy1;
  const b1 = dx2 * dsy - dy2 * dsx;
  const b2 = dx1 * dsy - dy1 * dsx;
  if (a === 0) {
    if (b1 === 0 || b2 === 0) {
      return undefined;
    }
    else {
      return [];
    }
  }
  const t1 = b1 / a;
  const t2 = b2 / a;
  if (0 <= t1 && t1 <= 1 && 0 <= t2 && t2 <= 1) {
    const p1 = line1.pointAt(t1);
    const p2 = line2.pointAt(t2);
    const point = p1.add(p2).scale(0.5);
    return [{ t1, t2, point }];
  }
  else {
    return [];
  }
}

/**
 * Compute intersecions of two edges.
 *
 * @param {IEdge} edge1 - An edge object.
 * @param {IEdge} edge2 - Another edge object.
 * @param {number} iterations - The number of iterations.
 * @returns {Array<{ t1: number, t2: number, point: Point }>|undefined} - An array of the intersections.
 * If there are infinitely many intersections, it returns `undefined`.
 */
export function intersections(edge1, edge2, iterations) {
  const maxIntersections = edge1.degree() * edge2.degree();
  const res = [];
  const exactRes = [];
  const queue = []; // NOTE: more efficient queue?
  {
    const eps1 = edge1.extremePoints();
    const eps2 = edge2.extremePoints();
    for (const ep1 of eps1) {
      for (const ep2 of eps2) {
        queue.push(mp(0, PT.PP, [ep1.point, ep2.point], ep1.t, ep2.t));
      }
    }
    for (const ep1 of eps1) {
      queue.push(mp(0, PT.PE, [ep1.point, edge2], ep1.t, 0.5));
    }
    for (const ep2 of eps2) {
      queue.push(mp(0, PT.EP, [edge1, ep2.point], 0.5, ep2.t));
    }
  }
  queue.push(mp(0, PT.EE, [edge1, edge2], 0.5, 0.5));
  while (queue.length > 0) {
    const { i, type, pair, t1, t2 } = queue.shift();
    const err = Math.max(0.5 ** i, Number.EPSILON);
    const delta = 0.5 ** (i + 2);
    switch (type) {
    case PT.PP:
      {
        const [p1, p2] = pair;
        if (p1.equals(p2) && !exactRes.some(r => simeq(r.t1, t1) && simeq(r.t2, t2))) {
          const r = mr(t1, t2, 0);
          res.push(r);
          exactRes.push(r);
        }
      }
      break;
    case PT.PE:
      {
        const [p1, e2] = pair;
        const bb2 = e2.boundingBox();
        if (bb2.isPoint()) {
          queue.push(mp(i, PT.PP, [p1, bb2.topLeft()], t1, t2));
          break;
        }
        const onEdge = bb2.hasOnEdge(p1);
        if (onEdge) {
          const eps2 = e2.extremePoints();
          for (const ep2 of eps2) {
            const dt2 = (ep2.t - 0.5) * 0.5 ** i;
            queue.push(mp(i, PT.PP, [p1, ep2.point], t1, t2 + dt2));
          }
        }
        if (onEdge || bb2.contains(p1)) {
          if (i >= iterations) {
            res.push(mr(t1, t2, err));
            break;
          }
          const p2 = e2.pointAt(0.5);
          const [e21, e22] = e2.splitAt(0.5);
          queue.push(mp(i, PT.PP, [p1, p2], t1, t2));
          queue.push(mp(i + 1, PT.PE, [p1, e21], t1, t2 - delta));
          queue.push(mp(i + 1, PT.PE, [p1, e22], t1, t2 + delta));
        }
      }
      break;
    case PT.EP:
      {
        const [e1, p2] = pair;
        const bb1 = e1.boundingBox();
        if (bb1.isPoint()) {
          queue.push(mp(i, PT.PP, [bb1.topLeft(), p2], t1, t2));
          break;
        }
        const onEdge = bb1.hasOnEdge(p2);
        if (onEdge) {
          const eps1 = e1.extremePoints();
          for (const ep1 of eps1) {
            const dt1 = (ep1.t - 0.5) * 0.5 ** i;
            queue.push(mp(i, PT.PP, [ep1.point, p2], t1 + dt1, t2));
          }
        }
        if (onEdge || bb1.contains(p2)) {
          if (i >= iterations) {
            res.push(mr(t1, t2, err));
            break;
          }
          const p1 = e1.pointAt(0.5);
          const [e11, e12] = e1.splitAt(0.5);
          queue.push(mp(i, PT.PP, [p1, p2], t1, t2));
          queue.push(mp(i + 1, PT.EP, [e11, p2], t1 - delta, t2));
          queue.push(mp(i + 1, PT.EP, [e12, p2], t1 + delta, t2));
        }
      }
      break;
    case PT.EE:
      {
        const [e1, e2] = pair;
        const bb1 = e1.boundingBox();
        if (bb1.isPoint()) {
          queue.push(mp(i, PT.PE, [bb1.topLeft(), e2], t1, t2));
          break;
        }
        const bb2 = e2.boundingBox();
        if (bb2.isPoint()) {
          queue.push(mp(i, PT.EP, [e1, bb2.topLeft()], t1, t2));
          break;
        }
        if (bb1.overlaps(bb2)) {
          if (i >= iterations) {
            res.push(mr(t1, t2, err));
            break;
          }
          const p1 = e1.pointAt(0.5);
          const p2 = e2.pointAt(0.5);
          const [e11, e12] = e1.splitAt(0.5);
          const [e21, e22] = e2.splitAt(0.5);
          queue.push(mp(i, PT.PP, [p1, p2], t1, t2));
          queue.push(mp(i + 1, PT.PE, [p1, e21], t1, t2 - delta));
          queue.push(mp(i + 1, PT.PE, [p1, e22], t1, t2 + delta));
          queue.push(mp(i + 1, PT.EP, [e11, p2], t1 - delta, t2));
          queue.push(mp(i + 1, PT.EP, [e12, p2], t1 + delta, t2));
          queue.push(mp(i + 1, PT.EE, [e11, e21], t1 - delta, t2 - delta));
          queue.push(mp(i + 1, PT.EE, [e11, e22], t1 - delta, t2 + delta));
          queue.push(mp(i + 1, PT.EE, [e12, e21], t1 + delta, t2 - delta));
          queue.push(mp(i + 1, PT.EE, [e12, e22], t1 + delta, t2 + delta));
        }
      }
      break;
    default:
      throw new Error("unknown pair type");
    }
    if (exactRes.length > maxIntersections) {
      // infinitely many intersections
      return undefined;
    }
  }
  return res
    .filter((r, i) => {
      for (let j = 0; j < res.length; j++) {
        if (j === i) {
          continue;
        }
        const s = res[j];
        const close = Math.abs(r.t1 - s.t1) < Math.SQRT2 * (r.err + s.err)
          && Math.abs(r.t2 - s.t2) < Math.SQRT2 * (r.err + s.err);
        if (close && r.err > s.err) {
          return false;
        }
        if (close && r.err === s.err && i > j) {
          return false;
        }
      }
      return true;
    })
    .map(r => {
      const { t1, t2 } = r;
      const p1 = edge1.pointAt(t1);
      const p2 = edge2.pointAt(t2);
      const point = p1.add(p2).scale(0.5);
      return { t1, t2, point };
    });
}
