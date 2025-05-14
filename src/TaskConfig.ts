export type TaskConfig = {
  rows: number;
  cols: number;
  start: [number, number];
  goal: [number, number];
  walls?: [number, number][];
};
