import { expect } from "chai";

import { Point } from "../lib/point.js";
import { Line, QuadraticBezier, CubicBezier } from "../lib/edges.js";

describe("edges", () => {
  const EPS = 1e-8;

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

    /**
     * @test {Line#pointAt}
     */
    describe("#pointAt(t)", () => {
      it("should return a point object that represents a point at `t` on the line segment", () => {
        const p1 = new Point(1, 1);
        const p2 = new Point(2, 2);
        const line = new Line(p1, p2);
        const q = line.pointAt(0.5);
        expect(q).to.be.an.instanceOf(Point);
        expect(q.x).to.be.closeTo(1.5, EPS);
        expect(q.y).to.be.closeTo(1.5, EPS);
      });
    });

    /**
     * @test {Line#splitAt}
     */
    describe("#splitAt(t)", () => {
      it("should return two split line segments", () => {
        const p1 = new Point(1, 1);
        const p2 = new Point(2, 2);
        const line = new Line(p1, p2);
        for (const t of [0.25, 0.5, 0.75]) {
          const splits = line.splitAt(t);
          expect(splits).to.be.an("array").that.has.length(2);
          for (const u of [0.25, 0.5, 0.75]) {
            {
              const q1 = splits[0].pointAt(u);
              const q2 = line.pointAt(t * u);
              expect(q1.x).to.be.closeTo(q2.x, EPS);
              expect(q1.y).to.be.closeTo(q2.y, EPS);
            }
            {
              const q1 = splits[1].pointAt(u);
              const q2 = line.pointAt(t + (1 - t) * u);
              expect(q1.x).to.be.closeTo(q2.x, EPS);
              expect(q1.y).to.be.closeTo(q2.y, EPS);
            }
          }
        }
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

    /**
     * @test {QuadraticBezier#pointAt}
     */
    describe("#pointAt(t)", () => {
      it("should return a point object that represents a point at `t` on the curve", () => {
        const p1 = new Point(1, 1);
        const p2 = new Point(1, 2);
        const p3 = new Point(2, 2);
        const curve = new QuadraticBezier(p1, p2, p3);
        const q = curve.pointAt(0.5);
        expect(q).to.be.an.instanceOf(Point);
        expect(q.x).to.be.closeTo(1.25, EPS);
        expect(q.y).to.be.closeTo(1.75, EPS);
      });
    });

    /**
     * @test {QuadraticBezier#splitAt}
     */
    describe("#splitAt(t)", () => {
      it("should return two split curves", () => {
        const p1 = new Point(1, 1);
        const p2 = new Point(1, 2);
        const p3 = new Point(2, 2);
        const curve = new QuadraticBezier(p1, p2, p3);
        for (const t of [0.25, 0.5, 0.75]) {
          const splits = curve.splitAt(t);
          expect(splits).to.be.an("array").that.has.length(2);
          for (const u of [0.25, 0.5, 0.75]) {
            {
              const q1 = splits[0].pointAt(u);
              const q2 = curve.pointAt(t * u);
              expect(q1.x).to.be.closeTo(q2.x, EPS);
              expect(q1.y).to.be.closeTo(q2.y, EPS);
            }
            {
              const q1 = splits[1].pointAt(u);
              const q2 = curve.pointAt(t + (1 - t) * u);
              expect(q1.x).to.be.closeTo(q2.x, EPS);
              expect(q1.y).to.be.closeTo(q2.y, EPS);
            }
          }
        }
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

    /**
     * @test {CubicBezier#pointAt}
     */
    describe("#pointAt(t)", () => {
      it("should return a point object that represents a point at `t` on the curve", () => {
        const p1 = new Point(1, 1);
        const p2 = new Point(1, 2);
        const p3 = new Point(2, 2);
        const p4 = new Point(2, 1);
        const curve = new CubicBezier(p1, p2, p3, p4);
        const q = curve.pointAt(0.5);
        expect(q).to.be.an.instanceOf(Point);
        expect(q.x).to.be.closeTo(1.5, EPS);
        expect(q.y).to.be.closeTo(1.75, EPS);
      });
    });

    /**
     * @test {CubicBezier#splitAt}
     */
    describe("#splitAt(t)", () => {
      it("should return two split curves", () => {
        const p1 = new Point(1, 1);
        const p2 = new Point(1, 2);
        const p3 = new Point(2, 2);
        const p4 = new Point(2, 1);
        const curve = new CubicBezier(p1, p2, p3, p4);
        for (const t of [0.25, 0.5, 0.75]) {
          const splits = curve.splitAt(t);
          expect(splits).to.be.an("array").that.has.length(2);
          for (const u of [0.25, 0.5, 0.75]) {
            {
              const q1 = splits[0].pointAt(u);
              const q2 = curve.pointAt(t * u);
              expect(q1.x).to.be.closeTo(q2.x, EPS);
              expect(q1.y).to.be.closeTo(q2.y, EPS);
            }
            {
              const q1 = splits[1].pointAt(u);
              const q2 = curve.pointAt(t + (1 - t) * u);
              expect(q1.x).to.be.closeTo(q2.x, EPS);
              expect(q1.y).to.be.closeTo(q2.y, EPS);
            }
          }
        }
      });
    });
  });
});
