import { useEffect, useRef, useState } from "react";
import { GameState, type Position } from "./GameState";
import { Direction } from "grid-engine";
import GridRenderer from "./GridRenderer";

const GRID_ROWS = 5;
const GRID_COLS = 5;
const TILE_SIZE = 80;
const START_POS = { x: 0, y: 0 };

export default function GridWorld() {
  const [agentPosition, setAgentPosition] = useState<Position>(START_POS);
  const gameStateRef = useRef<GameState | null>(null);

  useEffect(() => {
    const game = new GameState({
      rows: GRID_ROWS,
      cols: GRID_COLS,
      walls: [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
      ],
      goal: { x: 4, y: 4 },
    });

    gameStateRef.current = game;
    setAgentPosition(game.getPosition());

    game.onMove(setAgentPosition);

    const handleKey = (e: KeyboardEvent) => {
      if (!gameStateRef.current) return;
      const keyMap: Record<string, Direction> = {
        ArrowUp: Direction.UP,
        ArrowDown: Direction.DOWN,
        ArrowLeft: Direction.LEFT,
        ArrowRight: Direction.RIGHT,
      };
      const dir = keyMap[e.key];
      if (dir) gameStateRef.current.move(dir);
    };

    window.addEventListener("keydown", handleKey);

    let lastTime = performance.now();
    const loop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      game.update(time, delta);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  if (!gameStateRef.current) return null;

  return (
    <GridRenderer
      gameState={gameStateRef.current}
      agentPosition={agentPosition}
      tileSize={TILE_SIZE}
    />
  );
}
