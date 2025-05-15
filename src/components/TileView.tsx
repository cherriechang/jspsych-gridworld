import React from "react";
import type { Tile } from "../core/Tile";

export function TileView({
  tile,
  tileSize,
}: {
  tile: Tile;
  tileSize: number;
}) {
  const { x, y, properties } = tile;
  return (
    <rect
      x={x * tileSize}
      y={y * tileSize}
      width={tileSize}
      height={tileSize}
      fill={properties.visual.color}
      stroke="#888"
    />
  );
}
