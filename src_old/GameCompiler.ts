import type { TrialConfig } from "./types";
import { GameState } from "./GameState";
import { ItemManager } from "./ItemManager";
import { GoalEvaluator } from "./GoalEvaluator";

export class GameCompiler {
  static compile(config: TrialConfig): CompiledGame {
    const gameState = new GameState({
      rows: config.general.rows,
      cols: config.general.cols,
      startLocation: config.general.start_location,
      totalSteps: config.general.total_steps ?? 0,
    });

    const itemManager = new ItemManager();
    for (const [itemName, itemDef] of Object.entries(config.items)) {
      itemManager.registerItem(itemName, itemDef);
    }

    const goalEvaluator = new GoalEvaluator(config.end_condition);

    return {
      gameState,
      itemManager,
      goalEvaluator,
    };
  }
}

export type CompiledGame = {
  gameState: GameState;
  itemManager: ItemManager;
  goalEvaluator: GoalEvaluator;
};
