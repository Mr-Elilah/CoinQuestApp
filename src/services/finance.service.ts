import { Payment, Goal } from "@/src/domain/finance";

export function calculateTotal(payments: Payment[]): number {
  return payments.reduce((sum, p) => sum + p.amount, 0);
}

export function calculateProgressPercent(total: number, goal: Goal): number {
  if (goal.targetAmount === 0) return 0;
  return (total / goal.targetAmount) * 100;
}
