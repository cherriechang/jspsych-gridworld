import { Position } from "./types";
import { Inventory } from "./Inventory";

export class Agent {
  public position: Position;
  public stepsRemaining: number;
  public inventory = new Inventory();

  constructor(start: Position, totalSteps: number) {
    this.position = { ...start };
    this.stepsRemaining = totalSteps || Infinity;
  }

  moveTo(to: Position): boolean {
    if (this.stepsRemaining <= 0) return false;
    this.position = { ...to };
    this.stepsRemaining--;
    return true;
  }
}
