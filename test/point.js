import { expect } from "chai";

import { Point } from "../lib/point.js";

describe("point", () => {
  /**
   * @test {Point}
   */
  describe("Point", () => {
    /**
     * @test {Point.constructor}
     */
    describe("constructor(x, y)", () => {
      it("should create a new Point object", () => {
        const p = new Point(0, 1);
        expect(p).to.be.an.instanceOf(Point);
        expect(p.x).to.equal(0);
        expect(p.y).to.equal(1);
      });
    });

    /**
     * @test {Point.of}
     */
    describe(".of(src)", () => {
      context("when `src` is a Point object", () => {
        it("should return `src` itself", () => {
          const p = new Point(0, 1);
          const q = Point.of(p);
          expect(q).to.be.equal(p);
        });
      });

      context("when `src` is an Array with two or more element", () => {
        it("should return a new Point object whose `x` and `y` are the first and second elements", () => {
          const p = [0, 1];
          const q = Point.of(p);
          expect(q).to.be.an.instanceOf(Point);
          expect(q.x).to.equal(0);
          expect(q.y).to.equal(1);
        });
      });

      context("when `src` is an object with properties `x` and `y`", () => {
        it("should return a new Point object whose `x` and `y` are those of `src`", () => {
          const p = { x: 0, y: 1 };
          const q = Point.of(p);
          expect(q).to.be.an.instanceOf(Point);
          expect(q.x).to.equal(0);
          expect(q.y).to.equal(1);
        });
      });

      context("otherwise", () => {
        it("should throw a TypeError", () => {
          expect(() => Point.of([0])).to.throw(TypeError);
          expect(() => Point.of({ x: 0 })).to.throw(TypeError);
          expect(() => Point.of(0, 1)).to.throw(TypeError);
          expect(() => Point.of("0,1")).to.throw(TypeError);
          expect(() => Point.of(null)).to.throw(TypeError);
        });
      });
    });

    /**
     * @test {Point.deserialize}
     */
    describe(".deserialize(obj)", () => {
      it("should be an inverse function of Point#serialize", () => {
        const p = new Point(0, 1);
        const q = Point.deserialize(p.serialize());
        expect(q).to.be.an.instanceOf(Point);
        expect(q.x).to.equal(p.x);
        expect(q.y).to.equal(p.y);
      });
    });

    /**
     * @test {Point#x}
     */
    describe("#x", () => {
      it("should be readable and writable", () => {
        const p = new Point(0, 1);
        expect(p.x).to.equal(0);
        p.x = 2;
        expect(p.x).to.equal(2);
      });
    });

    /**
     * @test {Point#y}
     */
    describe("#y", () => {
      it("should be readable and writable", () => {
        const p = new Point(0, 1);
        expect(p.y).to.equal(1);
        p.y = 2;
        expect(p.y).to.equal(2);
      });
    });

    /**
     * @test {Point#serialize}
     */
    describe("#serialize()", () => {
      it("should create an array containing two elements which are X- and Y-coordinates", () => {
        const p = new Point(0, 1);
        expect(p.serialize()).to.deep.equal([0, 1]);
      });
    });

    /**
     * @test {Point#clone}
     */
    describe("#clone()", () => {
      it("should return a copy of the Point object", () => {
        const p = new Point(0, 1);
        const q = p.clone();
        expect(q).not.to.equal(p);
        expect(q).to.be.an.instanceOf(Point);
        expect(q.x).to.equal(0);
        expect(q.y).to.equal(1);
      });
    });

    /**
     * @test {Point#equals}
     */
    describe("#equals(point)", () => {
      it("should check if the point is identical to another point", () => {
        const p = new Point(0, 1);
        expect(p.equals(new Point(0, 1))).to.be.true;
        expect(p.equals(new Point(0, 2))).to.be.false;
        expect(p.equals(new Point(2, 1))).to.be.false;
        expect(p.equals(new Point(2, 3))).to.be.false;
      });
    });

    /**
     * @test {Point#add}
     */
    describe("#add(point)", () => {
      it("should return a new Point object with corrdinates added", () => {
        const p = new Point(0, 1);
        const q = new Point(2, 3);
        const r = p.add(q);
        expect(r).to.be.an.instanceOf(Point);
        expect(r.x).to.equal(2);
        expect(r.y).to.equal(4);
      });
    });

    /**
     * @test {Point#sub}
     */
    describe("#sub(point)", () => {
      it("should return a new Point object with corrdinates subtracted", () => {
        const p = new Point(0, 1);
        const q = new Point(2, 3);
        const r = p.sub(q);
        expect(r).to.be.an.instanceOf(Point);
        expect(r.x).to.equal(-2);
        expect(r.y).to.equal(-2);
      });
    });
  });
});
