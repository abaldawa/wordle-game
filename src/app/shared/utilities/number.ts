/**
 * @author Abhijit Baldawa
 */

/**
 * @public
 *
 * Returns the random integer between `min` (inclusive)
 * and `max` (inclusive)
 *
 * @param min - start integer of the range
 * @param max - end integer of the range
 * @returns
 */
const getRandomInt = (min: number, max: number): number =>
  Math.floor(min + (max - min + 1) * Math.random());

/**
 * @public
 *
 * Returns the random integers between `min` (inclusive)
 * and `max` (inclusive) and total count based on `totalRandomNumbers`
 *
 * @param min - start integer of the range
 * @param max - end integer of the range
 * @param totalRandomNumbers - total random integers to get
 *                             between the provided range
 * @returns
 */
const getRandomNumbers = (
  min: number,
  max: number,
  totalRandomNumbers: number
): number[] => {
  // Validate input args
  if (max - min <= 0) {
    throw new Error(`Invalid min/max provided`);
  }

  if (totalRandomNumbers > max - min + 1) {
    throw new Error(
      `Range of '${
        max - min + 1
      }' is smaller than requested random numbers '${totalRandomNumbers}'`
    );
  }

  const randomNumbers = new Set<number>();

  while (randomNumbers.size !== totalRandomNumbers) {
    const randomNumber = getRandomInt(min, max);

    if (!randomNumbers.has(randomNumber)) {
      randomNumbers.add(randomNumber);
    }
  }

  return Array.from(randomNumbers);
};

export { getRandomNumbers, getRandomInt };
