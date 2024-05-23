/**
 * @author Abhijit Baldawa
 */

import type { WordleGameState } from "./state/state";

type GameResultDescription = Record<
  Extract<WordleGameState["gameStatus"], "won" | "lost">,
  {
    resultIcon: string;
    title: string;
    description: string;
    actionButtonText: string;
  }
>;

const gameResultDescription = {
  won: {
    resultIcon: "🏆",
    title: "You're a Winner, Champ!",
    description:
      "Congrats! You've just crushed it and won the game. Now, bask in your glory and celebrate like a boss! 🎉",
    actionButtonText: "Try again",
  },
  lost: {
    resultIcon: "🙈",
    title: "Oops! Tough Luck, But Don't Give Up!",
    description:
      "You didn't quite make it this time, but hey, no worries! Give it another shot, and who knows, the next round might be your moment of glory! Keep going, champ! 💪🎮",
    actionButtonText: "Try again",
  },
} as const satisfies GameResultDescription;

export { gameResultDescription };
