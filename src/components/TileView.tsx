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
  const full = tileSize;
  const shrink = 0.8;             // 80% size
  const innerSize = full * shrink;
  const offset = (full - innerSize) / 2;
  const x = tile.x * full + offset;
  const y = tile.y * full + offset;
  const corner = innerSize * 0.1; // e.g. 10% corner radius

  return (
    <>
      {/* centered, rounded‐corner rect at 80% scale */}
      <rect
        x={x}
        y={y}
        width={innerSize}
        height={innerSize}
        rx={corner}
        ry={corner}
        fill="#fff"
        stroke="#888"
      />
      <ItemView tile={tile} instances={instances} tileSize={tileSize} />
    </>
  );
}
