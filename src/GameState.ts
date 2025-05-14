import { Direction } from "grid-engine";
// import { createGridEngine } from "./engine";
import type { TaskConfig } from "./TaskConfig";
import { GridEngineHeadless, ArrayTilemap } from "grid-engine";

export type Position = { x: number; y: number };

export class GameState {
  rows: number;
  cols: number;
  walls: Position[];
  goal: Position;
  start: Position;
  gridEngine: GridEngineHeadless;

  constructor(config: TaskConfig) {
    this.rows = config.rows;
    this.cols = config.cols;
    this.start = { x: config.start[0], y: config.start[1] };
    this.goal = { x: config.goal[0], y: config.goal[1] };
    this.walls = (config.walls ?? []).map(([x, y]) => ({ x, y }));

    const gridEngine = new GridEngineHeadless();

    const tilemap = new ArrayTilemap({
      ground: {
        data: Array.from({ length: this.rows }, (_, y) =>
          Array.from({ length: this.cols }, (_, x) => {
            if (this.walls.some((wall) => wall.x === x && wall.y === y)) {
              return 1;
            }
            return 0;
          })
        ),
      },
      // item[i]: {} for each i
    });

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

  }

  getPosition(): Position {
    return this.gridEngine.getPosition("player");
  }

  move(dir: Direction) {
    // TODO: implement check if there is a blocking item in destination location
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

  // movedTo() { executes stuff that is conditional on the properties of what happnened 
  // update inventory
  // update tile 
  // ...
}
