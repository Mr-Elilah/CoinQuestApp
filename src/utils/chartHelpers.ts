import { Payment } from "@/src/domain/finance";
import { startOfWeek, format } from "date-fns";
import { ChartMode } from "@/src/types/chart";
export interface ChartPoint {
  label: string; // дата или месяц
  amount: number; // сумма одного платежа
  total: number;
  // накопительная сумма на этот момент
}

// ---------- Days ----------
export function buildDailyData(payments: Payment[]): ChartPoint[] {
  const sorted = [...payments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let runningTotal = 0;

  return sorted.map((p) => {
    runningTotal += p.amount;

    return {
      label: p.date.slice(5),
      amount: p.amount,
      total: runningTotal,
    };
  });
}

// ---------- Weeks ----------

export function buildWeeklyData(payments: Payment[]): ChartPoint[] {
  const map = new Map<string, number>();

  payments.forEach((payment) => {
    const date = new Date(payment.date);
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const key = format(weekStart, "yyyy-MM-dd");

    if (!map.has(key)) {
      map.set(key, 0);
    }

    map.set(key, map.get(key)! + payment.amount);
  });

  let runningTotal = 0;

  return Array.from(map.entries())
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([weekStart, amount]) => {
      runningTotal += amount;

      return {
        label: `Неделя ${weekStart.slice(5)}`,
        amount,
        total: runningTotal,
      };
    });
}

// ---------- Months ----------
export function buildMonthlyData(payments: Payment[]): ChartPoint[] {
  const map = new Map<string, number>();

  payments.forEach((p) => {
    const d = new Date(p.date);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;

    map.set(key, (map.get(key) ?? 0) + p.amount);
  });

  let runningTotal = 0;

  return Array.from(map.entries()).map(([label, amount]) => {
    runningTotal += amount;

    return {
      label,
      amount,
      total: runningTotal,
    };
  });
}

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
