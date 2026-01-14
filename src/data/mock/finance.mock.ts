import { Payment, Goal } from "@/src/domain/finance";

export const mockGoal: Goal = {
  id: "g1",
  title: "Financial Freedom",
  targetAmount: 30000,
};

export const mockPayments: Payment[] = [
  { id: "p1", date: "2024-01-01", amount: 400 },
  { id: "p2", date: "2024-02-01", amount: 800 },
  { id: "p3", date: "2024-03-01", amount: 1200 },
];
