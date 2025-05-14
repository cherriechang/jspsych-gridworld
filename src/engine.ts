import { GridEngineHeadless, ArrayTilemap } from "grid-engine";

//, walls: Array<[number, number]> = []
export function createGridEngine(rows: number, cols: number) {
  const gridEngine = new GridEngineHeadless();
  const tilemap = new ArrayTilemap({
    gridworld: {
      // change this to fill 1 if wall
      data: Array.from({ length: rows }, () => Array(cols).fill(0)),
    },
  });

  return { gridEngine, tilemap };
}
