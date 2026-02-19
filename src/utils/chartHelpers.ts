import { Payment } from "@/src/domain/finance";
import { startOfWeek, format } from "date-fns";
import { ChartMode } from "@/src/types/chart";

export interface ChartPoint {
  label: string;
  amount: number | null;
  total: number | null;
}

/* ===================================================== */
/* ====================== HELPERS ====================== */
/* ===================================================== */

function formatMonth(date: Date) {
  const raw = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
  }).format(date);

  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/* ===================================================== */
/* ====================== STEPS ======================== */
/* ===================================================== */

export function buildDailyData(payments: Payment[]): ChartPoint[] {
  const sorted = [...payments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let runningTotal = 0;

  const result: ChartPoint[] = [
    { label: "", amount: null, total: 0 }, // стартовая точка
  ];

  sorted.forEach((p) => {
    runningTotal += p.amount;

    result.push({
      label: p.date.slice(5),
      amount: p.amount,
      total: runningTotal,
    });
  });

  return result;
}

/* ===================================================== */
/* ====================== WEEKS ======================== */
/* ===================================================== */

export function buildWeeklyData(payments: Payment[]): ChartPoint[] {
  const map = new Map<string, number>();

  payments.forEach((payment) => {
    const date = new Date(payment.date);
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const key = format(weekStart, "yyyy-MM-dd");

    map.set(key, (map.get(key) ?? 0) + payment.amount);
  });

  const sortedWeeks = Array.from(map.keys()).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  let runningTotal = 0;

  const result: ChartPoint[] = [
    { label: "", amount: null, total: 0 }, // старт
  ];

  sortedWeeks.forEach((weekKey) => {
    const amount = map.get(weekKey)!;
    runningTotal += amount;

    result.push({
      label: `Неделя ${weekKey.slice(5)}`,
      amount,
      total: runningTotal,
    });
  });

  return result;
}

/* ===================================================== */
/* ====================== MONTHS ======================= */
/* ===================================================== */

export function buildMonthlyData(payments: Payment[]): ChartPoint[] {
  if (payments.length === 0) {
    return [{ label: "", amount: null, total: 0 }];
  }

  const sorted = [...payments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const firstDate = new Date(sorted[0].date);
  const lastDate = new Date(sorted[sorted.length - 1].date);

  const startMonth = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
  const endMonth = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1);

  const result: ChartPoint[] = [
    { label: "", amount: null, total: 0 }, // стартовая точка
  ];

  let runningTotal = 0;

  const current = new Date(startMonth);

  while (current <= endMonth) {
    const monthPayments = sorted.filter((p) => {
      const d = new Date(p.date);
      return (
        d.getFullYear() === current.getFullYear() &&
        d.getMonth() === current.getMonth()
      );
    });

    const amount = monthPayments.reduce((sum, p) => sum + p.amount, 0);

    runningTotal += amount;

    result.push({
      label: formatMonth(current),
      amount: amount || null,
      total: runningTotal,
    });

    current.setMonth(current.getMonth() + 1);
  }

  return result;
}

/* ===================================================== */
/* ====================== MAIN ========================= */
/* ===================================================== */

export function buildChartData(mode: ChartMode, payments: Payment[]) {
  switch (mode) {
    case "steps":
      return buildDailyData(payments);

    case "weeks":
      return buildWeeklyData(payments);

    case "months":
      return buildMonthlyData(payments);

    default:
      return [];
  }
}

export function getChartLabel(mode: ChartMode) {
  switch (mode) {
    case "steps":
      return "Шаг";

    case "weeks":
      return "Неделя";

    case "months":
      return "Месяц";
  }
}
