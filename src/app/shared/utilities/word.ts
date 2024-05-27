/**
 * @author Abhijit Baldawa
 */

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

export { getCharacterOccurrenceCount };
