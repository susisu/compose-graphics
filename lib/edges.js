import { Point } from "./point.js";

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
      new Line(this.start, middle),
      new Line(middle, this.end)
    ];
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
      new QuadraticBezier(this.start, controlA, middle),
      new QuadraticBezier(middle, controlB, this.end)
    ];
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
      new CubicBezier(this.start, control1A, control2A, middle),
      new CubicBezier(middle, control1B, control2B, this.end)
    ];
  }
}
