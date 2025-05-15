import React from "react";
import type { Tile } from "../core/Tile";
import type { ItemInstance } from "../core/ItemInstance";
import { ItemView } from "./ItemView";

/**
 * Renders one grid cell (background + any items).
 */
export function TileView({
  tile,
  tileSize,
  instances,
}: {
  tile: Tile;
  tileSize: number;
  instances: Record<string, ItemInstance>;
}) {
  // empty tile background
  return (
    <>
      <rect
        x={tile.x * tileSize}
        y={tile.y * tileSize}
        width={tileSize}
        height={tileSize}
        fill="#ffffff"
        stroke="#888"
      />
      {/* render any item on top */}
      <ItemView tile={tile} instances={instances} tileSize={tileSize} />
    </>
  );
}
