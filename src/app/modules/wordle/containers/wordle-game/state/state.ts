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
  alphabetConfigs: (AlphabetConfig | NoAlphabetConfig)[];
  totalAttempts: number;
  readonly maxAttempts: number;
  gameStatus: "in-progress" | "won" | "lost";
  error?: {
    message: string;
  };
}

const MAX_ATTEMPTS = 5;

const initialWordleGameState = {
  loading: false,
  originalWord: "",
  guessedWord: "",
  gameStatus: "in-progress",
  totalAttempts: 0,
  maxAttempts: MAX_ATTEMPTS,
  alphabetConfigs: [],
} as const satisfies WordleGameState;

export type { AlphabetConfig, WordleGameState };
export { initialWordleGameState };
