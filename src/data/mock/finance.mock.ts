import { CatalogCategory, CatalogItem } from "@/src/domain/finance.catalog";
import { FinanceEntry, UserAsset, UserLiability } from "@/src/domain/finance";

export const mockCategories: CatalogCategory[] = [
  { id: "c1", section: "expense", name: "Еда" },
  { id: "c2", section: "expense", name: "Транспорт" },
  { id: "c3", section: "income", name: "Зарплата" },
  { id: "c4", section: "asset", name: "Кредиты" },
  { id: "c5", section: "liability", name: "Кредиты" },
];

export const mockItems: CatalogItem[] = [
  { id: "i1", categoryId: "c1", name: "Бананы", unit: "кг" },
  { id: "i2", categoryId: "c1", name: "Хлеб", unit: "шт" },
  { id: "i3", categoryId: "c3", name: "Основная работа" },
  { id: "i4", categoryId: "c4", name: "ETF S&P 500" },
  { id: "i5", categoryId: "c5", name: "Ипотека" },
];

export const mockEntries: FinanceEntry[] = [
  {
    id: "e1",
    userId: "u1",
    itemId: "i1",
    amount: 100,
    quantity: 2,
    unitPrice: 50,
    storeId: "s1",
    date: "2026-02-10",
  },
  {
    id: "e2",
    userId: "u1",
    itemId: "i3",
    amount: 3000,
    date: "2026-02-01",
  },
];

export const mockAssets: UserAsset[] = [
  {
    id: "a1",
    userId: "u1",
    itemId: "i4",
    currentValue: 15000,
  },
];

export const mockLiabilities: UserLiability[] = [
  {
    id: "l1",
    userId: "u1",
    itemId: "i5",
    currentDebt: 80000,
  },
];
