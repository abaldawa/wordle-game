/**
 * @author Abhijit Baldawa
 */

import type { WordleGameState } from "../../containers/wordle-game/state/state";
import styles from "./alphabet.module.css";

interface AlphabetProps {
  alphabetConfig: WordleGameState["alphabetConfigs"][number];
}

const Alphabet: React.FC<AlphabetProps> = ({ alphabetConfig }) => {
  let containerClassName = styles.container;
  let alphabet: string | undefined;

  if (alphabetConfig.type === "no-alphabet") {
    containerClassName += ` ${styles["no-alphabet-container"]}`;
  } else {
    alphabet = alphabetConfig.alphabet;

    switch (alphabetConfig.userGuess) {
      case "correct-position":
        containerClassName += ` ${styles["correct-position"]}`;
        break;
      case "incorrect-position":
        containerClassName += ` ${styles["incorrect-position"]}`;
        break;
      default:
        containerClassName += ` ${styles["not-found"]}`;
        break;
    }
  }

  return (
    <li className={containerClassName}>
      {!!alphabet && <span className={styles.alphabet}>{alphabet}</span>}
    </li>
  );
};

export { Alphabet };
