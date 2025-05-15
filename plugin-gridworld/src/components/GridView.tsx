import React from "react";
import type { GridWorld } from "../core/GridWorld";
import { TileView } from "./TileView";
import { AgentView } from "./AgentView";

/**
 * Renders the entire GridWorld as an SVG.
 */
export function GridView({
  world,
  tileSize,
}: {
  world: GridWorld;
  tileSize: number;
}) {
  return (
    <svg
      width={world.cols * tileSize}
      height={world.rows * tileSize}
      style={{ background: "#eee", border: "1px solid #888" }}
    >
      {world.tiles.flat().map((tile) => (
        <TileView
          key={`${tile.x}-${tile.y}`}
          tile={tile}
          tileSize={tileSize}
          instances={world.instances}
        />
      ))}
      <AgentView position={world.agent.position} tileSize={tileSize} />
    </svg>
  );
}
