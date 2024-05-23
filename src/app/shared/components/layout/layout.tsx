/**
 * @author Abhijit Baldawa
 */

import styles from "./layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export { Layout };
