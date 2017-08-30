import { expect } from "chai";

import { solveLinearEq, solveQuadraticEq, solveCubicEq } from "../lib/math.js";

describe("math", () => {
  const EPS = 1e-8;

  function expectAns(res, ans) {
    expect(res).to.be.an("array").of.length(ans.length);
    const r = res.sort((x, y) => x - y);
    for (let i = 0; i < res.length; i++) {
      expect(r[i]).to.be.closeTo(ans[i], EPS);
    }
  }

  /**
   * @test {solveLinearEq}
   */
  describe("solveLinearEq(c0, c1)", () => {
    it("should find root of a linear equation `c0 + c1 x = 0`", () => {
      expect(solveLinearEq(0, 0)).to.be.undefined;
      expectAns(solveLinearEq(1, 0), []);
      expectAns(solveLinearEq(-1, 1), [1]);
    });
  });

  /**
   * @test {solveQuadraticEq}
   */
  describe("solveQuadraticEq(c0, c1, c2)", () => {
    it("should find roots of a quadratic equation `c0 + c1 x + c2 x^2 = 0`", () => {
      // linear
      expect(solveQuadraticEq(0, 0, 0)).to.be.undefined;
      expectAns(solveQuadraticEq(1, 0, 0), []);
      expectAns(solveQuadraticEq(-1, 1, 0), [1]);
      // quadratic
      expectAns(solveQuadraticEq(1, 1, 1), []);
      expectAns(solveQuadraticEq(1, 2, 1), [-1]);
      expectAns(solveQuadraticEq(-2, -1, 1), [-1, 2]);
      expectAns(solveQuadraticEq(2, 1, -1), [-1, 2]);
    });
  });

  /**
   * @test {solveCubicEq}
   */
  describe("solveCubicEq(c0, c1, c2, c3)", () => {
    it("should find roots of a cubic equation `c0 + c1 x + c2 x^2 + c3 x^3 = 0`", () => {
      // linear
      expect(solveCubicEq(0, 0, 0, 0)).to.be.undefined;
      expectAns(solveCubicEq(1, 0, 0, 0), []);
      expectAns(solveCubicEq(-1, 1, 0, 0), [1]);
      // quadratic
      expectAns(solveCubicEq(1, 1, 1, 0), []);
      expectAns(solveCubicEq(1, 2, 1, 0), [-1]);
      expectAns(solveCubicEq(-2, -1, 1, 0), [-1, 2]);
      expectAns(solveCubicEq(2, 1, -1, 0), [-1, 2]);
      // cubic
      expectAns(solveCubicEq(1, 3, 3, 1), [-1]);
      expectAns(solveCubicEq(1, 0, 0, 1), [-1]);
      expectAns(solveCubicEq(-1, 0, 0, 1), [1]);
      expectAns(solveCubicEq(4, 0, -3, 1), [-1, 2]);
      expectAns(solveCubicEq(-6, -5, 2, 1), [-3, -1, 2]);
    });
  });
});
