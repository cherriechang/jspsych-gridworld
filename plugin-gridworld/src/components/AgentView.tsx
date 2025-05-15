import React from "react";
import type { Position } from "../core/types";

/**
 * Renders the agent as an SVG circle.
 */
export function AgentView({
  position,
  tileSize,
}: {
  position: Position;
  tileSize: number;
}) {
  return (
    <circle
      cx={position.x * tileSize + tileSize / 2}
      cy={position.y * tileSize + tileSize / 2}
      r={tileSize / 3}
      fill="blue"
    />
  );
}
