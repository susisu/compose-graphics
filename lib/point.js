export class Point {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

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

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  clone() {
    return new Point(this.x, this.y);
  }
}
