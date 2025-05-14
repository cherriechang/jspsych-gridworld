import { Direction } from "grid-engine";
import { createGridEngine } from "./engine";
import type { TaskConfig } from "./TaskConfig";

export type Position = { x: number; y: number };

export class GameState {
  rows: number;
  cols: number;
  walls: Position[];
  goal: Position;
  start: Position;
  gridEngine: ReturnType<typeof createGridEngine>["gridEngine"];

  constructor(config: TaskConfig) {
    this.rows = config.rows;
    this.cols = config.cols;
    this.start = { x: config.start[0], y: config.start[1] };
    this.goal = { x: config.goal[0], y: config.goal[1] };
    this.walls = (config.walls ?? []).map(([x, y]) => ({ x, y }));

    const { gridEngine, tilemap } = createGridEngine(this.rows, this.cols);//, this.walls

    const engineConfig = {
      characters: [
        {
          id: "player",
          startPosition: this.start,
          facingDirection: Direction.UP,
          speed: 25,
        },
      ]
    };

    gridEngine.create(tilemap, engineConfig);
    this.gridEngine = gridEngine;
    console.log("Blocked now?", gridEngine.isTileBlocked({ x: 1, y: 1 }));
  }

  getPosition(): Position {
    return this.gridEngine.getPosition("player");
  }

  move(dir: Direction) {
    this.gridEngine.move("player", dir);
  }

  update(time: number, delta: number) {
    this.gridEngine.update(time, delta);
  }

  onMove(callback: (pos: Position) => void) {
    this.gridEngine
      .positionChangeFinished()
      .subscribe(() => callback(this.getPosition()));
  }
}
