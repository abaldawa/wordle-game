/**
 * @author Abhijit Baldawa
 */

import styles from "./loading.module.css";

interface LoadingProps
  extends React.ProgressHTMLAttributes<HTMLProgressElement> {
  message: string;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { message, ...progressProps } = props;
  return (
    <label className={styles["loading-label"]}>
      {message}
      <progress className={styles["loading-progress"]} {...progressProps} />
    </label>
  );
};

export { Loading };
