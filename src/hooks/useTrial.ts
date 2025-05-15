import { useEffect, useRef, useState } from "react";
import type { Position } from "../core/types";
import { GameCompiler } from "../core/GameCompiler";
import { GridWorld } from "../core/GridWorld";
import { RuleEvaluator } from "../core/RuleEvaluator";
import { ConfigParser } from "../core/ConfigParser";
import { trialSchemaYaml } from "../utils/trialSchema";

/**
 * Runs one trial: compiles the world, listens for key events,
 * and forces React to re-render on state changes.
 * @param config serialized trial config YAML
 */
export function useTrial(config: string, onFinish: (data: any) => void) {
  console.log("👣 useTrial initialized");

  const worldRef = useRef<GridWorld | null>(null);
  const evaluatorRef = useRef<RuleEvaluator | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {

    const parser = new ConfigParser(config, trialSchemaYaml);
    const trial = parser.getParsedConfig()


    // 1) compile world
    const world = GameCompiler.compile(trial);
    const evaluator = new RuleEvaluator(trial.end_condition);

    worldRef.current = world;
    evaluatorRef.current = evaluator;

    // 2) key handlers
    const dirs: Record<string, Position> = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };

    const handleKey = (e: KeyboardEvent) => {
      if (!worldRef.current || !evaluatorRef.current) return;

      const world = worldRef.current;
      const evaluator = evaluatorRef.current;

      if (e.key.startsWith("Arrow")) {
        e.preventDefault();
        if (world.move(dirs[e.key])) {
          setTick((t) => {
            console.log("🔄 Triggering re-render, tick =", t + 1);
            return t + 1;
          });
        }
      } else if (e.key === " ") {
        // collect first matching collectible on tile
        const tile =
          world.tiles[world.agent.position.y][world.agent.position.x];
        for (let id of tile.getInstances()) {
          const cat = world.instances[id].category.def;
          if (cat.collects) {
            world.collect(cat.name);
            setTick((t) => {
              console.log("🔄 Triggering re-render, tick =", t + 1);
              return t + 1;
            });
            
            break;
          }
        }
      }

      // check end condition
      if (evaluator.evaluate(world)) {
        console.log("End condition met!");
        onFinish(world.agent.inventory); // TODO: make this legit
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return { world: worldRef.current };
}
