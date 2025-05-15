import { useEffect, useRef, useState } from "react";
import type { TrialConfig, Position } from "../core/types";
import { GameCompiler } from "../core/GameCompiler";
import { GridWorld } from "../core/GridWorld";
import trialConfig from "../config/trial-1.yaml";

/**
 * Runs one trial: compiles the world, listens for key events,
 * and forces React to re-render on state changes.
 * @param config Optional override of the default trial config
 */
export function useTrial(config: TrialConfig = trialConfig) {
  const worldRef = useRef<GridWorld>();
  const [, setTick] = useState(0);

  useEffect(() => {
    // 1) compile world
    const world = GameCompiler.compile(config);
    worldRef.current = world;
    setTick((t) => t + 1);

    // 2) key handlers
    const dirs: Record<string, Position> = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };

    const handleKey = (e: KeyboardEvent) => {
      // prevent page scrolling on arrows
      if (e.key.startsWith("Arrow")) e.preventDefault();

      if (dirs[e.key]) {
        if (world.move(dirs[e.key])) setTick((t) => t + 1);
      } else if (e.key === " ") {
        // placeholder: collect first collectible category on tile
        const instances =
          world.tiles[world.agent.position.y][
            world.agent.position.x
          ].getInstances();
        if (
          instances.length &&
          world.collect(world.instances[instances[0]].category.name)
        ) {
          setTick((t) => t + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [config]);

  return { world: worldRef.current! };
}
