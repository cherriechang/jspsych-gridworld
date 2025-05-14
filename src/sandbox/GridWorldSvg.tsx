// THIS IS DEPRECATED
import { useState, useEffect } from 'react';

const GRID_ROWS = 5;
const GRID_COLS = 5;
const TILE_SIZE = 80;

export default function GridWorld() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPosition((prev) => {
        let { x, y } = prev;
        if (e.key === 'ArrowUp') y = Math.max(0, y - 1);
        if (e.key === 'ArrowDown') y = Math.min(GRID_ROWS - 1, y + 1);
        if (e.key === 'ArrowLeft') x = Math.max(0, x - 1);
        if (e.key === 'ArrowRight') x = Math.min(GRID_COLS - 1, x + 1);
        return { x, y };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <svg
      width={GRID_COLS * TILE_SIZE}
      height={GRID_ROWS * TILE_SIZE}
      style={{ border: '1px solid black' }}
    >
      {/* Draw grid */}
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

      {/* Draw agent */}
      <circle
        cx={position.x * TILE_SIZE + TILE_SIZE / 2}
        cy={position.y * TILE_SIZE + TILE_SIZE / 2}
        r={TILE_SIZE / 3}
        fill="blue"
      />
    </svg>
  );
}
