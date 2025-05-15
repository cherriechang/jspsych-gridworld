import { Tile } from "./Tile";
import { Agent } from "./Agent";
import { ItemCategory } from "./ItemCategory";
import { ItemInstance } from "./ItemInstance";
import type { TrialConfig, Position } from "./types";

export class GridWorld {
  public tiles: Tile[][];
  public agent: Agent;
  // global map of instances by ID
  public instances: Record<string, ItemInstance> = {};

  constructor(
    config: TrialConfig,
    categories: ItemCategory[],
    instances: ItemInstance[]
  ) {
    // build grid
    this.tiles = Array.from({ length: config.general.rows }, (_, y) =>
      Array.from({ length: config.general.cols }, (_, x) => new Tile(x, y))
    );
    // index and place instances
    for (let inst of instances) {
      this.instances[inst.id] = inst;
      const { x, y } = inst.location;
      this.tiles[y][x].instanceIds.push(inst.id);
    }
    // init agent
    const [sx, sy] = config.general.start_location;
    this.agent = new Agent({ x: sx, y: sy }, config.general.total_steps);
  }

  canMove(delta: Position): boolean {
    const { x, y } = this.agent.position;
    const nx = x + delta.x,
      ny = y + delta.y;
    if (
      ny < 0 ||
      nx < 0 ||
      ny >= this.tiles.length ||
      nx >= this.tiles[0].length
    )
      return false;
    return this.tiles[ny][nx].canEnter(this.instances);
  }

  move(delta: Position): boolean {
    if (!this.canMove(delta)) return false;
    const to = {
      x: this.agent.position.x + delta.x,
      y: this.agent.position.y + delta.y,
    };
    return this.agent.moveTo(to);
  }

  collect(categoryName: string): boolean {
    const { x, y } = this.agent.position;
    const tile = this.tiles[y][x];
    const instId = tile.collectOne(categoryName, this.instances);
    if (!instId) return false;
    this.agent.inventory.add(instId);
    return true;
  }
}
