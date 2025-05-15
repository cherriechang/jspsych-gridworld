import type { Position } from "./types";
import { Inventory } from "./Inventory";

/**
 * Represents the player/agent navigating the grid.
 */
export class Agent {
  /** Current tile coordinate */
  public position: Position;
  /** How many moves remain */
  public stepsRemaining: number;
  /** Collected item instances */
  public inventory = new Inventory();

  constructor(start: Position, totalSteps: number) {
    this.position = { ...start };
    this.stepsRemaining = totalSteps > 0 ? totalSteps : Infinity;
  }

  /**
   * Move to a new position if steps remain.
   * @param to new coordinate
   * @returns true if move succeeded
   */
  moveTo(to: Position): boolean {
    if (this.stepsRemaining <= 0) return false;
    this.position = { ...to };
    this.stepsRemaining--;
    return true;
  }
}
