import { expect } from "chai";

import { approx, snapToInteger } from "../lib/utils.js";

describe("utils", () => {
  /**
   * @test {approx}
   */
  describe("approx(x, y, epsilon = Number.EPSILON)", () => {
    context("when `epsilon` is not specified", () => {
      it("should return true if relative/absolute differences between two numbers are less than `Number.EPSILON`", () => {
        expect(approx(0, 0)).to.be.true;
        expect(approx(1, 1)).to.be.true;
        expect(approx(1, 1.125)).to.be.false;

        expect(approx(Number.EPSILON, Number.EPSILON / 2)).to.be.true;
        expect(approx(1, 1 + Number.EPSILON)).to.be.true;
        expect(approx(1, 1 - Number.EPSILON)).to.be.false;
      });
    });

    context("when `epsilon` is specified", () => {
      it("should return true if relative/absolute differences between two numbers are less than the given `epsilon`", () => {
        expect(approx(0, 0, 0.25)).to.be.true;
        expect(approx(1, 1, 0.25)).to.be.true;
        expect(approx(1, 1.125, 0.25)).to.be.true;
        expect(approx(1, 1.5, 0.25)).to.be.false;

        expect(approx(1, 1, 0)).to.be.true;
      });
    });
  });

  /**
   * @test {snapToInteger}
   */
  describe("snapToInteger(x, epsilon = Number.EPSILON)", () => {
    context("when `epsilon` is not specified", () => {
      it("should snap the number to an integer if the difference between them is less than `Number.EPSILON`", () => {
        expect(snapToInteger(1)).to.equal(1);
        expect(snapToInteger(0.25)).to.equal(0.25);
        expect(snapToInteger(Number.EPSILON / 2)).to.equal(0);
        expect(snapToInteger(1 + Number.EPSILON)).to.equal(1);
        expect(snapToInteger(1 - Number.EPSILON)).to.equal(1 - Number.EPSILON);
      });
    });

    context("when `epsilon` is specified", () => {
      it("should snap the number to an integer if the difference between them is less than the given `epsilon`", () => {
        expect(snapToInteger(1, 0.5)).to.equal(1);
        expect(snapToInteger(0.25, 0.125)).to.equal(0.25);
        expect(snapToInteger(0.125, 0.25)).to.equal(0);
      });
    });
  });
});
