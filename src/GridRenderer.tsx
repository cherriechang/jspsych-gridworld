type Props = {
  engine: ReturnType<typeof createGridEngine>;
  tileSize: number;
};

export default function GridRenderer({engine, tileSize}: Props) {
  return (
    <svg
      width={cols * tileSize}
      height={rows * tileSize}
      style={{ border: "1px solid black" }}
    >
      {[...Array(rows)].map((_, row) =>
        [...Array(cols)].map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={col * tileSize}
            y={row * tileSize}
            width={tileSize}
            height={tileSize}
            fill="white"
            stroke="gray"
          />
        ))
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
