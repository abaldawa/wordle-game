/**
 * @author Abhijit Baldawa
 */

import { getCharacterOccurrenceCount } from "../../../../../shared/utilities/word";
import { WordleGameActionTypes } from "./action-types";
import {
  AlphabetConfig,
  WordleGameState,
  initialWordleGameState,
} from "./state";

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
        return {
          ...state,
          error: {
            message: `Maximum word length to guess is ${state.originalWord.length}`,
          },
        };
      }

      const { alphabet } = action;
      const guessedAlphabet = alphabet.toUpperCase();
      const guessedAlphabetCharCode = guessedAlphabet.charCodeAt(0);

      // Make sure that the guessed alphabet is between A-Z
      if (guessedAlphabetCharCode < 65 || guessedAlphabetCharCode > 90) {
        return {
          ...state,
          error: {
            message: "Only valid alphabets are allowed",
          },
        };
      }

      // Make sure that the guessed alphabet is displayed on the board
      const foundGuessedAlphabetConfig = state.alphabetConfigs.find(
        (alphabetConfig): alphabetConfig is AlphabetConfig => {
          return (
            alphabetConfig.type === "alphabet" &&
            alphabetConfig.alphabet === guessedAlphabet
          );
        }
      );

      if (!foundGuessedAlphabetConfig) {
        return {
          ...state,
          error: {
            message: `Alphabet ${guessedAlphabet} is not on the board`,
          },
        };
      }

      return {
        ...state,
        guessedWord: `${state.guessedWord}${guessedAlphabet}`,
        error: undefined,
      };
    }

    case "remove-last-guessed-alphabet": {
      if (!state.guessedWord.length) {
        return {
          ...state,
          error: {
            message: "All guessed alphabets are removed",
          },
        };
      }

      return {
        ...state,
        guessedWord: state.guessedWord.slice(0, -1),
        error: undefined,
      };
    }

    case "validate-guessed-word": {
      // If original word is not loaded then don't do anything
      if (!state.originalWord.length) {
        return state;
      }

      // Check if maximum attempts has been reached
      if (state.totalAttempts >= state.maxAttempts) {
        return {
          ...state,
          error: {
            message: `Maximum attempts '${state.maxAttempts}' have been reached`,
          },
        };
      }

      // Make sure that the guessed word length is same as original word length
      if (state.guessedWord.length !== state.originalWord.length) {
        return {
          ...state,
          error: {
            message: `Expected word length to guess is ${state.originalWord.length}`,
          },
        };
      }

      // Reset the guessed state of all alphabets on the board
      const alphabetConfigs = state.alphabetConfigs.map(
        (alphabetConfig): WordleGameState["alphabetConfigs"][number] => {
          if (alphabetConfig.type === "no-alphabet") {
            return alphabetConfig;
          }

          return {
            ...alphabetConfig,
            userGuess: undefined,
          };
        }
      );

      // Validate guessed word with original word
      const { guessedWord, originalWord } = state;

      for (let i = 0; i < originalWord.length; i++) {
        const guessedAlphabet = guessedWord[i];
        const originalAlphabet = originalWord[i];

        if (guessedAlphabet === originalAlphabet) {
          const foundAlphabetConfig = alphabetConfigs.find(
            (alphabetConfig): alphabetConfig is AlphabetConfig =>
              alphabetConfig.type === "alphabet" &&
              alphabetConfig.alphabet === guessedAlphabet &&
              !alphabetConfig.userGuess
          );

          if (foundAlphabetConfig) {
            foundAlphabetConfig.userGuess = "correct-position";
          }
          continue;
        }

        if (
          getCharacterOccurrenceCount(guessedWord, guessedAlphabet) === 1 &&
          originalWord.includes(guessedAlphabet)
        ) {
          const foundAlphabetConfig = alphabetConfigs.find(
            (alphabetConfig): alphabetConfig is AlphabetConfig =>
              alphabetConfig.type === "alphabet" &&
              alphabetConfig.alphabet === guessedAlphabet
          );

          if (foundAlphabetConfig) {
            foundAlphabetConfig.userGuess = "incorrect-position";
          }
          continue;
        }
      }

      const totalAttempts = state.totalAttempts + 1;

      // Check if the guessed word is correct
      if (state.guessedWord === state.originalWord) {
        return {
          ...state,
          gameStatus: "won",
          totalAttempts,
          alphabetConfigs,
          error: undefined,
          guessedWord: "",
        };
      }

      return {
        ...state,
        alphabetConfigs,
        guessedWord: "",
        error: undefined,
        gameStatus: totalAttempts >= state.maxAttempts ? "lost" : "in-progress",
        totalAttempts,
      };
    }

    case "set-game-state": {
      const { originalWord, alphabetConfigs } = action;

      return {
        ...initialWordleGameState,
        originalWord,
        alphabetConfigs,
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
