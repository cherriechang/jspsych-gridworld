import type { ItemInstance } from "./ItemInstance";

/**
 * A single cell in the grid.
 * Holds zero-or-more item instance IDs.
 */
export class Tile {
  /** IDs of ItemInstance objects on this tile */
  public instanceIds: string[] = [];

  constructor(
    /** X-coordinate in grid */
    public readonly x: number,
    /** Y-coordinate in grid */
    public readonly y: number
  ) {}

  /**
   * Checks if the agent can step onto this tile,
   * i.e. none of the occupying instances block movement.
   * @param allInstances lookup map of all instances by ID
   */
  canEnter(allInstances: Record<string, ItemInstance>): boolean {
    return this.instanceIds.every((id) => !allInstances[id].category.blocks);
  }

  /**
   * Removes and returns the first matching instance ID
   * whose category.collects === true.
   * @param categoryName the name of the category to collect
   * @param allInstances lookup map by ID
   */
  collectOne(
    // TODO: may not need if only one category per tile
    categoryName: string,
    allInstances: Record<string, ItemInstance>
  ): string | null {
    const idx = this.instanceIds.findIndex((id) => {
      const inst = allInstances[id];
      return inst.category.name === categoryName && inst.category.collects;
    });
    if (idx === -1) return null;
    return this.instanceIds.splice(idx, 1)[0]; // TODO: still in global lookup
  }

  /**
   * @returns a copy of instance IDs on this tile
   */
  getInstances(): string[] {
    return [...this.instanceIds];
  }
}
