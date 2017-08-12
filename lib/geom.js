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
    /**
     * X-coordinate
     *
     * @type {number}
     */
    this.x = x;
    /**
     * Y-coordinate
     *
     * @type {number}
     */
    this.y = y;
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
   * Retrieve a {@link Point} object from a pure object representation.
   * This is an inverse function of {@link Point#serialize}.
   *
   * @param {Object} obj - An object representing a point.
   * @returns {Point} A {@link Point} object.
   */
  static deserialize(obj) {
    return Point.of(obj);
  }

  /**
   * Return a pure object representation of the point.
   *
   * @returns {Object} An object representing the point.
   */
  serialize() {
    return [this.x, this.y];
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
   * Calculate the length of the point vector.
   *
   * @returns {number} The length of the point vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
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
   * Scale the point vector by a given ratio.
   *
   * @param {number} ratio - The ratio by which the point is scaled.
   * @returns {Point} A scaled point object.
   */
  scale(ratio) {
    return new Point(this.x * ratio, this.y * ratio);
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

  /**
   * Rotate the point around the specified origin.
   *
   * @param {number} angle - The rotation angle, in radian.
   * @param {Point} [origin=new Point(0, 0)] - The origin the point will be rotated around.
   * @returns {Point} The rotated point.
   */
  rotate(angle, origin = new Point(0, 0)) {
    const x = this.x - origin.x;
    const y = this.y - origin.y;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return new Point(
      origin.x + x * c - y * s,
      origin.y + x * s + y * c
    );
  }
}


/**
 * A {@link Rectangle} object represents a rectangle in the 2D space.
 */
export class Rectangle {
  /**
   * Create a new {@link Rectangle} object.
   *
   * @param {number} x - X-coordinate.
   * @param {number} y - Y-coordinate.
   * @param {number} width - Width of the rectangle.
   * @param {number} height - Height of the rectangle.
   */
  constructor(x, y, width, height) {
    /**
     * X-coordinate.
     *
     * @type {number}
     */
    this.x = x;
    /**
     * Y-coordinate.
     *
     * @type {number}
     */
    this.y = y;
    /**
     * Width of the rectangle.
     *
     * @type {width}
     */
    this.width = width;
    /**
     * Height of the rectangle.
     *
     * @type {number}
     */
    this.height = height;
  }
}