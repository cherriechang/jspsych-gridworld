import { GridEngineHeadless } from "grid-engine";

export function createGridEngine() {
  const gridEngine = new GridEngineHeadless();

  return gridEngine;
}
