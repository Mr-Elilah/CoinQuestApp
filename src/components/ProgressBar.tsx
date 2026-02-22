import React from "react";

export interface ProgressBarProps {
  value: number;
  colorClassName: string;
  trackClassName: string;
}

export default function ProgressBar({
  value,
  colorClassName,
  trackClassName,
}: ProgressBarProps) {
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`flex-1 h-3 rounded-full overflow-hidden ${trackClassName}`}
    >
      <div
        className={`h-full ${colorClassName}`}
        style={{ width: `${normalizedValue}%` }}
      />
    </div>
  );
}
