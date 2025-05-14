import React, { useEffect, useRef, useState } from "react";
import { createGridEngine } from "./engine";
import { Direction } from "grid-engine";

const GRID_ROWS = 5;
const GRID_COLS = 5;
const START_POSITION = { x: 0, y: 0 };
const TILE_SIZE = 80;

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

  gridEngine.positionChangeFinished().subscribe(() => {
    updatePos();
  });

  updatePos(); // set initial position

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

  // Main animation loop
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
    <svg
      width={GRID_COLS * TILE_SIZE}
      height={GRID_ROWS * TILE_SIZE}
      style={{ border: "1px solid black" }}
    >
      {[...Array(GRID_ROWS)].map((_, row) =>
        [...Array(GRID_COLS)].map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={col * TILE_SIZE}
            y={row * TILE_SIZE}
            width={TILE_SIZE}
            height={TILE_SIZE}
            fill="white"
            stroke="gray"
          />
        ))
      )}

      <circle
        cx={position.x * TILE_SIZE + TILE_SIZE / 2}
        cy={position.y * TILE_SIZE + TILE_SIZE / 2}
        r={TILE_SIZE / 3}
        fill="blue"
      />
    </svg>
  );
}
