import { expect } from "chai";

import { Point } from "../lib/point.js";
import { Anchor } from "../lib/anchor.js";

describe("anchor", () => {
  /**
   * @test {Anchor}
   */
  describe("Anchor", () => {
    /**
     * @test {Anchor.constructor}
     */
    describe("constructor(body, head = undefined, tail = undefined)", () => {
      it("should create a new Anchor instance", () => {
        {
          const a = new Anchor(new Point(0, 1));
          expect(a).to.be.an.instanceOf(Anchor);
          expect(a.body).to.be.an.instanceOf(Point);
          expect(a.body.x).to.equal(0);
          expect(a.body.y).to.equal(1);
          expect(a.head).to.equal(undefined);
          expect(a.tail).to.equal(undefined);
        }
        {
          const a = new Anchor(new Point(0, 1), new Point(2, 3));
          expect(a).to.be.an.instanceOf(Anchor);
          expect(a.body).to.be.an.instanceOf(Point);
          expect(a.body.x).to.equal(0);
          expect(a.body.y).to.equal(1);
          expect(a.head).to.be.an.instanceOf(Point);
          expect(a.head.x).to.equal(2);
          expect(a.head.y).to.equal(3);
          expect(a.tail).to.equal(undefined);
        }
        {
          const a = new Anchor(new Point(0, 1), undefined, new Point(2, 3));
          expect(a).to.be.an.instanceOf(Anchor);
          expect(a.body).to.be.an.instanceOf(Point);
          expect(a.body.x).to.equal(0);
          expect(a.body.y).to.equal(1);
          expect(a.head).to.equal(undefined);
          expect(a.tail).to.be.an.instanceOf(Point);
          expect(a.tail.x).to.equal(2);
          expect(a.tail.y).to.equal(3);
        }
        {
          const a = new Anchor(new Point(0, 1), new Point(2, 3), new Point(4, 5));
          expect(a).to.be.an.instanceOf(Anchor);
          expect(a.body).to.be.an.instanceOf(Point);
          expect(a.body.x).to.equal(0);
          expect(a.body.y).to.equal(1);
          expect(a.head).to.be.an.instanceOf(Point);
          expect(a.head.x).to.equal(2);
          expect(a.head.y).to.equal(3);
          expect(a.tail).to.be.an.instanceOf(Point);
          expect(a.tail.x).to.equal(4);
          expect(a.tail.y).to.equal(5);
        }
      });
    });

    /**
     * @test {Anchor.deserialize}
     */
    describe(".deserialize(obj)", () => {
      it("should be an inverse function of Anchor#serialize", () => {
        {
          const a = new Anchor(new Point(0, 1));
          const b = Anchor.deserialize(a.serialize());
          expect(b).to.be.an.instanceOf(Anchor);
          expect(b.body).to.be.an.instanceOf(Point);
          expect(b.body.x).to.equal(0);
          expect(b.body.y).to.equal(1);
          expect(b.head).to.equal(undefined);
          expect(b.tail).to.equal(undefined);
        }
        {
          const a = new Anchor(new Point(0, 1), new Point(2, 3));
          const b = Anchor.deserialize(a.serialize());
          expect(b).to.be.an.instanceOf(Anchor);
          expect(b.body).to.be.an.instanceOf(Point);
          expect(b.body.x).to.equal(0);
          expect(b.body.y).to.equal(1);
          expect(b.head).to.be.an.instanceOf(Point);
          expect(b.head.x).to.equal(2);
          expect(b.head.y).to.equal(3);
          expect(b.tail).to.equal(undefined);
        }
        {
          const a = new Anchor(new Point(0, 1), undefined, new Point(2, 3));
          const b = Anchor.deserialize(a.serialize());
          expect(b).to.be.an.instanceOf(Anchor);
          expect(b.body).to.be.an.instanceOf(Point);
          expect(b.body.x).to.equal(0);
          expect(b.body.y).to.equal(1);
          expect(b.head).to.equal(undefined);
          expect(b.tail).to.be.an.instanceOf(Point);
          expect(b.tail.x).to.equal(2);
          expect(b.tail.y).to.equal(3);
        }
        {
          const a = new Anchor(new Point(0, 1), new Point(2, 3), new Point(4, 5));
          const b = Anchor.deserialize(a.serialize());
          expect(b).to.be.an.instanceOf(Anchor);
          expect(b.body).to.be.an.instanceOf(Point);
          expect(b.body.x).to.equal(0);
          expect(b.body.y).to.equal(1);
          expect(b.head).to.be.an.instanceOf(Point);
          expect(b.head.x).to.equal(2);
          expect(b.head.y).to.equal(3);
          expect(b.tail).to.be.an.instanceOf(Point);
          expect(b.tail.x).to.equal(4);
          expect(b.tail.y).to.equal(5);
        }
      });
    });

    /**
     * @test {Anchor#body}
     */
    describe("#body", () => {
      it("should be readable and writable", () => {
        const a = new Anchor(new Point(0, 1), new Point(2, 3), new Point(4, 5));
        expect(a.body).to.be.an.instanceOf(Point);
        expect(a.body.x).to.equal(0);
        expect(a.body.y).to.equal(1);
        a.body = new Point(6, 7);
        expect(a.body).to.be.an.instanceOf(Point);
        expect(a.body.x).to.equal(6);
        expect(a.body.y).to.equal(7);
      });
    });

    /**
     * @test {Anchor#head}
     */
    describe("#head", () => {
      it("should be readable and writable", () => {
        const a = new Anchor(new Point(0, 1), new Point(2, 3), new Point(4, 5));
        expect(a.head).to.be.an.instanceOf(Point);
        expect(a.head.x).to.equal(2);
        expect(a.head.y).to.equal(3);
        a.head = new Point(6, 7);
        expect(a.head).to.be.an.instanceOf(Point);
        expect(a.head.x).to.equal(6);
        expect(a.head.y).to.equal(7);
        a.head = undefined;
        expect(a.head).to.equal(undefined);
      });
    });

    /**
     * @test {Anchor#tail}
     */
    describe("#tail", () => {
      it("should be readable and writable", () => {
        const a = new Anchor(new Point(0, 1), new Point(2, 3), new Point(4, 5));
        expect(a.tail).to.be.an.instanceOf(Point);
        expect(a.tail.x).to.equal(4);
        expect(a.tail.y).to.equal(5);
        a.tail = new Point(6, 7);
        expect(a.tail).to.be.an.instanceOf(Point);
        expect(a.tail.x).to.equal(6);
        expect(a.tail.y).to.equal(7);
        a.tail = undefined;
        expect(a.tail).to.equal(undefined);
      });
    });

    /**
     * @test {Anchor#serialize}
     */
    describe("#serialize()", () => {
      it("should return a pure object representation of the anchor", () => {
        {
          const a = new Anchor(new Point(0, 1));
          expect(a.serialize()).to.deep.equal({
            body: [0, 1]
          });
        }
        {
          const a = new Anchor(new Point(0, 1), new Point(2, 3));
          expect(a.serialize()).to.deep.equal({
            body: [0, 1],
            head: [2, 3]
          });
        }
        {
          const a = new Anchor(new Point(0, 1), undefined, new Point(2, 3));
          expect(a.serialize()).to.deep.equal({
            body: [0, 1],
            tail: [2, 3]
          });
        }
        {
          const a = new Anchor(new Point(0, 1), new Point(2, 3), new Point(4, 5));
          expect(a.serialize()).to.deep.equal({
            body: [0, 1],
            head: [2, 3],
            tail: [4, 5]
          });
        }
      });
    });

    /**
     * @test {Anchor#clone}
     */
    describe("#clone()", () => {
      it("should create a copy of the anchor object", () => {
        {
          const a = new Anchor(new Point(0, 1));
          const b = a.clone();
          expect(b).to.be.an.instanceOf(Anchor);
          expect(b).not.to.equal(a);
          expect(b.body).to.be.an.instanceOf(Point);
          expect(b.body).not.to.equal(a.body);
          expect(b.body.x).to.equal(0);
          expect(b.body.y).to.equal(1);
          expect(b.head).to.equal(undefined);
          expect(b.tail).to.equal(undefined);
        }
        {
          const a = new Anchor(new Point(0, 1), new Point(2, 3));
          const b = a.clone();
          expect(b).to.be.an.instanceOf(Anchor);
          expect(b).not.to.equal(a);
          expect(b.body).to.be.an.instanceOf(Point);
          expect(b.body).not.to.equal(a.body);
          expect(b.body.x).to.equal(0);
          expect(b.body.y).to.equal(1);
          expect(b.head).to.be.an.instanceOf(Point);
          expect(b.head).not.to.equal(a.head);
          expect(b.head.x).to.equal(2);
          expect(b.head.y).to.equal(3);
          expect(b.tail).to.equal(undefined);
        }
        {
          const a = new Anchor(new Point(0, 1), undefined, new Point(2, 3));
          const b = a.clone();
          expect(b).to.be.an.instanceOf(Anchor);
          expect(b).not.to.equal(a);
          expect(b.body).to.be.an.instanceOf(Point);
          expect(b.body).not.to.equal(a.body);
          expect(b.body.x).to.equal(0);
          expect(b.body.y).to.equal(1);
          expect(b.head).to.equal(undefined);
          expect(b.tail).to.be.an.instanceOf(Point);
          expect(b.tail).not.to.equal(a.tail);
          expect(b.tail.x).to.equal(2);
          expect(b.tail.y).to.equal(3);
        }
        {
          const a = new Anchor(new Point(0, 1), new Point(2, 3), new Point(4, 5));
          const b = a.clone();
          expect(b).to.be.an.instanceOf(Anchor);
          expect(b).not.to.equal(a);
          expect(b.body).to.be.an.instanceOf(Point);
          expect(b.body).not.to.equal(a.body);
          expect(b.body.x).to.equal(0);
          expect(b.body.y).to.equal(1);
          expect(b.head).to.be.an.instanceOf(Point);
          expect(b.head).not.to.equal(a.head);
          expect(b.head.x).to.equal(2);
          expect(b.head.y).to.equal(3);
          expect(b.tail).to.be.an.instanceOf(Point);
          expect(b.tail).not.to.equal(a.tail);
          expect(b.tail.x).to.equal(4);
          expect(b.tail.y).to.equal(5);
        }
      });
    });
  });
});
