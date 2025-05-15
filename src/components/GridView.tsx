import React from "react";
import type { GridWorld } from "../core/GridWorld";
import { TileView } from "./TileView";
import { AgentView } from "./AgentView";

export function GridView({
  world,
  tileSize,
}: {
  world: GridWorld;
  tileSize: number;
}) {
  const { tiles, agent } = world;
  return (
    <svg
      width={world.cols * tileSize}
      height={world.rows * tileSize}
      style={{ border: "1px solid #888" }}
    >
      {tiles.flat().map((tile) => (
        <TileView key={`${tile.x}-${tile.y}`} tile={tile} tileSize={tileSize} />
      ))}
      <AgentView position={agent.position} tileSize={tileSize} />
    </svg>
  );
}
