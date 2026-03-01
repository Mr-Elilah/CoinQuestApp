import {
  mockEntries,
  mockAssets,
  mockLiabilities,
  mockCategories,
  mockItems,
} from "@/src/data/mock/finance.mock";

import { FinanceEntry, UserAsset, UserLiability } from "@/src/domain/finance";
import { CatalogCategory, CatalogItem } from "@/src/domain/finance.catalog";
import { getSectionTotal } from "@/src/domain/finance.selectors";

export async function getFinanceEntries(): Promise<FinanceEntry[]> {
  return Promise.resolve(mockEntries);
}

export async function getUserAssets(): Promise<UserAsset[]> {
  return Promise.resolve(mockAssets);
}

export async function getUserLiabilities(): Promise<UserLiability[]> {
  return Promise.resolve(mockLiabilities);
}

export async function getFinanceCatalog(): Promise<{
  categories: CatalogCategory[];
  items: CatalogItem[];
}> {
  return Promise.resolve({
    categories: mockCategories,
    items: mockItems,
  });
}

export async function getFinanceSummary() {
  const entries = await getFinanceEntries();
  const assets = await getUserAssets();
  const liabilities = await getUserLiabilities();
  const { categories, items } = await getFinanceCatalog();

  const income = getSectionTotal(entries, categories, items, "income");
  const expense = getSectionTotal(entries, categories, items, "expense");

  const asset = assets.reduce((sum, a) => sum + a.currentValue, 0);
  const liability = liabilities.reduce((sum, l) => sum + l.currentDebt, 0);

  return {
    income,
    expense,
    asset,
    liability,
  };
}
