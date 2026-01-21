import { Payment } from "@/src/domain/finance";

export interface ChartPoint {
  label: string; // дата или месяц
  amount: number; // сумма одного платежа
  total: number; // накопительная сумма на этот момент
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
