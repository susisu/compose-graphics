import { expect } from "chai";

import { Point, Rectangle } from "../lib/geom.js";

describe("geom", () => {
  const EPS = 1e-8;

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
     * @test {Point#length}
     */
    describe("#length()", () => {
      it("should calculate the length of the point vector", () => {
        const p = new Point(3, 4);
        expect(p.length()).to.be.closeTo(5, EPS);
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
     * @test {Point#scale}
     */
    describe("#scale(ratio)", () => {
      it("should return a new Point object whose length is scaled by `ratio`", () => {
        const p = new Point(1, 2);
        const q = p.scale(3);
        expect(q).to.be.an.instanceOf(Point);
        expect(q.x).to.equal(3);
        expect(q.y).to.equal(6);
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

    /**
     * @test {Point#rotate}
     */
    describe("#rotate(angle, origin = new Point(0, 0))", () => {
      context("when `origin` is specified", () => {
        it("should rotate the point around the specified origin", () => {
          const p = new Point(2, 3);
          const q = p.rotate(Math.PI / 2, new Point(1, 1));
          expect(q).to.be.an.instanceOf(Point);
          expect(q.x).to.be.closeTo(-1, EPS);
          expect(q.y).to.be.closeTo(2, EPS);
        });
      });

      context("when `origin` is not specified", () => {
        it("should rotate the point around (0, 0)", () => {
          const p = new Point(2, 3);
          const q = p.rotate(Math.PI / 2);
          expect(q).to.be.an.instanceOf(Point);
          expect(q.x).to.be.closeTo(-3, EPS);
          expect(q.y).to.be.closeTo(2, EPS);
        });
      });
    });
  });

  /**
   * @test {Rectangle}
   */
  describe("Rectangle", () => {
    /**
     * @test {Rectangle.constructor}
     */
    describe("constructor(x, y, width, height)", () => {
      it("should create a new Rectangle object", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        expect(rect).to.be.an.instanceOf(Rectangle);
        expect(rect.x).to.equal(0);
        expect(rect.y).to.equal(1);
        expect(rect.width).to.equal(2);
        expect(rect.height).to.equal(3);
      });
    });

    /**
     * @test {Rectangle#x}
     */
    describe("#x", () => {
      it("should be readable and writable", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        expect(rect.x).to.equal(0);
        rect.x = 4;
        expect(rect.x).to.equal(4);
      });
    });

    /**
     * @test {Rectangle#y}
     */
    describe("#y", () => {
      it("should be readable and writable", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        expect(rect.y).to.equal(1);
        rect.y = 4;
        expect(rect.y).to.equal(4);
      });
    });

    /**
     * @test {Rectangle#width}
     */
    describe("#width", () => {
      it("should be readable and writable", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        expect(rect.width).to.equal(2);
        rect.width = 4;
        expect(rect.width).to.equal(4);
      });
    });

    /**
     * @test {Rectangle#height}
     */
    describe("#height", () => {
      it("should be readable and writable", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        expect(rect.height).to.equal(3);
        rect.height = 4;
        expect(rect.height).to.equal(4);
      });
    });

    /**
     * @test {Rectangle#clone}
     */
    describe("#clone()", () => {
      it("should return a copy of the rectangle object", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        const copy = rect.clone();
        expect(copy).to.be.an.instanceOf(Rectangle);
        expect(copy).not.to.equal(rect);
        expect(copy.x).to.equal(rect.x);
        expect(copy.y).to.equal(rect.y);
        expect(copy.width).to.equal(rect.width);
        expect(copy.height).to.equal(rect.height);
      });
    });

    /**
     * @test {Rectangle#left}
     */
    describe("#left()", () => {
      it("should return the X-coordinate of the left side of the rectangle", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        expect(rect.left()).to.equal(0);
      });
    });

    /**
     * @test {Rectangle#right}
     */
    describe("#right()", () => {
      it("should return the X-coordinate of the right side of the rectangle", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        expect(rect.right()).to.equal(2);
      });
    });

    /**
     * @test {Rectangle#top}
     */
    describe("#top()", () => {
      it("should return the Y-coordinate of the top of the rectangle", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        expect(rect.top()).to.equal(1);
      });
    });

    /**
     * @test {Rectangle#bottom}
     */
    describe("#bottom()", () => {
      it("should return the Y-coordinate of the bottom of the rectangle", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        expect(rect.bottom()).to.equal(4);
      });
    });

    /**
     * @test {Rectangle#topLeft}
     */
    describe("#topLeft()", () => {
      it("should return a point object at the top left of the rectangle", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        const p = rect.topLeft();
        expect(p).to.be.an.instanceOf(Point);
        expect(p.x).to.equal(0);
        expect(p.y).to.equal(1);
      });
    });

    /**
     * @test {Rectangle#bottomLeft}
     */
    describe("#bottomLeft()", () => {
      it("should return a point object at the bottom left of the rectangle", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        const p = rect.bottomLeft();
        expect(p).to.be.an.instanceOf(Point);
        expect(p.x).to.equal(0);
        expect(p.y).to.equal(4);
      });
    });

    /**
     * @test {Rectangle#topRight}
     */
    describe("#topRight()", () => {
      it("should return a point object at the top right of the rectangle", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        const p = rect.topRight();
        expect(p).to.be.an.instanceOf(Point);
        expect(p.x).to.equal(2);
        expect(p.y).to.equal(1);
      });
    });

    /**
     * @test {Rectangle#bottomRight}
     */
    describe("#bottomRight()", () => {
      it("should return a point object at the bottom right of the rectangle", () => {
        const rect = new Rectangle(0, 1, 2, 3);
        const p = rect.bottomRight();
        expect(p).to.be.an.instanceOf(Point);
        expect(p.x).to.equal(2);
        expect(p.y).to.equal(4);
      });
    });

    /**
     * @test {Rectangle#isPoint}
     */
    describe("#isPoint()", () => {
      it("should return true if both the width and height are 0", () => {
        expect(new Rectangle(0, 1, 2, 3).isPoint()).to.be.false;
        expect(new Rectangle(0, 1, 0, 3).isPoint()).to.be.false;
        expect(new Rectangle(0, 1, 2, 0).isPoint()).to.be.false;
        expect(new Rectangle(0, 1, 0, 0).isPoint()).to.be.true;
      });
    });

    /**
     * @test {Rectangle#contains}
     */
    describe("#contains(point)", () => {
      it("should return `true` if `point` is contained by the rectangle", () => {
        const rect = new Rectangle(1, 1, 3, 3);
        expect(rect.contains(new Point(2, 0))).to.be.false;
        expect(rect.contains(new Point(2, 1))).to.be.false;
        expect(rect.contains(new Point(2, 2))).to.be.true;
        expect(rect.contains(new Point(2, 4))).to.be.false;
        expect(rect.contains(new Point(2, 5))).to.be.false;

        expect(rect.contains(new Point(0, 2))).to.be.false;
        expect(rect.contains(new Point(1, 2))).to.be.false;
        expect(rect.contains(new Point(2, 2))).to.be.true;
        expect(rect.contains(new Point(4, 2))).to.be.false;
        expect(rect.contains(new Point(5, 2))).to.be.false;
      });
    });

    /**
     * @test {Rectangle#hasOnEdge}
     */
    describe("#hasOnEdge(point)", () => {
      it("should return `true` if `point` is on the edge of the rectangle", () => {
        const rect = new Rectangle(1, 1, 3, 3);
        expect(rect.hasOnEdge(new Point(2, 0))).to.be.false;
        expect(rect.hasOnEdge(new Point(2, 1))).to.be.true;
        expect(rect.hasOnEdge(new Point(2, 2))).to.be.false;
        expect(rect.hasOnEdge(new Point(2, 4))).to.be.true;
        expect(rect.hasOnEdge(new Point(2, 5))).to.be.false;

        expect(rect.hasOnEdge(new Point(0, 2))).to.be.false;
        expect(rect.hasOnEdge(new Point(1, 2))).to.be.true;
        expect(rect.hasOnEdge(new Point(2, 2))).to.be.false;
        expect(rect.hasOnEdge(new Point(4, 2))).to.be.true;
        expect(rect.hasOnEdge(new Point(5, 2))).to.be.false;

        expect(rect.hasOnEdge(new Point(1, 1))).to.be.true;
        expect(rect.hasOnEdge(new Point(1, 4))).to.be.true;
        expect(rect.hasOnEdge(new Point(4, 1))).to.be.true;
        expect(rect.hasOnEdge(new Point(4, 4))).to.be.true;
      });
    });

    /**
     * @test {Rectangle#overlaps}
     */
    describe("#overlaps(rect)", () => {
      it("should return `true` if the rectangle overlaps another rectangle `rect`", () => {
        const rect = new Rectangle(2, 2, 4, 4);
        expect(rect.overlaps(new Rectangle(0, 3, 1, 1))).to.be.false;
        expect(rect.overlaps(new Rectangle(0, 3, 2, 1))).to.be.false;
        expect(rect.overlaps(new Rectangle(0, 3, 4, 1))).to.be.true;
        expect(rect.overlaps(new Rectangle(0, 3, 6, 1))).to.be.true;
        expect(rect.overlaps(new Rectangle(0, 3, 7, 1))).to.be.true;
        expect(rect.overlaps(new Rectangle(1, 3, 7, 1))).to.be.true;
        expect(rect.overlaps(new Rectangle(2, 3, 6, 1))).to.be.true;
        expect(rect.overlaps(new Rectangle(4, 3, 4, 1))).to.be.true;
        expect(rect.overlaps(new Rectangle(6, 3, 2, 1))).to.be.false;
        expect(rect.overlaps(new Rectangle(7, 3, 1, 1))).to.be.false;

        expect(rect.overlaps(new Rectangle(3, 0, 1, 1))).to.be.false;
        expect(rect.overlaps(new Rectangle(3, 0, 1, 2))).to.be.false;
        expect(rect.overlaps(new Rectangle(3, 0, 1, 4))).to.be.true;
        expect(rect.overlaps(new Rectangle(3, 0, 1, 6))).to.be.true;
        expect(rect.overlaps(new Rectangle(3, 0, 1, 7))).to.be.true;
        expect(rect.overlaps(new Rectangle(3, 1, 1, 7))).to.be.true;
        expect(rect.overlaps(new Rectangle(3, 2, 1, 6))).to.be.true;
        expect(rect.overlaps(new Rectangle(3, 4, 1, 4))).to.be.true;
        expect(rect.overlaps(new Rectangle(3, 6, 1, 2))).to.be.false;
        expect(rect.overlaps(new Rectangle(3, 7, 1, 1))).to.be.false;

        expect(rect.overlaps(new Rectangle(0, 0, 1, 1))).to.be.false;
        expect(rect.overlaps(new Rectangle(0, 0, 2, 2))).to.be.false;
        expect(rect.overlaps(new Rectangle(0, 0, 3, 3))).to.be.true;
        expect(rect.overlaps(new Rectangle(0, 0, 6, 6))).to.be.true;
        expect(rect.overlaps(new Rectangle(0, 0, 7, 7))).to.be.true;

        expect(rect.overlaps(new Rectangle(3, 3, 2, 2))).to.be.true;
      });
    });

    /**
     * @test {Rectangle#contacts}
     */
    describe("#contacts(rect)", () => {
      it("should return `true` if the rectangle contacts to another rectangle `rect`", () => {
        const rect = new Rectangle(2, 2, 4, 4);
        expect(rect.contacts(new Rectangle(0, 3, 1, 1))).to.be.false;
        expect(rect.contacts(new Rectangle(0, 3, 2, 1))).to.be.true;
        expect(rect.contacts(new Rectangle(0, 3, 4, 1))).to.be.false;
        expect(rect.contacts(new Rectangle(0, 3, 6, 1))).to.be.false;
        expect(rect.contacts(new Rectangle(0, 3, 7, 1))).to.be.false;
        expect(rect.contacts(new Rectangle(1, 3, 7, 1))).to.be.false;
        expect(rect.contacts(new Rectangle(2, 3, 6, 1))).to.be.false;
        expect(rect.contacts(new Rectangle(4, 3, 4, 1))).to.be.false;
        expect(rect.contacts(new Rectangle(6, 3, 2, 1))).to.be.true;
        expect(rect.contacts(new Rectangle(7, 3, 1, 1))).to.be.false;

        expect(rect.contacts(new Rectangle(3, 0, 1, 1))).to.be.false;
        expect(rect.contacts(new Rectangle(3, 0, 1, 2))).to.be.true;
        expect(rect.contacts(new Rectangle(3, 0, 1, 4))).to.be.false;
        expect(rect.contacts(new Rectangle(3, 0, 1, 6))).to.be.false;
        expect(rect.contacts(new Rectangle(3, 0, 1, 7))).to.be.false;
        expect(rect.contacts(new Rectangle(3, 1, 1, 7))).to.be.false;
        expect(rect.contacts(new Rectangle(3, 2, 1, 6))).to.be.false;
        expect(rect.contacts(new Rectangle(3, 4, 1, 4))).to.be.false;
        expect(rect.contacts(new Rectangle(3, 6, 1, 2))).to.be.true;
        expect(rect.contacts(new Rectangle(3, 7, 1, 1))).to.be.false;

        expect(rect.contacts(new Rectangle(0, 0, 1, 1))).to.be.false;
        expect(rect.contacts(new Rectangle(0, 0, 2, 2))).to.be.true;
        expect(rect.contacts(new Rectangle(0, 0, 3, 3))).to.be.false;
        expect(rect.contacts(new Rectangle(0, 0, 6, 6))).to.be.false;
        expect(rect.contacts(new Rectangle(0, 0, 7, 7))).to.be.false;

        expect(rect.contacts(new Rectangle(3, 3, 2, 2))).to.be.false;
      });
    });
  });
});
