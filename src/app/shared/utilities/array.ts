/**
 * @author Abhijit Baldawa
 */

import { getRandomIntegers } from "./number";

/**
 * @public
 *
 * Given an array, returns the new shuffled copy
 * of the same array
 *
 * @param array - array to shuffle
 * @returns
 */
const shuffle = <Item>(array: Item[]): Item[] => {
  if (array.length <= 1) {
    return array;
  }

  const randomArrayIndexes = getRandomIntegers(
    0,
    array.length - 1,
    array.length
  );

  return randomArrayIndexes.map((randomArrIndex) => array[randomArrIndex]);
};

export { shuffle };
