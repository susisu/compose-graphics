/* eslint-env mocha */

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
     * @test {Point#x}
     */
    describe("#x", () => {
      it("should be read-only", () => {
        const p = new Point(0, 1);
        expect(() => { p.x = 2; }).to.throw(Error);
      });
    });

    /**
     * @test {Point#y}
     */
    describe("#y", () => {
      it("should be read-only", () => {
        const p = new Point(0, 1);
        expect(() => { p.y = 2; }).to.throw(Error);
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
  });
});
