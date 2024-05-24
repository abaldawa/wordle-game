/**
 * @author Abhijit Baldawa
 */

import { useEffect, useReducer } from "react";
import { getRandomWord } from "../../../../shared/services/word";
import { getRandomizedAlphabets } from "../../../../shared/utilities/word";
import { shuffle } from "../../../../shared/utilities/array";
import { GameResult } from "../../components/game-result/game-result";
import styles from "./wordle-game.module.css";
import { Alphabets } from "../../components/alphabets/alphabets";
import { WordleGameState, initialWordleGameState } from "./state/state";
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

      const word = await getRandomWord(5);

      // Mix the 5 length word with other 5 length random alphabets
      const randomizedAlphabets = getRandomizedAlphabets(word, 5);

      // Add 15 other empty slots and shuffle them with random alphabets
      const alphabets = shuffle<string | undefined>(
        randomizedAlphabets.concat(new Array(15).fill(undefined))
      );

      dispatch({
        type: "set-game-state",
        originalWord: word.toUpperCase(),
        alphabetConfigs: alphabets.map(
          (item): WordleGameState["alphabetConfigs"][number] =>
            item
              ? {
                  type: "alphabet",
                  alphabet: item,
                  id: crypto.randomUUID(),
                }
              : {
                  type: "no-alphabet",
                  id: crypto.randomUUID(),
                }
        ),
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
