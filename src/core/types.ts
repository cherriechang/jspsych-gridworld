export type Position = { x: number; y: number };

export interface ItemCategory {
  name: string;
  blocks: boolean; // impassable
  collects: boolean; // can pick up
  unique: boolean; // only 1 instance per loc
  visual: { color: string };
}

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
  end_condition: unknown; // logic tree AST
}
