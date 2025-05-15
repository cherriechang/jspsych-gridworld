export class Tile {
  public instanceIds: string[] = [];

  constructor(public readonly x: number, public readonly y: number) {}

  canEnter(allInstances: Record<string, ItemInstance>): boolean {
    // impassable if any occupying instance is blocking
    return this.instanceIds.every(
      (id) => !allInstances[id].category.def.blocks
    );
  }

  collectOne(
    categoryName: string,
    allInstances: Record<string, ItemInstance>
  ): string | null {
    const idx = this.instanceIds.findIndex(
      (id) =>
        allInstances[id].category.def.name === categoryName &&
        allInstances[id].category.def.collects
    );
    if (idx === -1) return null;
    return this.instanceIds.splice(idx, 1)[0];
  }
}
