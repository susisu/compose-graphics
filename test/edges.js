import { expect } from "chai";

import { Point, Rectangle } from "../lib/geom.js";
import { Line, QuadraticBezier, CubicBezier, intersectionsLL, intersections, selfIntersections } from "../lib/edges.js";

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
     * @test {Line#degree}
     */
    describe("#degree()", () => {
      it("should return 1", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const line = new Line(p1, p2);
        expect(line.degree()).to.equal(1);
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
    describe("#rotate(angle, center = new Point(0, 0))", () => {
      context("when `center` is specified", () => {
        it("should return a line segment rotated around the specified center", () => {
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

      context("when `center` is not specified", () => {
        it("should return a line segment rotated around the origin (0, 0)", () => {
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
          expect(splits).to.be.an("array").of.length(2);
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
     * @test {Line#extremePoints}
     */
    describe("#extremePoints()", () => {
      it("should return an array of objects, each object has information about an extreme point", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const line = new Line(p1, p2);
        const eps = line.extremePoints();
        expect(eps).to.be.an("array").of.length(2);
        for (const ep of eps) {
          expect(ep).to.be.an("object");
          expect(ep.t).to.be.a("number");
          expect(ep.point).to.be.an.instanceOf(Point);
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

    /**
     * @test {Line#deviationFromLine}
     */
    describe("#deviationFromLine()", () => {
      it("should return 0", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const line = new Line(p1, p2);
        expect(line.deviationFromLine()).to.equal(0);
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
     * @test {QuadraticBezier#degree}
     */
    describe("#degree()", () => {
      it("should return 2", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const curve = new QuadraticBezier(p1, p2, p3);
        expect(curve.degree()).to.equal(2);
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
    describe("#rotate(angle, center = new Point(0, 0))", () => {
      context("when `center` is specified", () => {
        it("should return a curve rotated around the specified center", () => {
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

      context("when `center` is not specified", () => {
        it("should return a curve rotated around the origin (0, 0)", () => {
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
          expect(splits).to.be.an("array").of.length(2);
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
     * @test {QuadraticBezier#extremePoints}
     */
    describe("#extremePoints()", () => {
      it("should return an array of objects, each object has information about an extreme point", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const curve = new QuadraticBezier(p1, p2, p3);
        const eps = curve.extremePoints();
        expect(eps).to.be.an("array");
        for (const ep of eps) {
          expect(ep).to.be.an("object");
          expect(ep.t).to.be.a("number");
          expect(ep.point).to.be.an.instanceOf(Point);
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

    /**
     * @test {QuadraticBezier#deviationFromLine}
     */
    describe("#deviationFromLine()", () => {
      it("should return the degree of deviation from line", () => {
        {
          const p1 = new Point(0, 0);
          const p2 = new Point(2, 0);
          const p3 = new Point(2, 2);
          const curve = new QuadraticBezier(p1, p2, p3);
          expect(curve.deviationFromLine()).to.be.closeTo(0.25, EPS);
        }
        {
          const p1 = new Point(0, 0);
          const p2 = new Point(3, 2);
          const p3 = new Point(2, 2);
          const curve = new QuadraticBezier(p1, p2, p3);
          expect(curve.deviationFromLine()).to.equal(Infinity);
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
     * @test {CubicBezier#degree}
     */
    describe("#degree()", () => {
      it("should return 3", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        expect(curve.degree()).to.equal(3);
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
    describe("#rotate(angle, center = new Point(0, 0))", () => {
      context("when `center` is specified", () => {
        it("should return a curve rotated around the specified center", () => {
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

      context("when `center` is not specified", () => {
        it("should return a curve rotated around the origin (0, 0)", () => {
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
          expect(splits).to.be.an("array").of.length(2);
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
     * @test {CubicBezier#extremePoints}
     */
    describe("#extremePoints()", () => {
      it("should return an array of objects, each object has information about an extreme point", () => {
        const p1 = new Point(0, 1);
        const p2 = new Point(2, 3);
        const p3 = new Point(4, 5);
        const p4 = new Point(6, 7);
        const curve = new CubicBezier(p1, p2, p3, p4);
        const eps = curve.extremePoints();
        expect(eps).to.be.an("array");
        for (const ep of eps) {
          expect(ep).to.be.an("object");
          expect(ep.t).to.be.a("number");
          expect(ep.point).to.be.an.instanceOf(Point);
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

    /**
     * @test {CubicBezier#deviationFromLine}
     */
    describe("#deviationFromLine()", () => {
      it("should return the degree of deviation from line", () => {
        {
          const p1 = new Point(0, 0);
          const p2 = new Point(2, 0);
          const p3 = new Point(2, 2);
          const p4 = new Point(0, 2);
          const curve = new CubicBezier(p1, p2, p3, p4);
          expect(curve.deviationFromLine()).to.be.closeTo(3 / 4, EPS);
        }
        {
          const p1 = new Point(1, 0);
          const p2 = new Point(0, 0);
          const p3 = new Point(2, 2);
          const p4 = new Point(1, 2);
          const curve = new CubicBezier(p1, p2, p3, p4);
          expect(curve.deviationFromLine()).not.to.equal(Infinity);
        }
        {
          const p1 = new Point(0, 0);
          const p2 = new Point(2, 0);
          const p3 = new Point(3, 2);
          const p4 = new Point(2, 2);
          const curve = new CubicBezier(p1, p2, p3, p4);
          expect(curve.deviationFromLine()).to.equal(Infinity);
        }
      });
    });
  });

  /**
   * @test {intersectionsLL}
   */
  describe("intersectionsLL(line1, line2)", () => {
    it("should compute intersections of two line segments", () => {
      {
        const edge1 = new Line(new Point(0, 0), new Point(3, 3));
        const edge2 = new Line(new Point(0, 2), new Point(1, 2));
        const is = intersectionsLL(edge1, edge2);
        expect(is).to.be.an("array").of.length(0);
      }
      {
        const edge1 = new Line(new Point(0, 0), new Point(1, 1));
        const edge2 = new Line(new Point(2, 2), new Point(3, 3));
        const is = intersectionsLL(edge1, edge2);
        expect(is).to.be.an("array").of.length(0);
      }
      {
        const edge1 = new Line(new Point(0, 0), new Point(1, 1));
        const edge2 = new Line(new Point(1, 1), new Point(2, 2));
        const is = intersectionsLL(edge1, edge2);
        expect(is).to.be.an("array").of.length(1);
      }
      {
        const edge1 = new Line(new Point(0, 0), new Point(3, 3));
        const edge2 = new Line(new Point(0, 2), new Point(2, 2));
        const is = intersectionsLL(edge1, edge2);
        expect(is).to.be.an("array").of.length(1);
      }
      {
        const edge1 = new Line(new Point(0, 0), new Point(3, 3));
        const edge2 = new Line(new Point(0, 2), new Point(3, 2));
        const is = intersectionsLL(edge1, edge2);
        expect(is).to.be.an("array").of.length(1);
      }
    });

    it("should return undefined if there are infinitely many intersections", () => {
      const edge1 = new Line(new Point(0, 0), new Point(3, 3));
      const edge2 = new Line(new Point(0, 0), new Point(2, 2));
      const is = intersections(edge1, edge2);
      expect(is).to.be.undefined;
    });
  });

  /**
   * @test {intersections}
   */
  describe("intersections(edge1, edge2, depth, maxIteration = -1)", () => {
    const DEPTH = 20;

    context("line-line", () => {
      it("should compute intersections of two edges", () => {
        {
          const edge1 = new Line(new Point(0, 0), new Point(3, 3));
          const edge2 = new Line(new Point(0, 2), new Point(1, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge1 = new Line(new Point(0, 0), new Point(1, 1));
          const edge2 = new Line(new Point(2, 2), new Point(3, 3));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge1 = new Line(new Point(0, 0), new Point(1, 1));
          const edge2 = new Line(new Point(1, 1), new Point(2, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
        {
          const edge1 = new Line(new Point(0, 0), new Point(3, 3));
          const edge2 = new Line(new Point(0, 2), new Point(2, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
        {
          const edge1 = new Line(new Point(0, 0), new Point(3, 3));
          const edge2 = new Line(new Point(0, 2), new Point(3, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
      });

      it("should return undefined if there are infinitely many intersections", () => {
        const edge1 = new Line(new Point(0, 0), new Point(3, 3));
        const edge2 = new Line(new Point(0, 0), new Point(2, 2));
        const is = intersections(edge1, edge2, DEPTH);
        expect(is).to.be.undefined;
      });
    });

    context("line-quadratic", () => {
      it("should compute intersections of two edges", () => {
        {
          const edge1 = new Line(new Point(1, 0), new Point(1, 2));
          const edge2 = new QuadraticBezier(new Point(0, 0), new Point(1, 1), new Point(0, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge1 = new Line(new Point(1, 0), new Point(1, 2));
          const edge2 = new QuadraticBezier(new Point(0, 0), new Point(2, 1), new Point(0, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
        {
          const edge1 = new Line(new Point(1, 0), new Point(1, 2));
          const edge2 = new QuadraticBezier(new Point(0, 0), new Point(3, 1), new Point(0, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(2);
        }
      });

      it("should return undefined if there are infinitely many intersections", () => {
        const edge1 = new Line(new Point(0, 0), new Point(3, 3));
        const edge2 = new QuadraticBezier(new Point(0, 0), new Point(2, 2), new Point(1, 1));
        const is = intersections(edge1, edge2, DEPTH);
        expect(is).to.be.undefined;
      });
    });

    context("line-cubic", () => {
      it("should compute intersections of two edges", () => {
        {
          const edge1 = new Line(new Point(2, 0), new Point(2, 3));
          const edge2 = new CubicBezier(
            new Point(0, 0), new Point(2, 1), new Point(0, 2), new Point(1, 3)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge1 = new Line(new Point(2, 0), new Point(2, 3));
          const edge2 = new CubicBezier(
            new Point(0, 0), new Point(4, 1), new Point(0, 2), new Point(4, 3)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
        {
          const edge1 = new Line(new Point(2, 0), new Point(2, 3));
          const edge2 = new CubicBezier(
            new Point(0, 0), new Point(8, 1), new Point(-4, 2), new Point(4, 3)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(3);
        }
      });

      it("should return undefined if there are infinitely many intersections", () => {
        const edge1 = new Line(new Point(0, 0), new Point(3, 3));
        const edge2 = new CubicBezier(
          new Point(0, 0), new Point(2, 2), new Point(1, 1), new Point(3, 3)
        );
        const is = intersections(edge1, edge2, DEPTH);
        expect(is).to.be.undefined;
      });
    });

    context("quadratic-quadratic", () => {
      it("should compute intersections of two edges", () => {
        {
          const edge1 = new QuadraticBezier(new Point(0, 0), new Point(1, 1), new Point(0, 2));
          const edge2 = new QuadraticBezier(new Point(2, 0), new Point(1, 1), new Point(2, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge1 = new QuadraticBezier(new Point(0, 0), new Point(2, 1), new Point(0, 2));
          const edge2 = new QuadraticBezier(new Point(2, 0), new Point(0, 1), new Point(2, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
        {
          const edge1 = new QuadraticBezier(new Point(0, 0), new Point(3, 1), new Point(0, 2));
          const edge2 = new QuadraticBezier(new Point(2, 0), new Point(-1, 1), new Point(2, 2));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(2);
        }
        {
          const edge1 = new QuadraticBezier(new Point(0, 1), new Point(6, 2), new Point(0, 3));
          const edge2 = new QuadraticBezier(new Point(1, 0), new Point(2, 6), new Point(3, 0));
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(4);
        }
      });

      it("should return undefined if there are infinitely many intersections", () => {
        const edge1 = new QuadraticBezier(new Point(0, 0), new Point(2, 1), new Point(0, 2));
        const edge2 = new QuadraticBezier(new Point(0, 0), new Point(2, 1), new Point(0, 2));
        const is = intersections(edge1, edge2, DEPTH);
        expect(is).to.be.undefined;
      });
    });

    context("quadratic-cubic", () => {
      it("should compute intersections of two edges", () => {
        {
          const edge1 = new QuadraticBezier(new Point(0, 0), new Point(2, 1), new Point(0, 2));
          const edge2 = new CubicBezier(
            new Point(2, 0), new Point(1, 1), new Point(3, 2), new Point(2, 3)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge1 = new QuadraticBezier(new Point(0, 0), new Point(2, 1), new Point(0, 2));
          const edge2 = new CubicBezier(
            new Point(2, 0), new Point(-2, 1), new Point(3, 2), new Point(2, 3)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(2);
        }
        {
          const edge1 = new QuadraticBezier(new Point(0, 0), new Point(2, 1), new Point(0, 2));
          const edge2 = new CubicBezier(
            new Point(2, 0), new Point(-2, 1), new Point(3, 2), new Point(0, 2)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(3);
        }
        {
          const edge1 = new QuadraticBezier(new Point(0, 1), new Point(8, 2), new Point(0, 3));
          const edge2 = new CubicBezier(
            new Point(1, 0), new Point(2, 8), new Point(3, -4), new Point(3, 4)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(6);
        }
      });

      it("should return undefined if there are infinitely many intersections", () => {
        const edge1 = new QuadraticBezier(new Point(0, 1), new Point(2, 3), new Point(4, 5));
        const edge2 = new CubicBezier(
          new Point(0, 1), new Point(4 / 3, 7 / 3), new Point(8 / 3, 11 / 3), new Point(4, 5)
        );
        const is = intersections(edge1, edge2, DEPTH);
        expect(is).to.be.undefined;
      });
    });

    context("cubic-cubic", () => {
      it("should compute intersections of two edges", () => {
        {
          const edge1 = new CubicBezier(
            new Point(0, 0), new Point(1, 1), new Point(1, 2), new Point(0, 3)
          );
          const edge2 = new CubicBezier(
            new Point(2, 0), new Point(1, 1), new Point(1, 2), new Point(2, 3)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge1 = new CubicBezier(
            new Point(0, 0), new Point(4, 1), new Point(0, 2), new Point(4, 3)
          );
          const edge2 = new CubicBezier(
            new Point(2, 0), new Point(-2, 1), new Point(2, 2), new Point(-2, 3)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
        {
          const edge1 = new CubicBezier(
            new Point(0, 0), new Point(1, 0), new Point(0, 1), new Point(1, 1)
          );
          const edge2 = new CubicBezier(
            new Point(0, 0.1), new Point(1, 0), new Point(0, 1), new Point(1, 1)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
        {
          const edge1 = new CubicBezier(
            new Point(0, 0), new Point(10, 1), new Point(-4, 2), new Point(6, 3)
          );
          const edge2 = new CubicBezier(
            new Point(6, 0), new Point(-4, 1), new Point(10, 2), new Point(0, 3)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(3);
        }
        {
          const edge1 = new CubicBezier(
            new Point(0, 0), new Point(1, 30), new Point(2, -27), new Point(3, 3)
          );
          const edge2 = new CubicBezier(
            new Point(0, 0), new Point(30, 1), new Point(-27, 2), new Point(3, 3)
          );
          const is = intersections(edge1, edge2, DEPTH);
          expect(is).to.be.an("array").of.length(9);
        }
      });

      it("should return undefined if there are infinitely many intersections", () => {
        const edge1 = new CubicBezier(
          new Point(0, 0), new Point(1, 1), new Point(1, 2), new Point(0, 3)
        );
        const edge2 = new CubicBezier(
          new Point(0, 0), new Point(1, 1), new Point(1, 2), new Point(0, 3)
        );
        const is = intersections(edge1, edge2, DEPTH);
        expect(is).to.be.undefined;
      });
    });
  });

  /**
   * @test {selfIntersections}
   */
  describe("selfIntersections(edge, depth, maxIteration = -1)", () => {
    const DEPTH = 20;

    context("line", () => {
      it("should return an empty array since there cannot be any intersection", () => {
        {
          const edge = new Line(new Point(0, 0), new Point(1, 1));
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge = new Line(new Point(0, 0), new Point(0, 0));
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
      });
    });

    context("quadratic", () => {
      it("should return an empty array unless there are infinitely many intersections", () => {
        {
          const edge = new QuadraticBezier(new Point(0, 0), new Point(1, 0), new Point(1, 1));
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge = new QuadraticBezier(new Point(0, 0), new Point(0, 0), new Point(0, 0));
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
      });

      it("should return undefined is there are infinitely many self-intersection points", () => {
        {
          const edge = new QuadraticBezier(new Point(0, 0), new Point(1, 1), new Point(0, 0));
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.undefined;
        }
      });
    });

    context("cubic", () => {
      it("should compute self-intersection points", () => {
        {
          const edge = new CubicBezier(
            new Point(0, 0), new Point(1, 0), new Point(0, 1), new Point(1, 1)
          );
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge = new CubicBezier(
            new Point(0, 0), new Point(1, 1), new Point(0, 0), new Point(1, 1)
          );
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge = new CubicBezier(
            new Point(0, 0), new Point(0, 0), new Point(0, 0), new Point(0, 0)
          );
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(0);
        }
        {
          const edge = new CubicBezier(
            new Point(0, 0), new Point(8, 0), new Point(1, -7), new Point(1, 1)
          );
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
        {
          const edge = new CubicBezier(
            new Point(0, 0), new Point(0, 1), new Point(1, 1), new Point(0, 0)
          );
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
        {
          const edge = new CubicBezier(
            new Point(0, 0), new Point(0, 1), new Point(1, 1),
            new Point(0.5, (Math.sqrt(3 * (4 * 0.5 - 0.5 ** 2)) - 0.5) / 2)
          );
          const is = selfIntersections(edge, DEPTH);
          expect(is).to.be.an("array").of.length(1);
        }
      });

      it("should return undefined is there are infinitely many self-intersection points", () => {
        const edge = new CubicBezier(
          new Point(0, 0), new Point(2, 2), new Point(-1, -1), new Point(1, 1)
        );
        const is = selfIntersections(edge, DEPTH);
        expect(is).to.be.undefined;
      });
    });
  });
});
