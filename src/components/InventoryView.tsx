import React from "react";
import type { GridWorld } from "../core/GridWorld";

/**
 * Renders counts of each item the agent has collected.
 * Only categories present in config/items are shown.
 */
export function InventoryView({ world }: { world: GridWorld }) {
  // gather all category names from the trial config
  const categoryNames = Object.keys(world.instances).reduce<Set<string>>(
    (set, id) => {
      set.add(world.instances[id].category.def.name);
      return set;
    },
    new Set()
  );

  const rows = Array.from(categoryNames).map((cat) => {
    // count how many instances of this category are in inventory
    const total = Object.values(world.instances).filter(
      (inst) => inst.category.def.name === cat
    ).length;

    const collected = Object.values(world.instances).filter(
      (inst) =>
        inst.category.def.name === cat && world.agent.inventory.has(inst.id)
    ).length;

    return (
      <div key={cat} style={{ margin: "0.2em 0" }}>
        <strong>{cat}:</strong> {collected} {total > 1 ? `/ ${total} possible` : ""}
      </div>
    );
  });

  return (
    <div
      style={{
        border: "1px solid #888",
        padding: "0.5em",
        margin: "0.5em 0",
        width: "200px",
        textAlign: "left",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "0.3em" }}>Inventory</div>
      {rows}
    </div>
  );
}
