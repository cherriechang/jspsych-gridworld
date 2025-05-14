import trialConfig from "./assets/trial-config.json";
import { type TaskConfig } from "./TaskConfig";
import { useEffect, useRef, useState } from "react";
import { GameState, type Position } from "./GameState";
import { Direction } from "grid-engine";
import GridRenderer from "./GridRenderer";

const TILE_SIZE = 80;

export default function GridWorld() {
  const [agentPosition, setAgentPosition] = useState<Position | null>(null);
  const gameStateRef = useRef<GameState | null>(null);

  useEffect(() => {
    const config = trialConfig as TaskConfig;
    const game = new GameState(config);
    gameStateRef.current = game;

    setAgentPosition(game.getPosition());
    game.onMove(setAgentPosition);

    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
  
      const keyMap: Record<string, Direction> = {
        ArrowUp: Direction.UP,
        ArrowDown: Direction.DOWN,
        ArrowLeft: Direction.LEFT,
        ArrowRight: Direction.RIGHT,
      };
      const dir = keyMap[e.key];
      if (dir) game.move(dir);
    };

    window.addEventListener("keydown", handleKey);

    let last = performance.now();
    const loop = (time: number) => {
      const delta = time - last;
      last = time;
      game.update(time, delta);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  if (!gameStateRef.current || agentPosition === null) return null;

  return (
    <GridRenderer
      gameState={gameStateRef.current}
      agentPosition={agentPosition}
      tileSize={TILE_SIZE}
    />
  );
}
