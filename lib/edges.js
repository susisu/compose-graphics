import { Point, Rectangle } from "./geom.js";

/**
 * A {@link Line} object represents a line segment on the 2D space.
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
}


/**
 * A {@link QuadraticBezier} object represents a quadratic Bezier curve on the 2D space.
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
}


/**
 * A {@link CubicBezier} object represents a cubic Bezier curve on the 2D space.
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
}
