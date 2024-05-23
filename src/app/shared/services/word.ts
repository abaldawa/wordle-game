/**
 * @author Abhijit Baldawa
 */

/**
 * @private
 *
 * Returns the URL of the random word service
 *
 * @param wordLength - length of the random word
 * @returns
 */
const getRandomWordUrl = (wordLength: number) =>
  `https://random-word-api.herokuapp.com/word?length=${wordLength}`;

/**
 * @public
 *
 * Given the `wordLength`, return the random word
 * of that length
 *
 * @param wordLength - length of the random word
 * @returns
 */
const getRandomWord = async (wordLength: number) => {
  try {
    const response = await fetch(getRandomWordUrl(wordLength));

    const [word] = (await response.json()) as [string];

    return word;
  } catch (error: unknown) {
    throw new Error(`Error fetching random word. ${error}`);
  }
};

export { getRandomWord };
