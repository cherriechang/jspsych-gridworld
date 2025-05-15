export type Position = { x: number; y: number };

export interface ItemCategoryDef {
  name: string;
  blocks: boolean; // Prevents movement onto a tile containing this item
  collects: boolean; // Can be collected via interaction
  unique: boolean; // Only one instance per location
  visual: {
    color: string; // Hex or CSS color
  };
}

export interface Predicate {
  property: string; // e.g. "player.location" or "player.inventory.Apple"
  value: number | boolean | [number, number];
}

export interface Quantifier {
  over: string; // e.g. "player.inventory_unique.Apple"
  equals?: number | boolean | [number, number];
  where?: { item: string }; // e.g. { item: "Tree" }
}

export type ConditionNode =
  | { and: ConditionNode[] }
  | { or: ConditionNode[] }
  | { not: ConditionNode }
  | { equals: Predicate }
  | { greater_than: Predicate }
  | { less_than: Predicate }
  | { for_all: Quantifier }
  | { for_any: Quantifier };

export interface TrialConfig {
  general: {
    rows: number;
    cols: number;
    start_location: [number, number];
    total_steps: number;
  };
  items: Record<
    string,
    {
      blocks: boolean;
      collects: boolean;
      unique: boolean;
      locations: Record<string, number>;
      visual: { color: string };
    }
  >;
  end_condition: ConditionNode;
}
