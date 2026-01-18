import { Payment } from "@/src/domain/finance";

export interface ChartPoint {
  label: string;
  value: number;
}

export function accumulate(data: ChartPoint[]) {
  let total = 0;

  return data.map((item) => {
    total += item.value;
    return { ...item, value: total };
  });
}

// Days
export function buildDailyData(payments: Payment[]) {
  const sorted = [...payments].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return accumulate(
    sorted.map((p) => ({
      label: p.date.slice(5),
      value: p.amount,
    })),
  );
}

// Months
export function buildMonthlyData(payments: Payment[]) {
  const map = new Map<string, number>();

  payments.forEach((p) => {
    const d = new Date(p.date);
    const key = `${d.getFullYear()}-${d.getMonth() + 1}`;

    map.set(key, (map.get(key) ?? 0) + p.amount);
  });

  return accumulate(
    Array.from(map.entries()).map(([label, value]) => ({
      label,
      value,
    })),
  );
}

// Total
export function getTotal(payments: Payment[]) {
  return payments.reduce((sum, p) => sum + p.amount, 0);
}
