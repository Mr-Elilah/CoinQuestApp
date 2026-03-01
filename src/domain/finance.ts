export interface Payment {
  id: string;
  date: string;
  amount: number;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
}

export interface FinanceEntry {
  id: string;
  userId: string;
  itemId: string;

  amount: number;
  quantity?: number;
  unitPrice?: number;

  storeId?: string;
  date: string;
  note?: string;
}

export interface UserAsset {
  id: string;
  userId: string;
  itemId: string;
  currentValue: number;
}

export interface UserLiability {
  id: string;
  userId: string;
  itemId: string;
  currentDebt: number;
}
