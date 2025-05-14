import { GridEngineHeadless, ArrayTilemap, Direction } from "grid-engine";
import type { GridEngineConfigHeadless } from "grid-engine";

const GRID_ROWS = 5;
const GRID_COLS = 5;
const TILE_SIZE = 80;

export function createGridEngine() {
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
        startPosition: { x: 0, y: 0 },
        facingDirection: Direction.UP,
        speed: 25
      },
    ],
  };

  gridEngine.create(gridTilemap, gridConfig);

  return gridEngine;
}
