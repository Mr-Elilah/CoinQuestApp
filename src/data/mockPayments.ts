export interface Payment {
  date: string; // ISO-дата
  amount: number; // сколько "заплатил себе"
}

export const mockPayments: Payment[] = [
  { date: "2025-01-05", amount: 100 },
  { date: "2025-01-10", amount: 200 },
  { date: "2025-01-15", amount: 50 },
  { date: "2025-02-02", amount: 300 },
  { date: "2025-02-18", amount: 150 },
  { date: "2025-03-01", amount: 400 },
];
