/**
 * @author Abhijit Baldawa
 */

import { useEffect, useReducer } from "react";
import { getRandomWord } from "../../../../shared/services/word";
import { GameResult } from "../../components/game-result/game-result";
import styles from "./wordle-game.module.css";
import { Alphabets } from "../../components/alphabets/alphabets";
import { WORD_LENGTH, initialWordleGameState } from "./state/state";
import { wordleGameReducer } from "./state/reducer";
import { gameResultDescription } from "./constants";
import { Loading } from "../../../../shared/components/loading/loading";

const WordleGame: React.FC = () => {
  const [state, dispatch] = useReducer(
    wordleGameReducer,
    initialWordleGameState
  );

  const { loading, error, gameStatus, alphabetConfigs } = state;

  const onKeyPressHandler: React.KeyboardEventHandler<HTMLElement> = (
    event
  ) => {
    const { key } = event;

    if (key === "Backspace") {
      dispatch({
        type: "remove-last-guessed-alphabet",
      });
    } else if (key === "Enter") {
      dispatch({ type: "validate-guessed-word" });
    } else {
      dispatch({ type: "alphabet-guessed", alphabet: key });
    }
  };

  const fetchRandomWordAndInitGame = async () => {
    try {
      dispatch({ type: "loading" });

      const word = await getRandomWord(WORD_LENGTH);

      dispatch({
        type: "set-game-state",
        originalWord: word,
      });
    } catch (error: unknown) {
      dispatch({ type: "error", error });
    }
  };

  const replayGame = () => {
    dispatch({ type: "reset-game" });
    fetchRandomWordAndInitGame();
  };

  useEffect(() => {
    fetchRandomWordAndInitGame();
  }, []);

  /**
   * This use effect monitors any occurred error
   * and notifies the user of the same
   */
  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <section className={styles.container}>
      {loading ? (
        <Loading message="Loading random word" />
      ) : gameStatus !== "in-progress" ? (
        <GameResult
          resultIcon={gameResultDescription[gameStatus].resultIcon}
          title={gameResultDescription[gameStatus].title}
          description={gameResultDescription[gameStatus].description}
          actionButton={{
            text: gameResultDescription[gameStatus].actionButtonText,
            onClick: replayGame,
          }}
        />
      ) : (
        <Alphabets
          focusOnBoard
          alphabetConfigs={alphabetConfigs}
          onKeyPressHandler={onKeyPressHandler}
        />
      )}
    </section>
  );
};

export { WordleGame };
