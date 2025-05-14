import { GridEngineHeadless, ArrayTilemap, Direction } from "grid-engine";
import type { GridEngineConfigHeadless } from "grid-engine";

const START_POSITION = { x: 0, y: 0 };

export function createGridEngine(GRID_ROWS: number, GRID_COLS: number) {
  const gridEngine = new GridEngineHeadless();
  const gridTilemap: ArrayTilemap = new ArrayTilemap({
    gridworld: {
      data: Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(0)),
    },
  });
  const gridConfig: GridEngineConfigHeadless = {
    characters: [
      {
        id: "player",
        startPosition: START_POSITION,
        facingDirection: Direction.UP,
        speed: 25,
      },
    ],
  };

  gridEngine.create(gridTilemap, gridConfig);

  return gridEngine;
}
