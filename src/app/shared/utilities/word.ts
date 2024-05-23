/**
 * @author Abhijit Baldawa
 */

import { shuffle } from "./array";

/**
 * @public
 *
 * Given a `word` and a `character`, returns the total count
 * of the `character` within the `word`
 *
 * @param word - word to search within
 * @param character - character count to search in the word
 * @returns
 */
const getCharacterOccurrenceCount = (
  word: string,
  character: string
): number => {
  return [...word].reduce((count, c) => {
    return c === character ? count + 1 : count;
  }, 0);
};

/**
 * @public
 *
 * Given a `word`, returns array of random alphabets
 * which contains all the alphabets of the provided word
 * and it also mixes other random alphabets based on
 * `noOfRandomAlphabetsToAdd`.
 *
 * So the total length of the random alphabets array is
 * `word.length + noOfRandomAlphabetsToAdd`
 *
 * @param word
 * @param noOfRandomAlphabetsToAdd
 * @returns
 */
const getRandomizedAlphabets = (
  word: string,
  noOfRandomAlphabetsToAdd: number
): string[] => {
  // Get all alphabets from A - Z
  const allAlphabets = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
  );

  // Shuffle all the alphabets and get the random alphabets
  const randomAlphabetsToAdd = shuffle(allAlphabets).slice(
    0,
    noOfRandomAlphabetsToAdd
  );

  // Mix random alphabets with the alphabets of the word
  const alphabets = word.toUpperCase().split("").concat(randomAlphabetsToAdd);

  return shuffle(alphabets);
};

export { getRandomizedAlphabets, getCharacterOccurrenceCount };
