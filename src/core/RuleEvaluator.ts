import type { ConditionNode } from "./types";
import type { GridWorld } from "./GridWorld";
import type { ItemInstance } from "./ItemInstance";

function deepEqual(a: any, b: any): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => deepEqual(v, b[i]));
  }
  return a === b;
}

export class RuleEvaluator {
  constructor(private condition: ConditionNode) {}

  /**
   * @returns true if the top‐level condition is met in the given world
   */
  evaluate(world: GridWorld): boolean {
    return this.evalNode(this.condition, world);
  }

  private evalNode(node: ConditionNode, world: GridWorld): boolean {
    // Logical combinators
    if ("and" in node) {
      return node.and.every((cond) => this.evalNode(cond, world));
    }
    if ("or" in node) {
      return node.or.some((cond) => this.evalNode(cond, world));
    }
    if ("not" in node) {
      return !this.evalNode(node.not, world);
    }

    // Atomic comparisons
    if ("equals" in node) {
      const { property, value } = node.equals;
      const actual = this.getProp(property, world);
      return deepEqual(actual, value);
    }
    if ("greater_than" in node) {
      const { property, value } = node.greater_than;
      const actual = this.getProp(property, world);
      if (typeof actual !== "number" || typeof value !== "number") {
        throw new Error(`greater_than requires numeric values (${property})`);
      }
      return actual > value;
    }
    if ("less_than" in node) {
      const { property, value } = node.less_than;
      const actual = this.getProp(property, world);
      if (typeof actual !== "number" || typeof value !== "number") {
        throw new Error(`less_than requires numeric values (${property})`);
      }
      return actual < value;
    }

    // Quantifiers
    if ("for_all" in node) {
      const { over, equals } = node.for_all;
      const arr = this.getProp(over, world);
      if (!Array.isArray(arr)) {
        throw new Error(`for_all: property ${over} is not an array`);
      }
      return arr.every((v) => deepEqual(v, equals));
    }
    if ("for_any" in node) {
      const { over, equals } = node.for_any;
      const arr = this.getProp(over, world);
      if (!Array.isArray(arr)) {
        throw new Error(`for_any: property ${over} is not an array`);
      }
      return arr.some((v) => deepEqual(v, equals));
    }

    throw new Error("Unknown condition node");
  }

  /**
   * Resolve a property path into a value:
   * - "player.location" → [x,y]
   * - "player.steps_remaining" → number
   * - "player.inventory.<Category>" → count (number)
   * - "player.visit_tile.<Category>" → boolean[] per instance
   */
  private getProp(path: string, world: GridWorld): any {
    const parts = path.split(".");
    if (parts[0] !== "player") {
      throw new Error(`Unknown root object: ${parts[0]}`);
    }

    if (parts[1] === "location") {
      const { x, y } = world.agent.position;
      return [x, y];
    }
    if (parts[1] === "steps_remaining") {
      return world.agent.stepsRemaining;
    }
    // inventory count
    if (parts[1] === "inventory" && parts.length === 3) {
      const category = parts[2];
      const allInst = Object.values(world.instances).filter(
        (i: ItemInstance) => i.category.def.name === category
      );
      return world.agent.inventory.countByCategory(allInst);
    }
    // visit flags
    if (parts[1] === "visit_tile" && parts.length === 3) {
      const category = parts[2];
      // for each instance of that category, look up its tile visitedCount
      const allInst = Object.values(world.instances).filter(
        (i: ItemInstance) => i.category.def.name === category
      );
      return allInst.map((inst) => world.agent.inventory.has(inst.id));
    }

    throw new Error(`Unrecognized property path: ${path}`);
  }
}
