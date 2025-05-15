/**
 * Tracks which ItemInstance IDs the agent has collected.
 */
export class Inventory {
  private instances = new Set<string>();

  /**
   * Add one instance to inventory.
   * @param instanceId the unique ID of the instance
   */
  add(instanceId: string): void {
    this.instances.add(instanceId);
  }

  /**
   * @returns whether the agent has collected the given instance
   */
  has(instanceId: string): boolean {
    return this.instances.has(instanceId);
  }

  /**
   * Counts how many of a given set of instances the agent has.
   * @param allInstances all ItemInstance objects of a category
   */
  countByCategory(allInstances: { id: string }[]): number {
    return allInstances.filter((i) => this.instances.has(i.id)).length;
  }

  /**
   * @returns total number of collected instances (all categories).
   */
  totalCount(): number {
    return this.instances.size;
  }
}
