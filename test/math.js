import { expect } from "chai";

import { solveLinearEq, solveQuadraticEq, solveCubicEq } from "../lib/math.js";

describe("math", () => {
  const EPS = 1e-8;

  function expectArrayCloseTo(res, ans) {
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
      expectArrayCloseTo(solveLinearEq(1, 0), []);
      expectArrayCloseTo(solveLinearEq(-1, 1), [1]);
    });
  });

  /**
   * @test {solveQuadraticEq}
   */
  describe("solveQuadraticEq(c0, c1, c2)", () => {
    it("should find roots of a quadratic equation `c0 + c1 x + c2 x^2 = 0`", () => {
      // linear
      expect(solveQuadraticEq(0, 0, 0)).to.be.undefined;
      expectArrayCloseTo(solveQuadraticEq(1, 0, 0), []);
      expectArrayCloseTo(solveQuadraticEq(-1, 1, 0), [1]);
      // quadratic
      expectArrayCloseTo(solveQuadraticEq(1, 1, 1), []);
      expectArrayCloseTo(solveQuadraticEq(1, 2, 1), [-1]);
      expectArrayCloseTo(solveQuadraticEq(-2, -1, 1), [-1, 2]);
      expectArrayCloseTo(solveQuadraticEq(2, 1, -1), [-1, 2]);
    });
  });

  /**
   * @test {solveCubicEq}
   */
  describe("solveCubicEq(c0, c1, c2, c3)", () => {
    it("should find roots of a cubic equation `c0 + c1 x + c2 x^2 + c3 x^3 = 0`", () => {
      // linear
      expect(solveCubicEq(0, 0, 0, 0)).to.be.undefined;
      expectArrayCloseTo(solveCubicEq(1, 0, 0, 0), []);
      expectArrayCloseTo(solveCubicEq(-1, 1, 0, 0), [1]);
      // quadratic
      expectArrayCloseTo(solveCubicEq(1, 1, 1, 0), []);
      expectArrayCloseTo(solveCubicEq(1, 2, 1, 0), [-1]);
      expectArrayCloseTo(solveCubicEq(-2, -1, 1, 0), [-1, 2]);
      expectArrayCloseTo(solveCubicEq(2, 1, -1, 0), [-1, 2]);
      // cubic
      expectArrayCloseTo(solveCubicEq(1, 3, 3, 1), [-1]);
      expectArrayCloseTo(solveCubicEq(1, 0, 0, 1), [-1]);
      expectArrayCloseTo(solveCubicEq(-1, 0, 0, 1), [1]);
      expectArrayCloseTo(solveCubicEq(4, 0, -3, 1), [-1, 2]);
      expectArrayCloseTo(solveCubicEq(-6, -5, 2, 1), [-3, -1, 2]);
    });
  });
});
