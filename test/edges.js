import { expect } from "chai";

import { Point } from "../lib/point.js";
import { Line, QuadraticBezier, CubicBezier } from "../lib/edges.js";

describe("edges", () => {
  /**
   * @test {Line}
   */
  describe("Line", () => {
    /**
     * @test {Line.constructor}
     */
    describe("constructor(start, end)", () => {
      it("should create a new Line instance", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const line = new Line(p1, p2);
        expect(line).to.be.an.instanceOf(Line);
        expect(line.start).to.equal(p1);
        expect(line.end).to.equal(p2);
      });
    });

    /**
     * @test {Line#start}
     */
    describe("#start", () => {
      it("should be readable and writable", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const line = new Line(p1, p2);
        expect(line.start).to.equal(p1);
        const p3 = new Point(4, 5);
        line.start = p3;
        expect(line.start).to.equal(p3);
      });
    });

    /**
     * @test {Line#end}
     */
    describe("#end", () => {
      it("should be readable and writable", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const line = new Line(p1, p2);
        expect(line.end).to.equal(p2);
        const p3 = new Point(4, 5);
        line.end = p3;
        expect(line.end).to.equal(p3);
      });
    });
  });

  /**
   * @test {QuadraticBezier}
   */
  describe("QuadraticBezier", () => {
    /**
     * @test {QuadraticBezier.constructor}
     */
    describe("constructor(start, control, end)", () => {
      it("should create a new QuadraticBezier instance", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const curve = new QuadraticBezier(p1, p2, p3);
        expect(curve).to.be.an.instanceOf(QuadraticBezier);
        expect(curve.start).to.equal(p1);
        expect(curve.control).to.equal(p2);
        expect(curve.end).to.equal(p3);
      });
    });

    /**
     * @test {QuadraticBezier#start}
     */
    describe("#start", () => {
      it("should be readable and writable", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const curve = new QuadraticBezier(p1, p2, p3);
        expect(curve.start).to.equal(p1);
        const p4 = new Point(6, 7);
        curve.start = p4;
        expect(curve.start).to.equal(p4);
      });
    });

    /**
     * @test {QuadraticBezier#control}
     */
    describe("#control", () => {
      it("should be readable and writable", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const curve = new QuadraticBezier(p1, p2, p3);
        expect(curve.control).to.equal(p2);
        const p4 = new Point(6, 7);
        curve.control = p4;
        expect(curve.control).to.equal(p4);
      });
    });

    /**
     * @test {QuadraticBezier#end}
     */
    describe("#end", () => {
      it("should be readable and writable", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const curve = new QuadraticBezier(p1, p2, p3);
        expect(curve.end).to.equal(p3);
        const p4 = new Point(6, 7);
        curve.end = p4;
        expect(curve.end).to.equal(p4);
      });
    });
  });

  /**
   * @test {CubicBezier}
   */
  describe("CubicBezier", () => {
    /**
     * @test {CubicBezier.constructor}
     */
    describe("constructor(start, control1, control2, end)", () => {
      it("should create a new CubicBezier instance", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        expect(curve).to.be.an.instanceOf(CubicBezier);
        expect(curve.start).to.equal(p1);
        expect(curve.control1).to.equal(p2);
        expect(curve.control2).to.equal(p3);
        expect(curve.end).to.equal(p4);
      });
    });

    /**
     * @test {CubicBezier#start}
     */
    describe("#start", () => {
      it("should be readable and writable", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        expect(curve.start).to.equal(p1);
        const p5 = new Point(8, 9);
        curve.start = p5;
        expect(curve.start).to.equal(p5);
      });
    });

    /**
     * @test {CubicBezier#control1}
     */
    describe("#control1", () => {
      it("should be readable and writable", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        expect(curve.control1).to.equal(p2);
        const p5 = new Point(8, 9);
        curve.control1 = p5;
        expect(curve.control1).to.equal(p5);
      });
    });

    /**
     * @test {CubicBezier#control2}
     */
    describe("#control2", () => {
      it("should be readable and writable", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        expect(curve.control2).to.equal(p3);
        const p5 = new Point(8, 9);
        curve.control2 = p5;
        expect(curve.control2).to.equal(p5);
      });
    });

    /**
     * @test {CubicBezier#end}
     */
    describe("#end", () => {
      it("should be readable and writable", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        expect(curve.end).to.equal(p4);
        const p5 = new Point(8, 9);
        curve.end = p5;
        expect(curve.end).to.equal(p5);
      });
    });
  });
});
