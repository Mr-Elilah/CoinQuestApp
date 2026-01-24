import { ChartMode } from "@/src/types/chart";

export const CHART_MODES: { value: ChartMode; label: string }[] = [
  { value: "steps", label: "Шаги" },
  { value: "weeks", label: "Недели" },
  { value: "months", label: "Месяцы" },
];
