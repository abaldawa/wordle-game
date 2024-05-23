/**
 * @author Abhijit Baldawa
 */

import styles from "./game-result.module.css";

interface GameResultProps {
  resultIcon: React.ReactNode;
  title: string;
  description: string;
  actionButton: {
    text: string;
    focus?: boolean;
    onClick: () => void;
  };
  children?: never;
}

const GameResult: React.FC<GameResultProps> = (props) => {
  const {
    resultIcon,
    title,
    description,
    actionButton: {
      onClick: actionButtonClickHandler,
      text: actionButtonText,
      focus: actionButtonFocus,
    },
  } = props;

  return (
    <article className={styles.container}>
      <span className={styles["result-icon"]}>{resultIcon}</span>
      <div className={styles["result-details"]}>
        <h3 className={styles["result-details__title"]}>{title}</h3>
        <p className={styles["result-details__description"]}>{description}</p>
        <button
          ref={(ref) => {
            actionButtonFocus && ref?.focus();
          }}
          className={styles["result-details__action"]}
          onClick={actionButtonClickHandler}
        >
          {actionButtonText}
        </button>
      </div>
    </article>
  );
};

export { GameResult };
