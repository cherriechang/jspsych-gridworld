import { Direction } from "grid-engine";
import { createGridEngine } from "./engine";

export type Position = { x: number; y: number };

export class GameState {
  rows: number;
  cols: number;
  gridEngine: ReturnType<typeof createGridEngine>;
  walls: Position[];
  goal: Position;

  constructor(config: {
    rows: number;
    cols: number;
    walls?: Position[];
    goal: Position;
  }) {
    this.rows = config.rows;
    this.cols = config.cols;
    this.walls = config.walls || [];
    this.goal = config.goal;

    this.gridEngine = createGridEngine(this.rows, this.cols);
  }

  getPosition() {
    return this.gridEngine.getPosition("player");
  }

  move(dir: Direction) {
    this.gridEngine.move("player", dir);
  }

  onMove(cb: (pos: Position) => void) {
    this.gridEngine
      .positionChangeFinished()
      .subscribe(() => cb(this.getPosition()));
  }

  update(time: number, delta: number) {
    this.gridEngine.update(time, delta);
  }
}
