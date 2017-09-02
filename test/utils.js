import { expect } from "chai";

import { approx } from "../lib/utils.js";

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
});
