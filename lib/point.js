/**
 * A {@link Point} object represents a point on two-dimensional space.
 */
export class Point {
  /**
   * Create a new {@link Point} object.
   *
   * ``` javascript
   * const p = new Point(0, 1);
   * assert(p.x === 0);
   * assert(p.y === 1);
   * ```
   *
   * @param {number} x - X-coordinate.
   * @param {number} y - Y-coordinate.
   */
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  /**
   * Convert a point-like object to a {@link Point} object.
   *
   * A point-like object is one of
   * - a {@link Point} object,
   * - an array with two or more elements,
   * - an object with properties `x` and `y`.
   *
   * ``` javascript
   * const p = Point.of([0, 1]);
   * assert(p.x === 0);
   * assert(p.y === 1);
   *
   * const q = Point.of({ x: 2, y: 3 });
   * assert(q.x === 2);
   * assert(q.y === 3);
   * ```
   *
   * @param {Object} src - A point-like object.
   * @returns {Point} A {@link Point} object.
   */
  static of(src) {
    if (src instanceof Point) {
      return src;
    }
    if (Array.isArray(src) && src.length >= 2) {
      return new Point(src[0], src[1]);
    }
    if (typeof src === "object" && src !== null && "x" in src && "y" in src) {
      return new Point(src.x, src.y);
    }
    throw new TypeError(String(src) + " is not pointlike");
  }

  /**
   * X-coordinate.
   *
   * @type {number}
   */
  get x() {
    return this._x;
  }

  /**
   * Y-coordinate
   *
   * @type {number}
   */
  get y() {
    return this._y;
  }

  /**
   * Check if the point is identical to another point.
   *
   * @param {Point} point - A {@link Point} object to compare with.
   * @returns {boolean} `true` if two points are identical.
   */
  equals(point) {
    return this.x === point.x && this.y === point.y;
  }

  /**
   * Create a copy of the {@link Point} object.
   *
   * @returns {Point} A copy of the {@link Point} object.
   */
  clone() {
    return new Point(this.x, this.y);
  }

  /**
   * Add the coordinates of another point.
   *
   * @param {Point} point - A {@link Point} object.
   * @returns {Point} A new {@link Point} object with coordinates added.
   */
  add(point) {
    return new Point(this.x + point.x, this.y + point.y);
  }

  /**
   * Subtract the coordinates of another point.
   *
   * @param {Point} point - A {@link Point} object.
   * @returns {Point} A new {@link Point} object with coordinates subtracted.
   */
  sub(point) {
    return new Point(this.x - point.x, this.y - point.y);
  }
}
