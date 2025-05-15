import { useEffect, useRef, useState } from "react";
import type { TrialConfig, Position } from "../core/types";
import { GameCompiler } from "../core/GameCompiler";
import { GridWorld } from "../core/GridWorld";
import trialConfig from "../config/trial-1.yaml";

export function useTrial(config: TrialConfig = trialConfig) {
  const worldRef = useRef<GridWorld>();
  // dummy state to force re-render
  const [, setTick] = useState(0);

  useEffect(() => {
    const world = GameCompiler.compile(config);
    worldRef.current = world;
    setTick((t) => t + 1);

    const dirs: Record<string, Position> = {
      ArrowUp:    { x:  0, y: -1 },
      ArrowDown:  { x:  0, y:  1 },
      ArrowLeft:  { x: -1, y:  0 },
      ArrowRight: { x:  1, y:  0 },
    };

    const handleKey = (e: KeyboardEvent) => {
      if (dirs[e.key]) {
        e.preventDefault();
        if (world.move(dirs[e.key])) setTick((t) => t + 1);
      } else if (e.key === " ") {
        if (world.collect("/* choose category or prompt */")) {
          setTick((t) => t + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [config]);

  return { world: worldRef.current! };
}
