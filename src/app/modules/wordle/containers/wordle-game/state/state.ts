/**
 * @author Abhijit Baldawa
 */

interface AlphabetConfig {
  type: "alphabet";
  id: string;
  alphabet: string;
  userGuess?: "correct-position" | "incorrect-position";
}

interface NoAlphabetConfig {
  type: "no-alphabet";
  id: string;
}

interface WordleGameState {
  loading: boolean;
  readonly originalWord: string;
  guessedWord: string;
  currentRowIndex: number;
  alphabetConfigs: (AlphabetConfig | NoAlphabetConfig)[][];
  gameStatus: "in-progress" | "won" | "lost";
  error?: {
    message: string;
  };
}

const MAX_ATTEMPTS = 5;
const WORD_LENGTH = 5;

const initialWordleGameState = {
  loading: false,
  originalWord: "",
  guessedWord: "",
  currentRowIndex: 0,
  gameStatus: "in-progress",
  alphabetConfigs: [],
} as const satisfies WordleGameState;

export type { AlphabetConfig, NoAlphabetConfig, WordleGameState };
export { WORD_LENGTH, MAX_ATTEMPTS, initialWordleGameState };
