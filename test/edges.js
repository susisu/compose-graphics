import { expect } from "chai";

import { Point, Rectangle } from "../lib/geom.js";
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
     * @test {Line#clone}
     */
    describe("#clone()", () => {
      it("should create a copy of the line segment", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const line = new Line(p1, p2);
        const copy = line.clone();
        expect(copy).to.be.an.instanceOf(Line);
        expect(copy).not.to.equal(line);
        expect(copy.start).to.be.an.instanceOf(Point);
        expect(copy.start).not.to.equal(line.start);
        expect(copy.start.x).to.equal(line.start.x);
        expect(copy.start.y).to.equal(line.start.y);
        expect(copy.end).to.be.an.instanceOf(Point);
        expect(copy.end).not.to.equal(line.end);
        expect(copy.end.x).to.equal(line.end.x);
        expect(copy.end.y).to.equal(line.end.y);
      });
    });

    /**
     * @test {Line#translate}
     */
    describe("#translate(dist)", () => {
      it("should return a translated line segment by the distance `dist`", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const line = new Line(p1, p2);
        const translated = line.translate(new Point(4, 5));
        expect(translated).to.be.an.instanceOf(Line);
        expect(translated.start).to.be.an.instanceOf(Point);
        expect(translated.start.x).to.equal(4);
        expect(translated.start.y).to.equal(6);
        expect(translated.end).to.be.an.instanceOf(Point);
        expect(translated.end.x).to.equal(6);
        expect(translated.end.y).to.equal(8);
      });
    });

    /**
     * @test {Line#rotate}
     */
    describe("#rotate(angle, origin = new Point(0, 0))", () => {
      context("when `origin` is specified", () => {
        it("should return a line segment rotated around the specified origin", () => {
          const p1 = new Point(0, 1);
          const p2 = new Point(2, 3);
          const line = new Line(p1, p2);
          const rotated = line.rotate(Math.PI / 2, new Point(1, 1));
          expect(rotated).to.be.an.instanceOf(Line);
          expect(rotated.start).to.be.an.instanceOf(Point);
          expect(rotated.start.x).to.be.closeTo(1, EPS);
          expect(rotated.start.y).to.be.closeTo(0, EPS);
          expect(rotated.end).to.be.an.instanceOf(Point);
          expect(rotated.end.x).to.be.closeTo(-1, EPS);
          expect(rotated.end.y).to.be.closeTo(2, EPS);
        });
      });

      context("when `origin` is not specified", () => {
        it("should return a line segment rotated around (0, 0)", () => {
          const p1 = new Point(0, 1);
          const p2 = new Point(2, 3);
          const line = new Line(p1, p2);
          const rotated = line.rotate(Math.PI / 2);
          expect(rotated).to.be.an.instanceOf(Line);
          expect(rotated.start).to.be.an.instanceOf(Point);
          expect(rotated.start.x).to.be.closeTo(-1, EPS);
          expect(rotated.start.y).to.be.closeTo(0, EPS);
          expect(rotated.end).to.be.an.instanceOf(Point);
          expect(rotated.end.x).to.be.closeTo(-3, EPS);
          expect(rotated.end.y).to.be.closeTo(2, EPS);
        });
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
          expect(splits[0].start).not.to.equal(line.start);
          expect(splits[1].end).not.to.equal(line.end);
          expect(splits[0].end).not.to.equal(splits[1].start);
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

    /**
     * @test {Line#boundingBox}
     */
    describe("#boundingBox()", () => {
      it("should return a rectangle object representing the bounding box", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const line = new Line(p1, p2);
        const bb = line.boundingBox();
        expect(bb).to.be.an.instanceOf(Rectangle);
        expect(bb.x).to.be.closeTo(0, EPS);
        expect(bb.y).to.be.closeTo(1, EPS);
        expect(bb.width).to.be.closeTo(2, EPS);
        expect(bb.height).to.be.closeTo(2, EPS);
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
     * @test {QuadraticBezier#clone}
     */
    describe("#clone()", () => {
      it("should create a copy of the curve", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const curve = new QuadraticBezier(p1, p2, p3);
        const copy = curve.clone();
        expect(copy).to.be.an.instanceOf(QuadraticBezier);
        expect(copy).not.to.equal(curve);
        expect(copy.start).to.be.an.instanceOf(Point);
        expect(copy.start).not.to.equal(curve.start);
        expect(copy.start.x).to.equal(curve.start.x);
        expect(copy.start.y).to.equal(curve.start.y);
        expect(copy.control).to.be.an.instanceOf(Point);
        expect(copy.control).not.to.equal(curve.control);
        expect(copy.control.x).to.equal(curve.control.x);
        expect(copy.control.y).to.equal(curve.control.y);
        expect(copy.end).to.be.an.instanceOf(Point);
        expect(copy.end).not.to.equal(curve.end);
        expect(copy.end.x).to.equal(curve.end.x);
        expect(copy.end.y).to.equal(curve.end.y);
      });
    });

    /**
     * @test {QuadraticBezier#translate}
     */
    describe("#translate(dist)", () => {
      it("should return a translated curve by the distance `dist`", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const curve = new QuadraticBezier(p1, p2, p3);
        const translated = curve.translate(new Point(6, 7));
        expect(translated).to.be.an.instanceOf(QuadraticBezier);
        expect(translated.start).to.be.an.instanceOf(Point);
        expect(translated.start.x).to.equal(6);
        expect(translated.start.y).to.equal(8);
        expect(translated.control).to.be.an.instanceOf(Point);
        expect(translated.control.x).to.equal(8);
        expect(translated.control.y).to.equal(10);
        expect(translated.end).to.be.an.instanceOf(Point);
        expect(translated.end.x).to.equal(10);
        expect(translated.end.y).to.equal(12);
      });
    });

    /**
     * @test {QuadraticBezier#rotate}
     */
    describe("#rotate(angle, origin = new Point(0, 0))", () => {
      context("when `origin` is specified", () => {
        it("should return a curve rotated around the specified origin", () => {
          const p1 = new Point(0, 1);
          const p2 = new Point(2, 3);
          const p3 = new Point(4, 5);
          const curve = new QuadraticBezier(p1, p2, p3);
          const rotated = curve.rotate(Math.PI / 2, new Point(1, 1));
          expect(rotated).to.be.an.instanceOf(QuadraticBezier);
          expect(rotated.start).to.be.an.instanceOf(Point);
          expect(rotated.start.x).to.be.closeTo(1, EPS);
          expect(rotated.start.y).to.be.closeTo(0, EPS);
          expect(rotated.control).to.be.an.instanceOf(Point);
          expect(rotated.control.x).to.be.closeTo(-1, EPS);
          expect(rotated.control.y).to.be.closeTo(2, EPS);
          expect(rotated.end).to.be.an.instanceOf(Point);
          expect(rotated.end.x).to.be.closeTo(-3, EPS);
          expect(rotated.end.y).to.be.closeTo(4, EPS);
        });
      });

      context("when `origin` is not specified", () => {
        it("should return a curve rotated around (0, 0)", () => {
          const p1 = new Point(0, 1);
          const p2 = new Point(2, 3);
          const p3 = new Point(4, 5);
          const curve = new QuadraticBezier(p1, p2, p3);
          const rotated = curve.rotate(Math.PI / 2);
          expect(rotated).to.be.an.instanceOf(QuadraticBezier);
          expect(rotated.start).to.be.an.instanceOf(Point);
          expect(rotated.start.x).to.be.closeTo(-1, EPS);
          expect(rotated.start.y).to.be.closeTo(0, EPS);
          expect(rotated.control).to.be.an.instanceOf(Point);
          expect(rotated.control.x).to.be.closeTo(-3, EPS);
          expect(rotated.control.y).to.be.closeTo(2, EPS);
          expect(rotated.end).to.be.an.instanceOf(Point);
          expect(rotated.end.x).to.be.closeTo(-5, EPS);
          expect(rotated.end.y).to.be.closeTo(4, EPS);
        });
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
          expect(splits[0].start).not.to.equal(curve.start);
          expect(splits[1].end).not.to.equal(curve.end);
          expect(splits[0].end).not.to.equal(splits[1].start);
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

    /**
     * @test {QuadraticBezier#boundingBox}
     */
    describe("#boundingBox()", () => {
      it("should return a rectangle object representing the bounding box", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const curve = new QuadraticBezier(p1, p2, p3);
        const bb = curve.boundingBox();
        expect(bb).to.be.an.instanceOf(Rectangle);
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
     * @test {CubicBezier#clone}
     */
    describe("#clone()", () => {
      it("should create a copy of the curve", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        const copy = curve.clone();
        expect(copy).to.be.an.instanceOf(CubicBezier);
        expect(copy).not.to.equal(curve);
        expect(copy.start).to.be.an.instanceOf(Point);
        expect(copy.start).not.to.equal(curve.start);
        expect(copy.start.x).to.equal(curve.start.x);
        expect(copy.start.y).to.equal(curve.start.y);
        expect(copy.control1).to.be.an.instanceOf(Point);
        expect(copy.control1).not.to.equal(curve.control1);
        expect(copy.control1.x).to.equal(curve.control1.x);
        expect(copy.control1.y).to.equal(curve.control1.y);
        expect(copy.control2).to.be.an.instanceOf(Point);
        expect(copy.control2).not.to.equal(curve.control2);
        expect(copy.control2.x).to.equal(curve.control2.x);
        expect(copy.control2.y).to.equal(curve.control2.y);
        expect(copy.end).to.be.an.instanceOf(Point);
        expect(copy.end).not.to.equal(curve.end);
        expect(copy.end.x).to.equal(curve.end.x);
        expect(copy.end.y).to.equal(curve.end.y);
      });
    });

    /**
     * @test {CubicBezier#translate}
     */
    describe("#translate(dist)", () => {
      it("should return a translated curve by the distance `dist`", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        const translated = curve.translate(new Point(8, 9));
        expect(translated).to.be.an.instanceOf(CubicBezier);
        expect(translated.start).to.be.an.instanceOf(Point);
        expect(translated.start.x).to.equal(8);
        expect(translated.start.y).to.equal(10);
        expect(translated.control1).to.be.an.instanceOf(Point);
        expect(translated.control1.x).to.equal(10);
        expect(translated.control1.y).to.equal(12);
        expect(translated.control2).to.be.an.instanceOf(Point);
        expect(translated.control2.x).to.equal(12);
        expect(translated.control2.y).to.equal(14);
        expect(translated.end).to.be.an.instanceOf(Point);
        expect(translated.end.x).to.equal(14);
        expect(translated.end.y).to.equal(16);
      });
    });

    /**
     * @test {CubicBezier#rotate}
     */
    describe("#rotate(angle, origin = new Point(0, 0))", () => {
      context("when `origin` is specified", () => {
        it("should return a curve rotated around the specified origin", () => {
          const p1 = new Point(0, 1);
          const p2 = new Point(2, 3);
          const p3 = new Point(4, 5);
          const p4 = new Point(6, 7);
          const curve = new CubicBezier(p1, p2, p3, p4);
          const rotated = curve.rotate(Math.PI / 2, new Point(1, 1));
          expect(rotated).to.be.an.instanceOf(CubicBezier);
          expect(rotated.start).to.be.an.instanceOf(Point);
          expect(rotated.start.x).to.be.closeTo(1, EPS);
          expect(rotated.start.y).to.be.closeTo(0, EPS);
          expect(rotated.control1).to.be.an.instanceOf(Point);
          expect(rotated.control1.x).to.be.closeTo(-1, EPS);
          expect(rotated.control1.y).to.be.closeTo(2, EPS);
          expect(rotated.control2).to.be.an.instanceOf(Point);
          expect(rotated.control2.x).to.be.closeTo(-3, EPS);
          expect(rotated.control2.y).to.be.closeTo(4, EPS);
          expect(rotated.end).to.be.an.instanceOf(Point);
          expect(rotated.end.x).to.be.closeTo(-5, EPS);
          expect(rotated.end.y).to.be.closeTo(6, EPS);
        });
      });

      context("when `origin` is not specified", () => {
        it("should return a curve rotated around (0, 0)", () => {
          const p1 = new Point(0, 1);
          const p2 = new Point(2, 3);
          const p3 = new Point(4, 5);
          const p4 = new Point(6, 7);
          const curve = new CubicBezier(p1, p2, p3, p4);
          const rotated = curve.rotate(Math.PI / 2);
          expect(rotated).to.be.an.instanceOf(CubicBezier);
          expect(rotated.start).to.be.an.instanceOf(Point);
          expect(rotated.start.x).to.be.closeTo(-1, EPS);
          expect(rotated.start.y).to.be.closeTo(0, EPS);
          expect(rotated.control1).to.be.an.instanceOf(Point);
          expect(rotated.control1.x).to.be.closeTo(-3, EPS);
          expect(rotated.control1.y).to.be.closeTo(2, EPS);
          expect(rotated.control2).to.be.an.instanceOf(Point);
          expect(rotated.control2.x).to.be.closeTo(-5, EPS);
          expect(rotated.control2.y).to.be.closeTo(4, EPS);
          expect(rotated.end).to.be.an.instanceOf(Point);
          expect(rotated.end.x).to.be.closeTo(-7, EPS);
          expect(rotated.end.y).to.be.closeTo(6, EPS);
        });
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
          expect(splits[0].start).not.to.equal(curve.start);
          expect(splits[1].end).not.to.equal(curve.end);
          expect(splits[0].end).not.to.equal(splits[1].start);
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

    /**
     * @test {CubicBezier#boundingBox}
     */
    describe("#boundingBox()", () => {
      it("should return a rectangle object representing the bounding box", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        const bb = curve.boundingBox();
        expect(bb).to.be.an.instanceOf(Rectangle);
      });
    });
  });
});
