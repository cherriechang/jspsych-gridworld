import { useEffect, useRef, useState } from "react";
import { createGridEngine } from "./engine";
import { Direction } from "grid-engine";
import GridRenderer from "./GridRenderer";

const GRID_ROWS = 5;
const GRID_COLS = 5;
const TILE_SIZE = 80;
const START_POSITION = { x: 0, y: 0 };

export default function GridWorld() {
  const [position, setPosition] = useState(START_POSITION);
  const gridEngineRef = useRef<ReturnType<typeof createGridEngine> | null>(
    null
  );

  useEffect(() => {
    const gridEngine = createGridEngine(GRID_ROWS, GRID_COLS);
    gridEngineRef.current = gridEngine;

    const updatePos = () => {
      const pos = gridEngine.getPosition("player");
      setPosition(pos);
    };

    gridEngine.positionChangeFinished().subscribe(() => updatePos());
    updatePos(); // initial position update

    const handleKeyDown = (e: KeyboardEvent) => {
      const ge = gridEngineRef.current;
      if (!ge) return;

      switch (e.key) {
        case "ArrowUp":
          ge.move("player", Direction.UP);
          break;
        case "ArrowDown":
          ge.move("player", Direction.DOWN);
          break;
        case "ArrowLeft":
          ge.move("player", Direction.LEFT);
          break;
        case "ArrowRight":
          ge.move("player", Direction.RIGHT);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let lastTime = performance.now();
    let animationFrameId: number;
    const tick = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      gridEngine.update(time, delta);
      animationFrameId = requestAnimationFrame(tick);
    };
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <GridRenderer
      rows={GRID_ROWS}
      cols={GRID_COLS}
      tileSize={TILE_SIZE}
      agentPosition={position}
    />
  );
}
