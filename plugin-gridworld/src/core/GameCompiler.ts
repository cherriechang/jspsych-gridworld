import type { TrialConfig } from "./types";
import { ItemCategory } from "./ItemCategory";
import { ItemInstance } from "./ItemInstance";
import { GridWorld } from "./GridWorld";

/**
 * Transforms a parsed TrialConfig into a live GridWorld instance.
 */
export class GameCompiler {
  /**
   * @param config validated trial config
   * @returns a new GridWorld ready for simulation/rendering
   */
  static compile(config: TrialConfig): GridWorld {
    // 1) Build categories
    const categories = Object.entries(config.items).map(
      ([name, def]) => new ItemCategory({ name, ...def })
    );

    // 2) Build instances
    const instances: ItemInstance[] = [];
    for (const cat of categories) {
      const locs = config.items[cat.def.name].locations;
      for (const key of Object.keys(locs)) {
        const [x, y] = key.split(",").map(Number) as [number, number];
        const count = cat.def.unique ? 1 : locs[key]; // TODO: error msg for unique items with locs[key] > 1
        for (let i = 0; i < count; i++) {
          instances.push(new ItemInstance(cat, { x, y }));
        }
      }
    }

    // 3) Create the world
    return new GridWorld(config, categories, instances);
  }
}
