import type { ItemCategoryDef } from "./types";

/**
 * Wraps an ItemCategoryDef from config,
 * provides any convenience getters if needed.
 */
export class ItemCategory {
  /** Immutable definition from trial config */
  readonly def: ItemCategoryDef;

  constructor(def: ItemCategoryDef) {
    this.def = def;
  }

  /** Human‐readable name */
  get name(): string {
    return this.def.name;
  }

  /** Whether this item blocks movement */
  get blocks(): boolean {
    return this.def.blocks;
  }

  /** Whether this item can be collected */
  get collects(): boolean {
    return this.def.collects;
  }

  /** Whether only one instance may exist per location */
  get unique(): boolean {
    return this.def.unique;
  }

  /** Visual style for rendering */
  get visual(): { color: string } {
    return this.def.visual;
  }
}
