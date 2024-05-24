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
    onClick: () => void;
  };
  children?: never;
}

const GameResult: React.FC<GameResultProps> = (props) => {
  const {
    resultIcon,
    title,
    description,
    actionButton: { onClick: actionButtonClickHandler, text: actionButtonText },
  } = props;

  return (
    <dialog open className={styles.container}>
      <span className={styles["result-icon"]}>{resultIcon}</span>
      <div className={styles["result-details"]}>
        <h3 className={styles["result-details__title"]}>{title}</h3>
        <p className={styles["result-details__description"]}>{description}</p>
        <button
          autoFocus
          className={styles["result-details__action"]}
          onClick={actionButtonClickHandler}
        >
          {actionButtonText}
        </button>
      </div>
    </dialog>
  );
};

export { GameResult };
