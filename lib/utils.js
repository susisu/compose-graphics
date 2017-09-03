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

/**
 * Rounds a number if it is very close to an integer.
 *
 * @param {number} x - A number.
 * @param {number} [epsilon=Number.EPSILON] - Epsilon.
 * @returns {boolean} Rounded number if the given number is very close to it.
 * The original number if not.
 */
export function snapToInteger(x, epsilon = Number.EPSILON) {
  return approx(x, Math.round(x), epsilon) ? Math.round(x) : x;
}
