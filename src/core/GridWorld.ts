import type { Position, TrialConfig } from "./types";
import { Tile } from "./Tile";
import { Agent } from "./Agent";
import { ItemCategory } from "./ItemCategory";
import { ItemInstance } from "./ItemInstance";

/**
 * The full game state: grid of Tiles, list of instances, and the Agent.
 */
export class GridWorld {
  public readonly rows: number;
  public readonly cols: number;
  public tiles: Tile[][];
  public agent: Agent;
  public instances: Record<string, ItemInstance> = {};

  constructor(
    /** Parsed trial configuration */
    private config: TrialConfig,
    /** Categories built by compiler */
    private categories: ItemCategory[],
    /** Instances built by compiler */
    private instanceList: ItemInstance[]
  ) {
    this.rows = config.general.rows;
    this.cols = config.general.cols;

    // 1) Build empty grid
    this.tiles = Array.from({ length: config.general.rows }, (_, y) =>
      Array.from({ length: config.general.cols }, (_, x) => new Tile(x, y))
    );

    // 2) Index & place instances
    for (const inst of instanceList) {
      this.instances[inst.id] = inst;
      const { x, y } = inst.location;
      this.tiles[y][x].instanceIds.push(inst.id);
    }

    // 3) Initialize agent
    const [sx, sy] = config.general.start_location;
    this.agent = new Agent({ x: sx, y: sy }, config.general.total_steps);
  }

  /**
   * Can the agent move by delta (dx,dy)?
   * @param delta relative move
   */
  canMove(delta: Position): boolean {
    const { x, y } = this.agent.position;
    const nx = x + delta.x,
      ny = y + delta.y;
    if (
      ny < 0 ||
      nx < 0 ||
      ny >= this.tiles.length ||
      nx >= this.tiles[0].length
    ) {
      return false;
    }
    return this.tiles[ny][nx].canEnter(this.instances);
  }

  /**
   * Attempt to move the agent by delta.
   * @param delta relative move
   * @returns true if moved
   */
  move(delta: Position): boolean {
    if (!this.canMove(delta)) return false;
    const to = {
      x: this.agent.position.x + delta.x,
      y: this.agent.position.y + delta.y,
    };
    return this.agent.moveTo(to);
  }

  /**
   * Attempt to collect one item of the given category at the agent's tile.
   * @param categoryName name of the category to collect
   * @returns true if an instance was collected
   */
  collect(categoryName: string): boolean {
    const { x, y } = this.agent.position;
    const tile = this.tiles[y][x];
    const instId = tile.collectOne(categoryName, this.instances);
    if (!instId) return false;
    this.agent.inventory.add(instId);
    return true;
  }
}
