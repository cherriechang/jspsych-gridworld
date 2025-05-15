import React from "react";
import type { ItemInstance } from "../core/ItemInstance";
import type { Tile } from "../core/Tile";

/**
 * Renders all items on one tile.
 *
 * NOTE: we assume at most one category per tile!
 */
export function ItemView({
  tile,
  instances,
  tileSize,
}: {
  /** The tile whose items to render */
  tile: Tile;
  /** Global lookup of instances by ID */
  instances: Record<string, ItemInstance>;
  /** Pixel size of one grid cell */
  tileSize: number;
}) {
  const ids = tile.getInstances();
  if (ids.length === 0) return null;

  // TODO: we assume only one category per tile!
  // If you ever support multiple categories, you'll need to adjust grouping logic.
  const categoryName = instances[ids[0]].category.def.name;
  const cat = instances[ids[0]].category.def;
  const count = ids.length;

  // center of tile
  const cx = tile.x * tileSize + tileSize / 2;
  const cy = tile.y * tileSize + tileSize / 2;
  const size = tileSize * 0.3; // shape radius

  return (
    <g>
      {cat.blocks ? (
        // circle for blocking items
        <circle cx={cx} cy={cy} r={size} fill={cat.visual.color} />
      ) : (
        // triangle for non-blocking items
        <polygon
          points={`
            ${cx},${cy - size}
            ${cx - size},${cy + size}
            ${cx + size},${cy + size}
          `}
          fill={cat.visual.color}
        />
      )}
      {/* count in center */}
      <text
        x={cx}
        y={cy + size * 0.5}
        textAnchor="middle"
        fontSize={size * 0.8}
        fill="#000"
      >
        {count}
      </text>
    </g>
  );
}
