/**
 * Checks if two numbers are approximately equal.
 *
 * @param {number} x - A number.
 * @param {number} y - Another number.
 * @param {number} [epsilon=Number.EPSILON] - Epsilon.
 * @returns {boolean} `true` if two numbers are approximately equal
 * i.e. their absolute and relative differences are less than epsilon.
 */
export function approx(x, y, epsilon = Number.EPSILON) {
  return x === y || Math.abs(x - y) < Math.max(1, Math.abs(x), Math.abs(y)) * epsilon;
}
