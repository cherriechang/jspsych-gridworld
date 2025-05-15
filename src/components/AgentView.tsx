import React from "react";
import type { Position } from "../core/types";

/**
 * Renders the agent as an SVG circle.
 */
export function AgentView({
  position,
  tileSize,
}: {
  position: Position;
  tileSize: number;
}) {
  const cx = position.x * tileSize + tileSize / 2;
  const cy = position.y * tileSize + tileSize / 2;
  const radius = tileSize / 3;

  // eye parameters
  const eyeRadius = radius * 0.2;
  const eyeOffsetX = radius * 0.35;
  const eyeOffsetY = radius * 0.35;
  const pupilRadius = eyeRadius * 0.4;
  const pupilOffset = pupilRadius * 0.3;

  // smile path: a simple arc
  const smileRadius = radius * 0.6;
  const smileY = cy + radius * 0.3;
  const smileStartX = cx - smileRadius * 0.6;
  const smileEndX = cx + smileRadius * 0.6;
  const smilePath = [
    `M ${smileStartX},${smileY}`,
    `A ${smileRadius},${smileRadius} 0 0 0 ${smileEndX},${smileY}`,
  ].join(" ");

  return (
    <g>
      {/* Body */}
      <circle cx={cx} cy={cy} r={radius} fill="blue" />

      {/* Left eye white */}
      <circle
        cx={cx - eyeOffsetX}
        cy={cy - eyeOffsetY}
        r={eyeRadius}
        fill="white"
      />
      {/* Right eye white */}
      <circle
        cx={cx + eyeOffsetX}
        cy={cy - eyeOffsetY}
        r={eyeRadius}
        fill="white"
      />

      {/* Left pupil */}
      <circle
        cx={cx - eyeOffsetX + pupilOffset}
        cy={cy - eyeOffsetY + pupilOffset}
        r={pupilRadius}
        fill="black"
      />
      {/* Right pupil */}
      <circle
        cx={cx + eyeOffsetX + pupilOffset}
        cy={cy - eyeOffsetY + pupilOffset}
        r={pupilRadius}
        fill="black"
      />

      {/* Smile */}
      <path
        d={smilePath}
        fill="none"
        stroke="white"
        strokeWidth={radius * 0.1}
        strokeLinecap="round"
      />
    </g>
  );
}
