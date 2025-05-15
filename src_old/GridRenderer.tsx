import { GameState } from "./GameState";

type Props = {
  gameState: GameState;
  agentPosition: { x: number; y: number };
  tileSize: number;
};

export default function GridRenderer({
  gameState,
  agentPosition,
  tileSize,
}: Props) {
  const rows = gameState.rows;
  const cols = gameState.cols;
  const goal = gameState.goal;
  const walls = gameState.walls;

  return (
    <svg
      width={cols * tileSize}
      height={rows * tileSize}
      style={{ border: "1px solid black" }}
    >
      {[...Array(rows)].flatMap((_, y) =>
        [...Array(cols)].map((_, x) => {
          const isWall = walls.some((w) => w.x === x && w.y === y);
          const isGoal = goal.x === x && goal.y === y;

          return (
            <rect
              key={`tile-${x}-${y}`}
              x={x * tileSize}
              y={y * tileSize}
              width={tileSize}
              height={tileSize}
              fill={isWall ? "black" : isGoal ? "green" : "white"}
              stroke="gray"
            />
          );
        })
      )}

      <circle
        cx={agentPosition.x * tileSize + tileSize / 2}
        cy={agentPosition.y * tileSize + tileSize / 2}
        r={tileSize / 3}
        fill="blue"
      />
    </svg>
  );
}
