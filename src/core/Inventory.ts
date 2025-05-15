export class Inventory {
  private instances = new Set<string>();

  add(instanceId: string) {
    this.instances.add(instanceId);
  }

  has(instanceId: string): boolean {
    return this.instances.has(instanceId);
  }

  countByCategory(instances: ItemInstance[]): number {
    // pass in all instances of a given category,
    // count how many of those IDs are in our set
    return instances.filter((i) => this.instances.has(i.id)).length;
  }
}
