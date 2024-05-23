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
const getRandomInteger = (min: number, max: number): number => {
  // Validate input args
  if (max - min <= 0) {
    throw new Error(`'min' must be smaller than 'max'`);
  }

  return Math.floor(min + (max - min + 1) * Math.random());
};

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
const getRandomIntegers = (
  min: number,
  max: number,
  totalRandomNumbers: number
): number[] => {
  // Validate input args
  if (
    !Number.isInteger(min) ||
    !Number.isInteger(max) ||
    !Number.isInteger(totalRandomNumbers)
  ) {
    throw new Error(`min/max/totalRandomNumbers values must be valid integers`);
  }

  if (totalRandomNumbers <= 0) {
    throw new Error(`'totalRandomNumbers' value must be a positive integer`);
  }

  if (max - min <= 0) {
    throw new Error(`'min' must be smaller than 'max'`);
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
    const randomNumber = getRandomInteger(min, max);

    if (!randomNumbers.has(randomNumber)) {
      randomNumbers.add(randomNumber);
    }
  }

  return Array.from(randomNumbers);
};

export { getRandomIntegers, getRandomInteger };
