import { Payment, Goal } from "@/src/domain/finance";
import { mockGoal } from "@/src/data/mock/goal.mock";
import { mockPayments } from "@/src/data/mock/payments.mock";

/* ===================== FETCH (позже будет API) ===================== */

export async function getUserGoal(): Promise<Goal> {
  return mockGoal;
}

export async function getUserPayments(): Promise<Payment[]> {
  return mockPayments;
}

/* ===================== CALCULATIONS ===================== */

export function calculateTotal(payments: Payment[]): number {
  return payments.reduce((sum, p) => sum + p.amount, 0);
}

export function calculateProgressPercent(total: number, goal: Goal): number {
  if (goal.targetAmount === 0) return 0;
  return (total / goal.targetAmount) * 100;
}
