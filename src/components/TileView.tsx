import React from "react";
import type { Tile } from "../core/Tile";

/**
 * Renders one grid cell as an SVG rect.
 */
export function TileView({ tile, tileSize }: { tile: Tile; tileSize: number }) {
  const { x, y } = tile;
  const color = tile.getInstances().length
    ? tile.getInstances().map((id) => tile) /* placeholder for color */
    : "#ffffff"; // default empty

  return (
    <rect
      x={x * tileSize}
      y={y * tileSize}
      width={tileSize}
      height={tileSize}
      fill={/* use tile.properties.visual.color */ "#fafafa"}
      stroke="#888"
    />
  );
}
