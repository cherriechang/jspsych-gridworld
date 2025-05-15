import React from "react";

/**
 * Displays how many steps the agent has left.
 */
export function StepsRemainingView({
  stepsRemaining,
}: {
  /** Infinity if unlimited */
  stepsRemaining: number;
}) {
  return (
    <div style={{ margin: "0.5em 0", fontSize: "1.2em" }}>
      Steps Remaining: {Number.isFinite(stepsRemaining) ? stepsRemaining : "∞"}
    </div>
  );
}
