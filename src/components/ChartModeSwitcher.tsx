"use client";

import { ChartMode } from "@/src/types/chart";
import { CHART_MODES } from "@/src/constants/chart";

interface ChartModeSwitcherProps {
  value: ChartMode;
  onChange: (mode: ChartMode) => void;
}

export default function ChartModeSwitcher({
  value,
  onChange,
}: ChartModeSwitcherProps) {
  return (
    <div className="flex gap-6 items-center">
      {CHART_MODES.map((m) => {
        const active = value === m.value;

        return (
          <button
            key={m.value}
            onClick={() => onChange(m.value)}
            className={`transition-all
              ${
                active
                  ? "text-blue-600 text-base font-semibold"
                  : "text-gray-400 text-sm hover:text-gray-700"
              }
            `}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
