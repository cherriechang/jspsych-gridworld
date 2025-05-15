import { v4 as uuid } from "uuid";
import type { Position } from "./types";
import { ItemCategory } from "./ItemCategory";

/**
 * A single in‐world instance of an item category,
 * placed at a specific tile.
 */
export class ItemInstance {
  /** Globally unique identifier */
  readonly id: string;

  constructor(
    /** Category this instance belongs to */
    public readonly category: ItemCategory,
    /** Tile coordinates */
    public readonly location: Position
  ) {
    this.id = uuid();
  }
}
