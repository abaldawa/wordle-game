/**
 * @author Abhijit Baldawa
 */

import { Layout } from "./shared/components/layout/layout";
import { WordleGame } from "./modules/wordle/containers/wordle-game/wordle-game";

const App: React.FC = () => {
  return (
    <Layout>
      <WordleGame />
    </Layout>
  );
};

export { App };
