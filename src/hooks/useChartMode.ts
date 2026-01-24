"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChartMode } from "@/src/types/chart";

const VALID_MODES: ChartMode[] = ["steps", "weeks", "months"];
const DEFAULT_MODE: ChartMode = "steps";

export default function useChartMode() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawMode = searchParams.get("mode");

  const mode: ChartMode = VALID_MODES.includes(rawMode as ChartMode)
    ? (rawMode as ChartMode)
    : DEFAULT_MODE;

  function setMode(newMode: ChartMode) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", newMode);

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return {
    mode,
    setMode,
  };
}
