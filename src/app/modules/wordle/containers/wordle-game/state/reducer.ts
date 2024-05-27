/**
 * @author Abhijit Baldawa
 */

import { getCharacterOccurrenceCount } from "../../../../../shared/utilities/word";
import { WordleGameActionTypes } from "./action-types";
import {
  AlphabetConfig,
  MAX_ATTEMPTS,
  NoAlphabetConfig,
  WordleGameState,
  initialWordleGameState,
} from "./state";

/**
 * @private
 *
 * Given alphabet configs with a guessed and current array index,
 * returns a new alphabet configs with the current array index
 * row modified based on the guessed word
 *
 * @param alphabetConfigs - input alphabet configs to update
 * @param currentRowIndex - current row index to update
 * @param guessedWord -  guessed word which goes in `currentRowIndex`
 * @returns
 */
const getUpdatedAlphabetConfigs = (
  alphabetConfigs: WordleGameState["alphabetConfigs"],
  currentRowIndex: WordleGameState["currentRowIndex"],
  guessedWord: WordleGameState["guessedWord"]
): WordleGameState["alphabetConfigs"] => {
  const updatedAlphabetsRow = alphabetConfigs[currentRowIndex].map(
    (
      alphabetConfig,
      index
    ): WordleGameState["alphabetConfigs"][number][number] => {
      const { id } = alphabetConfig;
      const guessedAlphabet = guessedWord[index];

      if (guessedAlphabet) {
        return {
          id,
          type: "alphabet",
          alphabet: guessedAlphabet,
          userGuess:
            alphabetConfig.type === "alphabet"
              ? alphabetConfig.userGuess
              : undefined,
        };
      }

      return {
        id,
        type: "no-alphabet",
      };
    }
  );

  return alphabetConfigs.with(currentRowIndex, updatedAlphabetsRow);
};

const wordleGameReducer = (
  state: WordleGameState = initialWordleGameState,
  action: WordleGameActionTypes
): WordleGameState => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "error": {
      const { error } = action;
      let errorMessage = `Error loading game state`;

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return {
        ...state,
        loading: false,
        error: {
          message: errorMessage,
        },
      };
    }

    case "alphabet-guessed": {
      // check if maximum guess word length has reached
      if (state.guessedWord.length === state.originalWord.length) {
        return state;
      }

      const { alphabet } = action;

      // Make sure that only alphabet key is pressed and NOT ex. shift/caps etc.
      if (alphabet.length !== 1) {
        return state;
      }

      const guessedAlphabet = alphabet.toUpperCase();
      const guessedAlphabetCharCode = guessedAlphabet.charCodeAt(0);

      // Make sure that the guessed alphabet is between A-Z
      if (guessedAlphabetCharCode < 65 || guessedAlphabetCharCode > 90) {
        return state;
      }

      const guessedWord = `${state.guessedWord}${guessedAlphabet}`;

      return {
        ...state,
        guessedWord,
        alphabetConfigs: getUpdatedAlphabetConfigs(
          state.alphabetConfigs,
          state.currentRowIndex,
          guessedWord
        ),
        error: undefined,
      };
    }

    case "remove-last-guessed-alphabet": {
      if (!state.guessedWord.length) {
        return state;
      }

      const guessedWord = state.guessedWord.slice(0, -1);

      return {
        ...state,
        guessedWord,
        alphabetConfigs: getUpdatedAlphabetConfigs(
          state.alphabetConfigs,
          state.currentRowIndex,
          guessedWord
        ),
        error: undefined,
      };
    }

    case "validate-guessed-word": {
      // If original word is not loaded then don't do anything
      if (!state.originalWord.length) {
        return state;
      }

      // Check if maximum attempts has been reached
      if (state.currentRowIndex >= state.alphabetConfigs.length) {
        return {
          ...state,
          error: {
            message: `Maximum attempts '${state.alphabetConfigs.length}' have been reached`,
          },
        };
      }

      // Make sure that every alphabet in the current row index is guessed
      const isValidAlphabetsRow = state.alphabetConfigs[
        state.currentRowIndex
      ].every((alphabetConfig) => alphabetConfig.type === "alphabet");

      if (
        !isValidAlphabetsRow ||
        state.guessedWord.length !== state.originalWord.length
      ) {
        return {
          ...state,
          error: {
            message: `Expected word length to guess is ${state.originalWord.length}`,
          },
        };
      }

      const alphabetsRow = structuredClone(
        state.alphabetConfigs[state.currentRowIndex] as AlphabetConfig[]
      );

      // Validate guessed word with original word
      const { guessedWord, originalWord } = state;

      for (let i = 0; i < originalWord.length; i++) {
        const guessedAlphabetConfig = alphabetsRow[i];
        const originalAlphabet = originalWord[i];

        if (guessedAlphabetConfig.alphabet === originalAlphabet) {
          guessedAlphabetConfig.userGuess = "correct-position";
          continue;
        }

        if (
          getCharacterOccurrenceCount(
            guessedWord,
            guessedAlphabetConfig.alphabet
          ) === 1 &&
          originalWord.includes(guessedAlphabetConfig.alphabet)
        ) {
          guessedAlphabetConfig.userGuess = "incorrect-position";
          continue;
        }
      }

      const updatedAlphabetConfigs = state.alphabetConfigs.with(
        state.currentRowIndex,
        alphabetsRow
      );
      const currentRowIndex = state.currentRowIndex + 1;

      let gameStatus: WordleGameState["gameStatus"];

      // Check if the guessed word is correct
      if (state.guessedWord === state.originalWord) {
        gameStatus = "won";
      } else if (currentRowIndex >= state.alphabetConfigs.length) {
        gameStatus = "lost";
      } else {
        gameStatus = "in-progress";
      }

      return {
        ...state,
        currentRowIndex,
        alphabetConfigs: updatedAlphabetConfigs,
        guessedWord: "",
        error: undefined,
        gameStatus,
      };
    }

    case "set-game-state": {
      const { originalWord } = action;

      return {
        ...initialWordleGameState,
        originalWord: originalWord.toUpperCase(),
        alphabetConfigs: [...Array(MAX_ATTEMPTS)].map(() =>
          [...Array(originalWord.length)].map(
            (): NoAlphabetConfig => ({
              id: crypto.randomUUID(),
              type: "no-alphabet",
            })
          )
        ),
        loading: false,
      };
    }

    case "reset-game":
      return initialWordleGameState;
    default:
      return initialWordleGameState;
  }
};

export { wordleGameReducer };
