/**
 * @author Abhijit Baldawa
 */

import { WordleGameState } from "../../containers/wordle-game/state/state";
import { Alphabet } from "../alphabet/alphabet";
import styles from "./alphabets.module.css";

interface AlphabetsProps extends Pick<WordleGameState, "alphabetConfigs"> {
  focusOnBoard?: boolean;
  onKeyPressHandler: React.KeyboardEventHandler<HTMLElement>;
}

const Alphabets: React.FC<AlphabetsProps> = (props) => {
  const { alphabetConfigs, onKeyPressHandler, focusOnBoard } = props;

  return (
    <article
      tabIndex={1}
      ref={(r) => {
        focusOnBoard && r?.focus();
      }}
      className={styles.container}
      onKeyUp={onKeyPressHandler}
    >
      {alphabetConfigs.map((alphabetConfig) => (
        <Alphabet key={alphabetConfig.id} alphabetConfig={alphabetConfig} />
      ))}
    </article>
  );
};

export { Alphabets };
