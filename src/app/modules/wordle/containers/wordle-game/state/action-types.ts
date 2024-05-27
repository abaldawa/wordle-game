/**
 * @author Abhijit Baldawa
 */

interface AlphabetGuessed {
  type: "alphabet-guessed";
  alphabet: string;
}

interface RemoveLastGuessedAlphabet {
  type: "remove-last-guessed-alphabet";
}

interface ValidateGuessedWord {
  type: "validate-guessed-word";
}

interface ResetGameAction {
  type: "reset-game";
}

interface SetGameStateLoading {
  type: "loading";
}

interface SetGameStateError {
  type: "error";
  error: unknown;
}

interface SetGameStateAction {
  type: "set-game-state";
  originalWord: string;
}

type WordleGameActionTypes =
  | AlphabetGuessed
  | RemoveLastGuessedAlphabet
  | ValidateGuessedWord
  | ResetGameAction
  | SetGameStateAction
  | SetGameStateLoading
  | SetGameStateError;

export type { WordleGameActionTypes };
