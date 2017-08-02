import { Point } from "./point.js";

/**
 * An {@link Anchor} object consists of a point `body` and two optional control points `head` and `tail`.
 */
export class Anchor {
  /**
   * Create a new {@link Anchor} object.
   *
   * @param {Point} body - A point at the center of the anchor.
   * @param {Point|undefined} [head=undefined] - A control point at the foreside of the anchor.
   * @param {Point|undefined} [tail=undefined] - A control point at the backside of the anchor.
   */
  constructor(body, head = undefined, tail = undefined) {
    /**
     * A point at the center of the anchor.
     *
     * @type {Point}
     */
    this.body = body;
    /**
     * An optional control point at the foreside of the anchor.
     *
     * @type {Point|undefined}
     */
    this.head = head;
    /**
     * An optional control point at the backside of the anchor.
     * @type {Point|undefined}
     */
    this.tail = tail;
  }

  /**
   * Retrieve an anchor object from pure object representation.
   * This is an inverse function of {@link Anchor#serialize}.
   *
   * @param {Object} obj - A pure object representation of an anchor.
   * @returns {Anchor} An {@link Anchor} object.
   */
  static deserialize(obj) {
    return new Anchor(
      Point.deserialize(obj.body),
      obj.head ? Point.deserialize(obj.head) : undefined,
      obj.tail ? Point.deserialize(obj.tail) : undefined
    );
  }

  /**
   * Return a pure object representation of the anchor.
   *
   * @returns {Object} A pure object representation of the anchor.
   */
  serialize() {
    const obj = { body: this.body.serialize() };
    if (this.head) {
      obj.head = this.head.serialize();
    }
    if (this.tail) {
      obj.tail = this.tail.serialize();
    }
    return obj;
  }

  /**
   * Create a deep copy of the anchor.
   *
   * @returns {Anchor} A copy of the anchor.
   */
  clone() {
    return new Anchor(
      this.body.clone(),
      this.head && this.head.clone(),
      this.tail && this.tail.clone()
    );
  }
}
