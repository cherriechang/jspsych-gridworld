import type { ConditionNode } from "./types";
import type { GridWorld } from "./GridWorld";

/**
 * Evaluates the end_condition tree against a GridWorld.
 */
export class RuleEvaluator {
  constructor(private condition: ConditionNode) {}

  /**
   * @returns true if the condition is met in the given world
   */
  evaluate(world: GridWorld): boolean {
    return this.evalNode(this.condition, world);
  }

  private evalNode(node: ConditionNode, world: GridWorld): boolean {
    // TODO: implement logical branches:
    // if ("and" in node) { ... }
    // if ("or" in node) { ... }
    // if ("equals" in node) { ... }
    // etc.
    throw new Error("Not implemented");
  }
}
