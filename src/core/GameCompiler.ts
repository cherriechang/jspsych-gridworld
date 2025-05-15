import { TrialConfig } from "./types";
import { ItemCategory } from "./ItemCategory";
import { ItemInstance } from "./ItemInstance";
import { GridWorld } from "./GridWorld";

export class GameCompiler {
  static compile(config: TrialConfig): GridWorld {
    // 1) categories
    const cats = Object.entries(config.items).map(
      ([name, def]) => new ItemCategory({ name, ...def })
    );
    // 2) instances
    const insts: ItemInstance[] = [];
    for (let cat of cats) {
      const locs = config.items[cat.def.name].locations;
      for (let key of Object.keys(locs)) {
        const [x, y] = key.slice(1, -1).split(",").map(Number) as [
          number,
          number
        ];
        const count = cat.def.unique ? 1 : locs[key];
        for (let i = 0; i < count; i++)
          insts.push(new ItemInstance(cat, { x, y }));
      }
    }
    // 3) world
    return new GridWorld(config, cats, insts);
  }
}
