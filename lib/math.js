export function solveLinearEq(c0, c1) {
  if (c1 === 0) {
    if (c0 === 0) {
      return undefined;
    }
    else {
      return [];
    }
  }
  else {
    return [-c0 / c1];
  }
}

export function solveQuadraticEq(c0, c1, c2) {
  if (c2 === 0) {
    return solveLinearEq(c0, c1);
  }
  const d = c1 ** 2 - 4 * c2 * c0;
  if (d < 0) {
    return [];
  }
  else if (d === 0) {
    return [-c1 / (2 * c2)];
  }
  else {
    if (c1 >= 0) {
      const r2 = (-c1 - Math.sqrt(d)) / (2 * c2);
      const r1 = (c0 / c2) / r2;
      return [r1, r2];
    }
    else {
      const r1 = (-c1 + Math.sqrt(d)) / (2 * c2);
      const r2 = (c0 / c2) / r1;
      return [r1, r2];
    }
  }
}

export function solveCubicEq(c0, c1, c2, c3) {
  if (c3 === 0) {
    return solveQuadraticEq(c0, c1, c2);
  }
  const a0 = c0 / c3;
  const a1 = c1 / c3;
  const a2 = c2 / c3;
  const p = 3 * a1 - a2 ** 2;
  const q = 27 * a0 - 9 * a1 * a2 + 2 * a2 ** 3;
  const d = q ** 2 + 4 * p ** 3;
  if (d < 0) {
    const x = -q;
    const y = Math.sqrt(-d);
    const rc = ((x / 2) ** 2 + (y / 2) ** 2) ** (1 / 6);
    const a = Math.atan2(y, x);
    return [
      (2 * rc * Math.cos(a / 3) - a2) / 3,
      (2 * rc * Math.cos((a + 2 * Math.PI) / 3) - a2) / 3,
      (2 * rc * Math.cos((a - 2 * Math.PI) / 3) - a2) / 3
    ];
  }
  else if (d === 0) {
    if (q === 0) {
      return [-a2 / 3];
    }
    else {
      const rc = Math.cbrt(-q / 2);
      return [
        (2 * rc - a2) / 3,
        (-rc - a2) / 3
      ];
    }
  }
  else {
    if (q >= 0) {
      const rc2 = Math.cbrt((-q - Math.sqrt(d)) / 2);
      const rc1 = -p / rc2;
      return [(rc1 + rc2 - a2) / 3];
    }
    else {
      const rc1 = Math.cbrt((-q + Math.sqrt(d)) / 2);
      const rc2 = -p / rc1;
      return [(rc1 + rc2 - a2) / 3];
    }
  }
}
